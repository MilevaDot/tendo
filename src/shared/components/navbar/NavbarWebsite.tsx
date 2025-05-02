import { Avatar, Box, Button, Heading, HStack, useDisclosure } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Paths } from "../../../router/routes"
import { useEffect, useLayoutEffect, useState } from "react"
import './navbarwebsite.css'
import DrawerProfile from "../drawer/DrawerProfile"
import { useProfileStore } from "../../store/useProfileStore"

const NavbarWebsite = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { profile, session, getSession, getProfile } = useProfileStore()
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
        getSession()
        getProfile()
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
                        session
                            ?
                                <Button variant='ghost' onClick={onOpen}>
                                    <Avatar size='sm' src={profile?.photo_address} />
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