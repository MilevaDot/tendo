import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Heading, HStack, Icon, Image, Input, Text } from "@chakra-ui/react"
import { useCart } from "../../store/useCart"
import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons"

const DrawerCart = ({ isOpen, onClose } : {
    isOpen: boolean
    onClose: () => void
}) => {
    const { productCart } = useCart()
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
                        productCart.map(product => (
                            <>
                                <HStack>
                                    <Box w='30%' m='1em 0'>
                                        <Image src={product.photo_url} alt={product.name}/>
                                    </Box>
                                    <Box w='70%'>
                                        <Heading as='h6' size='xs'>{product.name}</Heading>
                                        <Text>Precio: {product.price}</Text>
                                        <HStack justifyContent='space-between'>
                                            <HStack>
                                                <Button size='xs'>
                                                    <Icon boxSize={3} as={MinusIcon} />
                                                </Button>
                                                <Text>1</Text>
                                                <Button size='xs' colorScheme='teal'>
                                                    <Icon boxSize={3} as={AddIcon} />
                                                </Button>
                                            </HStack>
                                            <Button size='xs' colorScheme='red'>
                                                <Icon boxSize={3} as={DeleteIcon} />
                                            </Button>
                                        </HStack>
                                    </Box>
                                </HStack>
                                <Divider />
                            </>
                        ))
                    }
                </DrawerBody>

            </DrawerContent>
            <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
                </Button>
                <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
        </Drawer>
    )
}

export default DrawerCart