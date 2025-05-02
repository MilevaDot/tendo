import { Avatar, Flex, Heading, HStack, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Paths } from "../../../router/routes"
import { DragHandleIcon } from "@chakra-ui/icons"
import { useContext, useEffect } from "react"
import { UserContext } from "@context/UserContext"
import { useProfileStore } from "../../store/useProfileStore"

const Navbar = () => {

    const context = useContext(UserContext)
    const { profile, getSession, getProfile } = useProfileStore()
    useEffect(() => {
        getSession()
        getProfile()
    }, [])

    return (
        <>
            <Flex
                p='4px 20px'
                gap='20px'
                alignItems='center'
                justifyContent='space-between'
                backgroundColor='teal'
                >
                <Flex gap='1em'>
                    <HStack
                        alignItems='center'>
                        <Tooltip label='Menú principal'>
                            <Link to={ Paths.MainMenu }>
                                <DragHandleIcon />
                            </Link>
                        </Tooltip>
                    </HStack>
                    <HStack>
                        <Heading size='md'>Tendo</Heading>
                    </HStack>
                </Flex>
                <Menu>
                    <MenuButton
                        p='0.1em'
                        transition='all 0.2s'
                        borderRadius='8px'
                        _hover={{ bg: 'teal.500' }}
                        >
                        <Flex gap='4px' alignItems='center' flexWrap='wrap'>
                            <Avatar size='sm' name={profile?.name} src={profile?.photo_address} />
                            <Flex alignItems='start' flexDirection='column'>
                                <Heading size='sm'>{profile?.name}</Heading>
                                <Text fontSize='sm'>{profile?.email}</Text>
                            </Flex>
                        </Flex>
                    </MenuButton>
                    <MenuList>
                        <MenuItem as={Link} to={`/agenda/${profile?.$id}`}>Mi perfil</MenuItem>
                        <MenuItem>Mis preferencias</MenuItem>
                        <MenuItem onClick={() => context?.logOut()}>Cerrar sesión</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </>
    )
}

export default Navbar