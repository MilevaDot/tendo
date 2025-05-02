import { useEffect, useState } from "react"
import HelperHelment from "@helpers/HelperHelmet"
import { ProductType } from "../../declarations/Warehouse"
import { Link, useParams } from "react-router-dom"
import { database } from "../../lib/appwrite"
import { Appwrite } from "../../lib/env"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ButtonGroup, Heading, HStack, Image, Text } from "@chakra-ui/react"
import { LuShoppingCart } from "react-icons/lu"
import { CiHeart } from "react-icons/ci"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { Paths } from "../../router/routes"

const WebsiteProductDetail = () => {
    const [product, setProduct] = useState<ProductType>()
    const { id } = useParams()

    const getProduct = async () => {
        const response = await database.getDocument(
            Appwrite.databaseId,
            Appwrite.collections.product,
            id!
        )
        setProduct(response as ProductType)
    }

    useEffect(() => {
        getProduct()
    }, [])


    return (
        <>
            <HelperHelment title={`Tendo | ${product?.name}`} />
            <Box paddingTop='100px'>

                <Breadcrumb p='0 2.4em' spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to={Paths.Website}>Inicio</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to={Paths.WebsiteProduct}>Productos</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color='teal'>{product?.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

                <Box p='2.4em'>
                    <HStack gap='3em'>
                        <Box w='40%'>
                            <Image src={product?.photo_url} alt={product?.name} />
                        </Box>
                        <Box w='60%'>
                            <Heading as='h2' size='xl'>{product?.name}</Heading>
                            <Text>Código de producto: <span>{product?.code}</span></Text>
                            <Text color='teal' fontSize='2xl'>S/. {product?.price}</Text>
                            <ButtonGroup spacing='4'>
                                <Button variant='solid' colorScheme='teal'>
                                    <LuShoppingCart />
                                    <Text ml='0.5em'>Comprar</Text>
                                </Button>
                                <Button variant='ghost' colorScheme='teal'>
                                    <CiHeart />
                                    <Text ml='0.5em'>Favorito</Text>
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </HStack>
                </Box>
            </Box>
        </>
    )
}

export default WebsiteProductDetail
