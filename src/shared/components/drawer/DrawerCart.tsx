import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, HStack, Icon, Image, Text } from "@chakra-ui/react"
import { useCart } from "../../store/useCart"
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons"
import { CartItem } from "../../../declarations/Cart"
import { FaRegTrashCan } from "react-icons/fa6"
import { LuShoppingCart } from "react-icons/lu"
import { Link } from "react-router-dom"
import { Paths } from "../../../router/routes"

const DrawerCart = ({ isOpen, onClose } : {
    isOpen: boolean
    onClose: () => void
}) => {
    const { productCart, addToCart, lessToCart, deleteItem, clearCart } = useCart()

    const lessItem = ( item: CartItem ) => {
        if ( item.quantity > 1 ) {
            lessToCart(item.product)
        } else {
            deleteItem(item.product.$id)
        }
    }
    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton colorScheme='teal' />
                <DrawerHeader>Mis compras</DrawerHeader>
                <DrawerBody>
                    {
                        productCart.map(item => (
                            <Box key={item.product.$id}>
                                <HStack>
                                    <Box w='30%' m='1em 0'>
                                        <Image src={item.product.photo_url} alt={item.product.name}/>
                                    </Box>
                                    <Box w='70%'>
                                        <Heading as='h6' size='xs'>{item.product.name}</Heading>
                                        <Text>Precio unit.: {item.product.price}</Text>
                                        <Text>Precio total: {(item.product.price * item.quantity).toFixed(2)}</Text>
                                        <HStack justifyContent='space-between'>
                                            <HStack>
                                                <Button size='xs' onClick={() => lessItem(item)}>
                                                    <Icon boxSize={3} as={MinusIcon} />
                                                </Button>
                                                <Text>{item.quantity}</Text>
                                                <Button size='xs' colorScheme='teal' onClick={() => addToCart(item.product)}>
                                                    <Icon boxSize={3} as={AddIcon} />
                                                </Button>
                                            </HStack>
                                            <Button size='xs' colorScheme='red' onClick={() => deleteItem(item.product.$id)}>
                                                <Icon boxSize={3} as={DeleteIcon} />
                                            </Button>
                                        </HStack>
                                    </Box>
                                </HStack>
                                <Divider />
                            </Box>
                        ))
                    }
                </DrawerBody>
                <DrawerFooter>
                    <Button colorScheme='orange' variant='outline' mr={3} leftIcon={<FaRegTrashCan />} onClick={() => clearCart()}>
                        Vaciar
                    </Button>
                    <Link to={Paths.WebsiteCart}>
                        <Button colorScheme='teal' leftIcon={<LuShoppingCart />}>Comprar!</Button>
                    </Link>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerCart