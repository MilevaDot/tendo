import { useEffect, useRef, useState } from "react"
import { ProductType } from "../../declarations/Warehouse"
import { Link, useNavigate, useParams } from "react-router-dom"
import { database } from "../../lib/appwrite"
import { Appwrite } from "../../lib/env"
import HelperHelment from "../../helpers/HelperHelmet"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Checkbox, FormControl, FormLabel, HStack, Icon, Image, Input } from "@chakra-ui/react"
import { ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons"
import { Paths } from "../../router/routes"
import { toast } from "sonner"
import { FaBoxOpen } from "react-icons/fa"

const ProductForm = () => {
    const [product, setProduct] = useState<ProductType>()
    const formRef = useRef<HTMLFormElement>(null)
    const [edit, setEdit] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState<boolean>()
    const [invisible, setInvisible] = useState<boolean>(true)
    const { id } = useParams()
    const navigate = useNavigate()

    const getProduct = async () => {
        const response = await database.getDocument(
            Appwrite.databaseId,
            Appwrite.collections.product,
            id!
        )
        setProduct(response as ProductType)
        setIsChecked((response as ProductType).published)
    }

    const deleteProduct = async (productId: string) => {
        await database.deleteDocument(
            Appwrite.databaseId,
            Appwrite.collections.product,
            productId
        ).then(() => {
            navigate(Paths.Products)
            toast.warning('Producto eliminado')
        }).catch(() => {
            toast.error('Algo salió mal', {
                description: 'No se pudo eliminar el producto'
            })
        })
    }

    const editProduct = () => {
        setEdit(true)
        setInvisible(false)
    }

    const saveProduct = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEdit(false)
        setInvisible(true)

        const form = e.currentTarget
        const data = new FormData(form)
        const formFields = Object.fromEntries(data.entries())

        await database.updateDocument(
            Appwrite.databaseId,
            Appwrite.collections.product,
            product!.$id,
            {
                name: formFields.name,
                code: formFields.code,
                price: parseFloat(formFields.price as string),
                published: formFields.published ? true: false,
                available_quantity: Number(formFields.available_quantity),
            }
        ).then(() => {
            toast.success('Producto editado')
        }).catch(() => {
            toast.error('Algo salió mal', {
                description: 'No se pudo editar el producto'
            })
        })
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            <HelperHelment title={`Tendo | ${product?.name}`} />

            <Breadcrumb p='20px 20px 20px 20px' separator={<ChevronRightIcon />}>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to={Paths.Products}>Productos</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color='teal'>{product?.name}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <HStack p='0px 20px' justifyContent='space-between'>
                <Box display='flex' gap='1em'>
                    <Button size='sm' colorScheme='teal' onClick={editProduct} className={invisible ? '' : 'inactive'} >Editar</Button>
                    <Button size='sm' colorScheme='teal' onClick={() => formRef.current?.requestSubmit()} className={invisible ? 'inactive' : ''}>Guardar</Button>
                    <Link to={ Paths.Products }>
                        <Button size='sm' colorScheme='gray'>Cancelar</Button>
                    </Link>
                </Box>
                <Box>
                    <Button
                        size='sm'
                        colorScheme='red'
                        leftIcon={<DeleteIcon />}
                        onClick={() => product && deleteProduct(product?.$id)}
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
                <Box as='form' p='20px' onSubmit={saveProduct} ref={formRef}>
                    <HStack gap='10em'>
                        <FormControl>
                            <Input type='text' name='name' disabled={edit ? false : true} defaultValue={product?.name} />
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
                                {product?.photo_url ? 
                                    <Image src={product?.photo_url} alt='Foto' w='100%' h='100%' />
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
                                    disabled={edit ? false : true}
                                    />
                            </Box>
                        </FormControl>
                    </HStack>
                    <HStack gap='10em'>
                        <FormControl>
                            <FormLabel>Code</FormLabel>
                            <Input type='text' name='code' disabled={edit ? false : true} defaultValue={product?.code} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Price</FormLabel>
                            <Input type='number' name='price' step='0.01' disabled={edit ? false : true} defaultValue={product?.price} />
                        </FormControl>    
                    </HStack>
                    <HStack gap='10em'>
                        <FormControl>
                            <FormLabel>Cantidad disponible</FormLabel>
                            <Input type='number' name='available_quantity' disabled={edit ? false : true} defaultValue={product?.available_quantity}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Publicado</FormLabel>
                            <Checkbox
                                disabled={edit ? false : true}
                                name='published'
                                isChecked={isChecked}
                                colorScheme='teal'
                                onChange={() => setIsChecked((prev) => !prev)}
                                >
                            </Checkbox>
                        </FormControl>
                    </HStack>
                </Box>
            </Box>
        </>
    )
}

export default ProductForm