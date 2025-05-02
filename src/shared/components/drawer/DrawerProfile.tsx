import { ChevronDownIcon } from "@chakra-ui/icons"
import { Avatar, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci"
import { Link } from "react-router-dom"
import { Paths } from "../../../router/routes"
import { CgLogOut } from "react-icons/cg"
import { UserContext } from "@context/UserContext"
import { useProfileStore } from "../../store/useProfileStore"

const DrawerProfile = ({ isOpen, onClose } : {
    isOpen: boolean
    onClose: () => void
}) => {
    const context = useContext(UserContext)
    const { profile, session } = useProfileStore()
    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
                <HStack>
                    <Avatar src={profile?.photo_address} />
                    <Text>
                        {session?.name}
                    </Text>
                </HStack>
            </DrawerHeader>

            <DrawerBody>
                <Menu>
                    <MenuButton
                        colorScheme='teal'
                        leftIcon={<CiUser />}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        variant='outline'
                        >
                        Mi perfil
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Información personal</MenuItem>
                    </MenuList>
                </Menu>
                <br />
                <br />
                <Menu>
                    <MenuButton
                        colorScheme='teal'
                        leftIcon={<CiShoppingCart />}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        variant='outline'
                        >
                        Mis Compras
                    </MenuButton>
                    <MenuList>
                        <MenuItem as={Link} to={Paths.WebsiteCart}>Mi compra actual</MenuItem>
                        <MenuItem>Historial de compras</MenuItem>
                    </MenuList>
                </Menu>
                <br />
                <br />
                <Menu>
                    <MenuButton
                        colorScheme='teal'
                        leftIcon={<CiHeart />}
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        variant='outline'
                        >
                        Mis Favoritos
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Mi lista</MenuItem>
                        <MenuItem>Favoritos</MenuItem>
                    </MenuList>
                </Menu>
                <br />
                <br />
                {
                    profile?.type == 'Interno'
                        ?
                        <Link to={Paths.MainMenu}>
                            <Button colorScheme='teal'>Tendo!</Button>
                        </Link>
                        :
                        <></>
                }
            </DrawerBody>

            <DrawerFooter>
                <Button
                    leftIcon={<CgLogOut />}
                    colorScheme='red'
                    onClick={() => context?.logOut()}>Cerrar Sesión</Button>
            </DrawerFooter>
            </DrawerContent>
        </Drawer>
        )
}

export default DrawerProfile