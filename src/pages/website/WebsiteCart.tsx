import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from "@chakra-ui/react"
import HelperHelment from "../../helpers/HelperHelmet"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { Paths } from "../../router/routes"

const WebsiteCart = () => {
    return (
        <>
            <HelperHelment title='Tendo | Mi compra actual' />
            <Box paddingTop='100px'>

                <Breadcrumb p='0 2.4em' spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to={Paths.Website}>Inicio</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to={Paths.WebsiteProduct}>Productos</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color='teal'>Mi Compra Actual</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

                <Box p='2.4em'>
                    <Heading>Mi compra actual</Heading>

                </Box>
            </Box>
        </>
    )
}

export default WebsiteCart