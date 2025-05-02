import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Center, Heading, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, useSteps } from "@chakra-ui/react"
import HelperHelment from "@helpers/HelperHelmet"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { Paths } from "../../router/routes"
import { PDFViewer } from "@react-pdf/renderer"
import Voucher from "../../shared/pdf/Voucher"
import { useCart } from "../../shared/store/useCart"

const steps = [
    { title: 'Mi compra actual', description: 'Verfico mis productos'},
    { title: 'Metódo de pago', description: 'Pago por mis productos'},
    { title: 'Comprobante', description: 'Compra completada'},
]

const WebsiteVoucher = () => {
    const { activeStep } = useSteps({
        index: 3,
        count: steps.length,
    })

    const { productCart } = useCart()
    return (
        <>
            <HelperHelment title='Tendo | Pago' />
            <Box paddingTop='100px'>
                <Breadcrumb p='0 2.4em' spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to={Paths.Website}>Inicio</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to={Paths.WebsiteProduct}>Productos</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to={Paths.WebsiteCart}>Mi Compra Actual</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to={Paths.WebsitePayment}>Mi pago actual</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink color='teal'>Comprobante</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </Box>

            <Box p='2.4em'>
                <Heading>Mi compra actual</Heading>
                <Stepper p='1em 0' size='md' index={activeStep} colorScheme='teal' >
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink='0'>
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                            </Box>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>

                <Center p='3em 0' width='100%' height='100vh'>
                    <PDFViewer width='100%' height='100%'>
                        <Voucher productCart={productCart} />
                    </PDFViewer>
                </Center>
            </Box>
        </>
    )
}

export default WebsiteVoucher