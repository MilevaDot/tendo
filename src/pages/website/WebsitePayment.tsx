import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardFooter, CardHeader, Center, Heading, Image, SimpleGrid, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, useSteps } from "@chakra-ui/react"
import HelperHelment from "@helpers/HelperHelmet"
import { Link } from "react-router-dom"
import { Paths } from "../../router/routes"
import { ChevronRightIcon } from "@chakra-ui/icons"

const steps = [
    { title: 'Mi compra actual', description: 'Verfico mis productos'},
    { title: 'Metódo de pago', description: 'Pago por mis productos'},
    { title: 'Comprobante', description: 'Compra completada'},
]

const WebsitePayment = () => {
    const { activeStep } = useSteps({
        index: 1,
        count: steps.length,
    })
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

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink color='teal'>Mi pago actual</BreadcrumbLink>
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

                <Center>
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                        <Card>
                            <CardHeader>
                                <Heading size='md'>Yape</Heading>
                            </CardHeader>
                            <CardBody>
                                <Image src='src\assets\yape_logo.png' alt='Yape logo' />
                            </CardBody>
                            <CardFooter justify='center'>
                                <Button
                                    colorScheme='teal'
                                    as={Link}
                                    to={Paths.WebsiteVoucher}
                                    >
                                    Pagar
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Heading size='md'>Visa</Heading>
                            </CardHeader>
                            <CardBody>
                                <Image src='src\assets\visa_logo.png' alt='Visa logo' />
                            </CardBody>
                            <CardFooter justify='center'>
                                <Button
                                    colorScheme='teal'
                                    as={Link}
                                    to={Paths.WebsiteVoucher}
                                    >
                                    Pagar
                                </Button>
                            </CardFooter>
                        </Card>
                    </SimpleGrid>
                </Center>
            </Box>
        </>
    )
}

export default WebsitePayment