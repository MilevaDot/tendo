import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react"
import HelperHelment from "../../helpers/HelperHelmet"
import { useEffect, useState } from "react"
import { database } from "../../lib/appwrite"
import { Appwrite } from "../../lib/env"
import { ProductType } from "../../declarations/Warehouse"
import { Query } from "appwrite"
import { LuShoppingCart } from "react-icons/lu"
import { Link } from "react-router-dom"
import { useCart } from "../../shared/store/useCart"
import DrawerCart from "../../shared/components/drawer/DrawerCart"

const WebsiteProduct = () => {
    const [products, setProducts] = useState<Array<ProductType>>()
    const { addToCart } = useCart()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const getProducts = async () => {
        const response = await database.listDocuments(
            Appwrite.databaseId,
            Appwrite.collections.product,
            [
                Query.equal('published', true)
            ]
        )
        setProducts(response.documents as Array<ProductType>)
    }

    const addProduct = (product: ProductType) => {
        addToCart(product)
        onOpen()
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <HelperHelment title='Tendo | Productos' />
            <Box paddingTop='100px'>

                <Box p='2.4em'>
                    <Heading>Somos tu mejor elección</Heading>

                    <SimpleGrid p='1em 0' spacing={8} templateColumns='repeat(auto-fill, minmax(220px, 1fr))'>
                        {
                            products?.map(product => (
                                <Card maxW='md' key={product.$id} justifyContent='space-between'>
                                    <Link to={`/websiteproduct/${product.$id}`}>
                                        <CardBody>
                                            <Image src={product.photo_url} alt={product.name} />
                                            <Stack mt='6' spacing='1'>
                                                <Heading as='h5' size='sm'>
                                                    {product.name}
                                                </Heading>
                                                <Text>{product.name}</Text>
                                                <Text color='teal' fontSize='2xl'>S/. {product.price}</Text>
                                            </Stack>
                                        </CardBody>
                                    </Link>
                                    <Box paddingX='1em'>
                                        <Divider />
                                    </Box>
                                    <CardFooter>
                                        <ButtonGroup spacing='2'>
                                            <Button variant='solid' colorScheme='teal'>
                                                Comprar!
                                            </Button>
                                            <Button variant='ghost' colorScheme='teal' onClick={() => addProduct(product)} >
                                                <LuShoppingCart />Al carrito
                                            </Button>
                                        </ButtonGroup>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </SimpleGrid>
                    <DrawerCart isOpen={isOpen} onClose={onClose}/>
                </Box>
            </Box>
        </>
    )
}

export default WebsiteProduct