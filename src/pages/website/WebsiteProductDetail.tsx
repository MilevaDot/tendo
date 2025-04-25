import { useEffect, useState } from "react"
import HelperHelment from "../../helpers/HelperHelmet"
import { ProductType } from "../../declarations/Warehouse"
import { useParams } from "react-router-dom"
import { database } from "../../lib/appwrite"
import { Appwrite } from "../../lib/env"
import { Box, Button, ButtonGroup, Heading, HStack, Image, Text } from "@chakra-ui/react"
import { LuShoppingCart } from "react-icons/lu"
import { CiHeart } from "react-icons/ci"

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