import { Box, Button, Center, Divider, Heading, Image, Menu, MenuButton, MenuItem, MenuList, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react"
import { CiBellOn, CiCalendar, CiShop, CiUser } from "react-icons/ci"
import './mainmenu.css'
import { FaBoxOpen, FaRegCreditCard } from "react-icons/fa"
import { TfiAgenda, TfiWorld } from "react-icons/tfi"
import { TbUsers } from "react-icons/tb"
import { FaUserPen } from "react-icons/fa6"
import { GoTasklist } from "react-icons/go"
import { MdOutlineDashboard } from "react-icons/md"
import { PiCalculatorBold, PiHandshake, PiPantsLight } from "react-icons/pi"
import { Link } from "react-router-dom"
import HelperHelment from "@helpers/HelperHelmet"
import { Paths } from "../../router/routes"

const MainMenu = () => {
    return (
        <>
            <HelperHelment title='Tendo | Menú principal' />

            <Box display='flex'>
                <Box
                    justifyContent='center'
                    w='20%'
                    h='100vh'
                    p='40px'
                    backgroundColor='var(--background)'
                    >
                    <Image src='src\assets\logo_tendo.png' alt='Logo' />
                    <Divider m='20px 0px' />
                    <VStack alignItems='start'>
                        <Menu>
                            <MenuButton
                                as={Button}
                                colorScheme='teal'
                                leftIcon={ <CiUser /> }
                                >
                                <Text className='greenTransition'>Perfil</Text>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Mi perfil</MenuItem>
                                <MenuItem>Idioma</MenuItem>
                                <MenuItem>Mi contacto</MenuItem>
                            </MenuList>
                        </Menu>
                        <Menu>
                            <MenuButton
                                as={Button}
                                leftIcon={ <CiCalendar /> }
                                colorScheme='teal'
                                >
                                <Text className='greenTransition'>Calendario</Text>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Mi perfil</MenuItem>
                                <MenuItem>Idioma</MenuItem>
                                <MenuItem>Mi contacto</MenuItem>
                            </MenuList>
                        </Menu>
                        <Menu>
                            <MenuButton
                                colorScheme='teal'
                                as={Button}
                                leftIcon={ <CiBellOn /> }
                                >
                                <Text className='greenTransition'>Notificaciones</Text>
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Mi perfil</MenuItem>
                                <MenuItem>Idioma</MenuItem>
                                <MenuItem>Mi contacto</MenuItem>
                            </MenuList>
                        </Menu>
                    </VStack>
                </Box>
                <Box w='80%' h='100vh' display='flex' flexDirection='column' alignItems='center'>
                    <Center mt='40px'>
                        <Heading>Mis aplicaciones</Heading>
                    </Center>
                    <Wrap p='40px 200px' spacing='40px'>
                        <WrapItem color='#e7d097' cursor='pointer'>
                            <Link to={'/agenda'}>
                                <VStack borderRadius='8px' backgroundColor='#5C9E9D' gap='0'>
                                    <TfiAgenda className='svg' />
                                    <Text backgroundColor='#5C9E9D' paddingBottom='10px'>Agenda</Text>
                                </VStack>
                            </Link>
                        </WrapItem>
                        <WrapItem color='#e7d097' cursor='pointer'>
                            <Link to={Paths.Warehouse}>
                                <VStack borderRadius='8px' backgroundColor='#5C9E9D' gap='0'>
                                    <FaBoxOpen className='svg' />
                                    <Text backgroundColor='#5C9E9D' paddingBottom='10px'>Almacén</Text>
                                </VStack>
                            </Link>
                        </WrapItem>
                        <WrapItem color='#e7d097' cursor='pointer'>
                            <Link to={Paths.Products}>
                                <VStack borderRadius='8px' backgroundColor='#5C9E9D' gap='0'>
                                    <PiPantsLight className='svg' />
                                    <Text backgroundColor='#5C9E9D' paddingBottom='10px'>Productos</Text>
                                </VStack>
                            </Link>
                        </WrapItem>
                        {/* <WrapItem color='#e7d097' cursor='pointer'>
                            <VStack borderRadius='8px' backgroundColor='#5C9E9D' gap='0'>
                                <CiCalendar className='svg' />
                                <Text backgroundColor='#5C9E9D' paddingBottom='10px'>Calendario</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem color='#e7d097' cursor='pointer'>
                            <VStack borderRadius='8px' backgroundColor='#5C9E9D' gap='0'>
                                <TbUsers className='svg' />
                                <Text backgroundColor='#5C9E9D' paddingBottom='10px'>Usuarios</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem color='#e7d097' cursor='pointer'>
                            <VStack borderRadius='8px' backgroundColor='#5C9E9D' gap='0'>
                                <PiHandshake className='svg' />
                                <Text backgroundColor='#5C9E9D' paddingBottom='10px'>Ventas</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem color='#e7d097' cursor='pointer'>
                            <VStack borderRadius='8px' backgroundColor='#5C9E9D' gap='0'>
                                <CiShop className='svg' />
                                <Text backgroundColor='#5C9E9D' paddingBottom='10px'>PdV</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem color='#e7d097' cursor='pointer'>
                            <VStack borderRadius='8px' backgroundColor='#5C9E9D' gap='0'>
                                <FaRegCreditCard className='svg' />
                                <Text backgroundColor='#5C9E9D' paddingBottom='10px'>Compras</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem color='#e7d097' cursor='pointer'>
                            <VStack borderRadius='8px' backgroundColor='#5C9E9D' gap='0'>
                                <PiCalculatorBold className='svg' />
                                <Text backgroundColor='#5C9E9D' paddingBottom='10px'>Facturación</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem color='#e7d097' cursor='pointer'>
                            <VStack borderRadius='8px' backgroundColor='#5C9E9D' gap='0'>
                                <MdOutlineDashboard className='svg' />
                                <Text backgroundColor='#5C9E9D' paddingBottom='10px'>Dashboard</Text>
                            </VStack>
                        </WrapItem> */}
                        <WrapItem color='#e7d097' cursor='pointer'>
                            <Link to={Paths.Website}>
                                <VStack borderRadius='8px' backgroundColor='#5C9E9D' gap='0'>
                                    <TfiWorld className='svg' />
                                    <Text backgroundColor='#5C9E9D' paddingBottom='10px'>Website</Text>
                                </VStack>
                            </Link>
                        </WrapItem>
                        {/* <WrapItem color='#e7d097' cursor='pointer'>
                            <VStack borderRadius='8px' backgroundColor='#5C9E9D' gap='0'>
                                <GoTasklist className='svg' />
                                <Text backgroundColor='#5C9E9D' paddingBottom='10px'>Tareas</Text>
                            </VStack>
                        </WrapItem>
                        <WrapItem color='#e7d097' cursor='pointer'>
                            <VStack borderRadius='8px' backgroundColor='#5C9E9D' gap='0'>
                                <FaUserPen className='svg' />
                                <Text backgroundColor='#5C9E9D' paddingBottom='10px'>Planilla</Text>
                            </VStack>
                        </WrapItem> */}
                    </Wrap>
                </Box>
            </Box>
        </>
    )
}

export default MainMenu