import { ChevronRightIcon } from "@chakra-ui/icons"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormLabel, HStack, Icon, Image, Input } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { Paths } from "../../router/routes"
import { useRef, useState } from "react"
import { database, ID, storage } from "../../lib/appwrite"
import { Appwrite } from "../../lib/env"
import { toast } from "sonner"
import { FaUser } from "react-icons/fa"
import { Query } from "appwrite"
import HelperHelment from "../../helpers/HelperHelmet"

const AgendaCreate = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const [photoUrl, setPhotoUrl] = useState<string>('')
    const navigate = useNavigate()

    const createForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)
        const { name, email, phone, dni, photoinput } = Object.fromEntries(data.entries())
        // const { photo_address } = Object.fromEntries(data.entries())
        await database.createDocument(
            Appwrite.databaseId,
            Appwrite.collections.agenda,
            ID.unique(),
            {
                'name': name,
                'email': email,
                'phone': phone,
                'dni': dni
            }
        ).then( async (res) => {
            console.log(res)
            await storage.createFile(
                Appwrite.bucketFilesId,
                ID.unique(),
                photoinput as File
            ).then(async (response) => {
                const photoPreview = storage.getFilePreview(
                    Appwrite.bucketFilesId,
                    response.$id
                )
                setPhotoUrl(`${photoPreview}&mode=admin`)
                const agendaRecord = await database.listDocuments(Appwrite.databaseId, Appwrite.collections.agenda, [
                    Query.equal('email', email as string)
                ])
                console.log(`${photoPreview}&mode=admin`)
                await database.updateDocument(
                    Appwrite.databaseId,
                    Appwrite.collections.agenda,
                    agendaRecord.documents[0].$id,
                    {
                        photo_address: `${photoPreview}&mode=admin`
                    }
                ).then(() => {
                    navigate(`/agenda/${res.$id}`)
                    toast.success('Contacto creado')
                }).catch(() => {
                    toast.error('Algo salió mal')
                })
            })
        })
    }

    return (
        <>
            <HelperHelment title='Tendo | Creando contacto' />

            <Breadcrumb p='20px 20px 20px 20px' separator={<ChevronRightIcon />}>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to={Paths.Agenda}>Agenda</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color='teal'>Creando contacto</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <HStack p='0px 20px' justifyContent='space-between'>
                <Box display='flex' gap='1em'>
                    <Link to={ '/agendacreate' }>
                        <Button size='sm' colorScheme='teal' onClick={() => formRef.current?.requestSubmit()}>Guardar</Button>
                    </Link>
                    <Link to={ '/agenda' }>
                        <Button size='sm' colorScheme='gray'>Cancelar</Button>
                    </Link>
                </Box>
            </HStack>

            <Box
                m='20px'
                p='0px 50px'
                borderRadius='10px'
                backgroundColor='var(--gray)'
                border='2px solid var(--gray-border)'
                >
                <Box as='form' p='20px' onSubmit={createForm} ref={formRef}>
                    <HStack gap='10em'>
                        <FormControl>
                            <Input placeholder='Pedro Páramo Rodríguez' type='text' name='name' required />
                        </FormControl>
                        <FormControl display='flex' justifyContent='end'>
                            <Box
                                w='100px'
                                h='100px'
                                border='2px dashed #ccc'
                                borderRadius='md'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                position='relative'
                                overflow='hidden'
                                >
                                {
                                photoUrl ? 
                                    <Image src={photoUrl} alt='Foto' w='100%' h='100%' />
                                :
                                    <Icon as={FaUser} boxSize={12} color='gray.400' />
                                }
                                <Input
                                    type='file'
                                    accept='image/*'
                                    name='photoinput'
                                    position='absolute'
                                    top='0'
                                    left='0'
                                    width='100%'
                                    height='100%'
                                    opacity='0'
                                    cursor='pointer'
                                />
                            </Box>
                        </FormControl>
                    </HStack>
                    <HStack gap='10em'>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' name='email' required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Celular</FormLabel>
                            <Input type='tel' name='phone' required />
                        </FormControl>
                    </HStack>
                    <HStack>
                        <FormControl>
                            <FormLabel>DNI</FormLabel>
                            <Input type='text' name='dni' required />
                        </FormControl>
                    </HStack>
                </Box>
            </Box>
        </>

    )
}

export default AgendaCreate