import { Box, Heading, HStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Paths } from "../../../router/routes"
import { useState } from "react"
import './navbarwebsite.css'

const NavbarWebsite = () => {
    const [isScrolled, setIsScrolled] = useState(false)

    const scrolling = () => {
        if ( window.scrollY >= 100 ) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
    }
    window.addEventListener('scroll', scrolling)
    // useEffect(() => {
    //     scrolling()
    // }, [window.scrollY])

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
                    <Link to={Paths.Login}>Ingresar</Link>
                </Box>
            </HStack>
        </>
    )
}

export default NavbarWebsite