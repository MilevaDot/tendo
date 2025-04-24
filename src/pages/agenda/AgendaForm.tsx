import { ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormLabel, HStack, Icon, Image, Input } from "@chakra-ui/react"
import { useContext, useEffect, useRef, useState } from "react"
import { AgendaType } from "../../declarations/Agenda"
import { database, ID, storage } from "../../lib/appwrite"
import { Appwrite } from "../../lib/env"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import './agendaform.css'
import { FaUser } from "react-icons/fa"
import { UserContext } from "../../shared/context/UserContext"
import { Paths } from "../../router/routes"
import HelperHelment from "../../helpers/HelperHelmet"

const AgendaForm = () => {
    const [agenda, setAgenda] = useState<AgendaType>()
    const [edit, setEdit] = useState<boolean>(false)
    const [invisible, setInvisible] = useState<boolean>(true)
    const formRef = useRef<HTMLFormElement>(null)
    const [photoUrl, setPhotoUrl] = useState<string>('')
    const context = useContext(UserContext)


    const navigate = useNavigate()
    const { id } = useParams()

    const getAgenda = async () => {
        console.log(context)
        const response = await database.getDocument(
            Appwrite.databaseId,
            Appwrite.collections.agenda, id!)
        setAgenda(response as AgendaType)
    }

    const deleteAgenda = async (agendaId: string) => {
        await database.deleteDocument(
            Appwrite.databaseId,
            Appwrite.collections.agenda,
            agendaId
        ).then(() => {
            navigate('/Agenda')
            toast.warning('Contacto eliminado')
        }).catch(() => {
            toast.error('Algo salió mal', {
                description: 'No se pudo eliminar el contacto'
            })
        })
    }

    const editAgenda = () => {
        setEdit(true)
        setInvisible(false)
    }

    const saveAgenda = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEdit(false)
        setInvisible(true)

        const form = e.currentTarget
        const data = new FormData(form)
        const { name, email, phone, dni, photoinput } = Object.fromEntries(data.entries())

        // await storage.createFile(Appwrite.bucketFilesId, ID.unique(), photoinput as File).then(async (response) => {
            
        //     const photoPreview = storage.getFilePreview(Appwrite.bucketFilesId, response.$id)
        //     setPhotoUrl(`${photoPreview}&mode=admin`)
        // }).then(async () => {
            await database.updateDocument(
                Appwrite.databaseId,
                Appwrite.collections.agenda,
                agenda!.$id, {
                    name: name,
                    email: email,
                    photo_address: photoUrl,
                    phone: phone,
                    dni: dni,
                }
            ).then(() => {
                toast.success('Se logró')
            }).catch(() => {
                toast.error('No se logró|')
            })
        // })
    }

    useEffect(() => {
        getAgenda()
    }, [])

    return (
        <>
            {/* <Helmet><title>Tendo | {`${agenda?.name}`}</title></Helmet> */}
            <HelperHelment title={`Tendo | ${agenda?.name}`} />

            <Breadcrumb p='20px 20px 20px 20px' separator={<ChevronRightIcon />}>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to={Paths.Agenda}>Agenda</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color='teal'>{agenda?.name}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <HStack p='0px 20px' justifyContent='space-between'>
            <Box display='flex' gap='1em'>
                    <Button size='sm' colorScheme='teal' onClick={editAgenda} className={invisible ? '' : 'inactive'} >Editar</Button>
                    <Button size='sm' colorScheme='teal' onClick={() => formRef.current?.requestSubmit()} className={invisible ? 'inactive' : ''}>Guardar</Button>
                    <Link to={ '/agenda' }>
                        <Button size='sm' colorScheme='gray'>Cancelar</Button>
                    </Link>
                </Box>
                <Box>
                    <Button
                        size='sm'
                        colorScheme='red'
                        leftIcon={<DeleteIcon />}
                        onClick={() => agenda && deleteAgenda(agenda?.$id)}
                        >
                        Eliminar
                    </Button>
                </Box>
            </HStack>
            <Box
                m='20px'
                p='0px 50px'
                borderRadius='10px'
                backgroundColor='var(--gray)'
                border='2px solid var(--gray-border)'
                >
                <Box as='form' p='20px' onSubmit={saveAgenda} ref={formRef}>
                    <HStack gap='10em'>
                        <FormControl>
                            <Input type='text' name='name' disabled={edit ? false : true} defaultValue={agenda?.name} />
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
                                {agenda?.photo_address ? 
                                    <Image src={agenda?.photo_address} alt='Foto' w='100%' h='100%' />
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
                                    disabled={edit ? false : true}
                                    />
                            </Box>
                        </FormControl>
                    </HStack>
                    <HStack gap='10em'>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' name='email' disabled={edit ? false : true} defaultValue={agenda?.email} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Celular</FormLabel>
                            <Input type='tel' name='phone' disabled={edit ? false : true} defaultValue={agenda?.phone} />
                        </FormControl>
                    </HStack>
                    <HStack gap='10em'>
                        <FormControl>
                            <FormLabel>DNI</FormLabel>
                            <Input type='text' name='dni' disabled={edit ? false : true} defaultValue={agenda?.dni} />
                        </FormControl>
                    </HStack>
                </Box>
            </Box>
        </>
    )
}

export default AgendaForm