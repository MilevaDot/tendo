import { Avatar, Box, Button, Heading, HStack, useDisclosure } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Paths } from "../../../router/routes"
import { useContext, useEffect, useLayoutEffect, useState } from "react"
import './navbarwebsite.css'
import DrawerProfile from "../drawer/DrawerProfile"
import { UserContext } from "@context/UserContext"

const NavbarWebsite = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const context = useContext(UserContext)
    const scrolling = () => {
        if ( window.scrollY >= 100 ) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
    }

    useLayoutEffect(() => {
        window.addEventListener('scroll', scrolling)
    }, [])

    useEffect(() => {
        context?.getSession()
        context?.getProfile()
    }, [])
    return (
        <>
            <HStack
                w='100%'
                justify='space-around'
                zIndex='1'
                position='fixed'
                p='1em'
                className={isScrolled ? 'navbar-bg' : ''}
                >
                <Link to={Paths.Website}>
                    <Heading color='teal'>Tendo!</Heading>
                </Link>
                <Box display='flex' gap='20px' color='teal'>
                    <Link to={Paths.WebsiteUs}>Nosotros</Link>
                    <Link to={Paths.WebsiteProduct}>Productos</Link>
                    <Link to={Paths.WebsiteService}>Servicios</Link>
                    {
                        context?.session
                            ?
                                <Button variant='ghost' onClick={onOpen}>
                                    <Avatar size='sm' src={context.profile?.photo_address} />
                                </Button>
                            :
                            <Link to={Paths.Login}>Ingresar</Link>
                    }
                </Box>
            </HStack>
            <DrawerProfile isOpen={isOpen} onClose={onClose} />

        </>
    )
}

export default NavbarWebsite