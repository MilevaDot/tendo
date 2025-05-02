import { useRef, useState } from "react";
import { database, ID, storage } from "../../lib/appwrite";
import { Appwrite } from "../../lib/env";
import { toast } from "sonner";
import HelperHelment from "@helpers/HelperHelmet"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Checkbox, FormControl, FormLabel, HStack, Icon, Image, Input } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../router/routes";
import { FaBoxOpen } from "react-icons/fa";

const ProductCreate = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const [photoUrl, setPhotoUrl] = useState<string>('')
    const navigate = useNavigate()

    const createForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)
        const { name, code, price, published, available_quantity, photoinput } = Object.fromEntries(data.entries())
        const isPublished = published === 'on'
        await database.createDocument(
            Appwrite.databaseId,
            Appwrite.collections.product,
            ID.unique(),
            {
                'name': name,
                'code': code,
                'price': parseFloat(price as string),
                'published': isPublished,
                'available_quantity': Number(available_quantity)
            }
        ).then(async (resProduct) => {
            await storage.createFile(
                Appwrite.bucketFilesId,
                ID.unique(),
                photoinput as File
            ).then(async (resFile) => {
                console.log(resFile)
                const photoPreview = storage.getFileDownload(
                // const photoPreview = storage.getFilePreview(
                    Appwrite.bucketFilesId,
                    resFile.$id
                )
                setPhotoUrl(`${photoPreview}&mode=admin`)
                await database.updateDocument(
                    Appwrite.databaseId,
                    Appwrite.collections.product,
                    resProduct.$id,
                    {
                        photo_url: `${photoPreview}&mode=admin`
                    }
                ).then(() => {
                    navigate(`/products/${resProduct.$id}`)
                    toast.success('Producto creado')
                }).catch(() => {
                    toast.error('Algo salió mal', {
                        description: 'No se pudo crear el producto 1'
                    })
                })
            }).catch(() => {
                toast.error('Algo salió mal', {
                    description: 'No se pudo crear el producto 2'
                })
            })
        }).catch(() => {
            toast.error('Algo salió mal', {
                description: 'No se pudo crear el producto 3'
            })
        })
    }

    return (
        <>
            <HelperHelment title='Tendo | Creando producto' />
            <Breadcrumb p='20px 20px 20px 20px' separator={<ChevronRightIcon />}>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to={Paths.Products}>Productos</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color='teal'>Creando producto</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <HStack p='0px 20px' justifyContent='space-between'>
                <Box display='flex' gap='1em'>
                    <Link to={ Paths.ProductCreate }>
                        <Button size='sm' colorScheme='teal' onClick={() => formRef.current?.requestSubmit()}>Guardar</Button>
                    </Link>
                    <Link to={ Paths.Products }>
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
                            <Input placeholder='Pantalón jean' type='text' name='name' required />
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
                                    <Icon as={FaBoxOpen} boxSize={12} color='gray.400' />
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
                            <FormLabel>Code</FormLabel>
                            <Input type='text' name='code' required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <Input type='number' name='price' step='0.01' required />
                        </FormControl>
                    </HStack>
                    <HStack gap='10em'>
                        <FormControl>
                            <FormLabel>Cantidad disponible</FormLabel>
                            <Input type='number' name='available_quantity' required/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Publicado</FormLabel>
                            <Checkbox
                                name='published'
                                colorScheme='teal'
                                >
                            </Checkbox>
                        </FormControl>
                    </HStack>
                </Box>
            </Box>
        </>
    )
}

export default ProductCreate