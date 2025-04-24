import { useEffect, useState } from "react"
import HelperHelment from "../../helpers/HelperHelmet"
import { database } from "../../lib/appwrite"
import { Appwrite } from "../../lib/env"
import { ProductType } from "../../declarations/Warehouse"
import { Query } from "appwrite"
import { Badge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Checkbox, HStack, Input, InputGroup, InputLeftElement, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { ChevronRightIcon, Search2Icon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { Paths } from "../../router/routes"
import SkeletonLoader from "../../shared/components/loader/SkeletonLoader"

const Products = () => {
    const [products, setProducts] = useState<Array<ProductType>>()
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const getProducts = async () => {
        setLoading(true)
        const response = await database.listDocuments(
            Appwrite.databaseId,
            Appwrite.collections.product
        )
        setProducts(response.documents as Array<ProductType>)
        setLoading(false)
    }

    const searchProduct = async () => {
        setLoading(true)
        const response = await database.listDocuments(
            Appwrite.databaseId,
            Appwrite.collections.product,
            [
                Query.or([
                    Query.contains('name', search),
                    Query.contains('code', search)
                ])
            ]
        )
        setProducts(response.documents as Array<ProductType>)
        setLoading(false)
    }

    const handleSearch = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if ( e.key == 'Enter' ) {
            searchProduct()
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <HelperHelment title='Tendo | Productos' />

            <Breadcrumb p='20px 20px 20px 20px' separator={<ChevronRightIcon />}>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color='teal'>Productos</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <HStack p='0px 20px' justifyContent='space-between'>
                <Box>
                    <Link to={ Paths.ProductCreate }>
                        <Button size='sm' colorScheme='teal'>Crear</Button>
                    </Link>
                </Box>
                <Box display='flex' gap='1em' alignItems='center'>
                    <InputGroup>
                        <InputLeftElement>
                            <Search2Icon color='teal' />
                        </InputLeftElement>
                        <Input
                            type='tel'
                            placeholder='Buscar producto'
                            w='auto'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleSearch}
                            />
                    </InputGroup>
                </Box>
            </HStack>
            <Box p='20px'>
                <TableContainer border='2px solid #F1F2F5' borderRadius='10px'>
                    <Table size='sm'>
                        <Thead backgroundColor='#F9FAFC'>
                            <Tr>
                                <Th paddingY='0.8em'><Checkbox colorScheme='teal'></Checkbox></Th>
                                <Th paddingY='0.8em'>Código</Th>
                                <Th paddingY='0.8em'>Nombre</Th>
                                <Th paddingY='0.8em'>Precio</Th>
                                <Th paddingY='0.8em'>Publicado</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                loading ?
                                    <>
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                    </>
                                :
                                products?.map(product => (
                                    <Tr key={product.$id}>
                                        <Td>
                                            <Checkbox colorScheme='teal'></Checkbox>
                                        </Td>
                                        <Td>
                                            <Link to={`/products/${product.$id}`}>
                                                <Box display='flex' gap='1em'>
                                                    {product.code}
                                                </Box>
                                            </Link>
                                        </Td>
                                        <Td>
                                            <Link to={`/products/${product.$id}`}>
                                                {product.name}
                                            </Link>
                                        </Td>
                                        <Td>
                                            <Link to={`/products/${product.$id}`}>
                                                {product.price}
                                            </Link>
                                        </Td>
                                        <Td>
                                            <Link to={`/products/${product.$id}`}>
                                                {
                                                    product.published ?
                                                        <Badge p='0px 8px' borderRadius='10px' colorScheme='green'>Publicado</Badge>
                                                        :
                                                        <Badge p='0px 8px' borderRadius='10px' colorScheme='red'>No Publicado</Badge>
                                                }
                                            </Link>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default Products