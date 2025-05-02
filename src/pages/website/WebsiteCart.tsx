import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Heading, HStack, Icon, Image, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useSteps } from "@chakra-ui/react"
import HelperHelment from "@helpers/HelperHelmet"
import { AddIcon, ChevronRightIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { Paths } from "../../router/routes"
import { useCart } from "../../shared/store/useCart"
import { CartItem } from "../../declarations/Cart"

const steps = [
    { title: 'Mi compra actual', description: 'Verfico mis productos'},
    { title: 'Metódo de pago', description: 'Pago por mis productos'},
    { title: 'Comprobante', description: 'Compra completada'},
]
const WebsiteCart = () => {
    const { productCart, addToCart, lessToCart, deleteItem } = useCart()
    const { activeStep } = useSteps({
        index: 0,
        count: steps.length,
    })

    const lessItem = ( item: CartItem ) => {
        if ( item.quantity > 1 ) {
            lessToCart(item.product)
        } else {
            deleteItem(item.product.$id)
        }
    }

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

                    <TableContainer p='1em 0'>
                        <Table variant='striped' size='lg'>
                            <Thead>
                                <Tr>
                                    <Th></Th>
                                    <Th>Imagen</Th>
                                    <Th>Producto</Th>
                                    <Th isNumeric>Cantidad</Th>
                                    <Th isNumeric>Precio Unitario</Th>
                                    <Th isNumeric>Subtotal(S/.)</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    productCart?.map(item =>(
                                        <Tr key={item.product.$id}>
                                            <Td>
                                                <Button colorScheme='red' onClick={() => deleteItem(item.product.$id)}>
                                                    <Icon boxSize={5} as={DeleteIcon} />
                                                </Button>
                                            </Td>
                                            <Td w='200px'>
                                                <Link to={`/websiteproduct/${item.product.$id}`}>
                                                    <Image src={item.product.photo_url} alt={item.product.name} />
                                                </Link>
                                            </Td>
                                            <Td>
                                                <Link to={`/websiteproduct/${item.product.$id}`}>
                                                    {item.product.name}
                                                </Link>
                                            </Td>
                                            <Td isNumeric>
                                                <HStack gap='1em'>
                                                    <Button size='xs' colorScheme='red' onClick={() => lessItem(item)}>
                                                        <Icon boxSize={3} as={MinusIcon} />
                                                    </Button>
                                                    <Text>
                                                        {item.quantity}
                                                    </Text>
                                                    <Button size='xs' colorScheme='teal' onClick={() => addToCart(item.product)}>
                                                        <Icon boxSize={3} as={AddIcon} />
                                                    </Button>
                                                </HStack>
                                            </Td>
                                            <Td isNumeric>{(item.product.price).toFixed(2)}</Td>
                                            <Td isNumeric>{(item.product.price * item.quantity).toFixed(2)}</Td>
                                        </Tr>
                                    ))
                                }
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th colSpan={3}>Total</Th>
                                    <Th textAlign='center'>
                                        {
                                            productCart?.reduce((sum, item) => sum + item.quantity, 0)
                                        }
                                    </Th>
                                    <Th></Th>
                                    <Th isNumeric>S/.
                                        {
                                            productCart?.reduce((sum, item) => sum + (item.product.price * (item.quantity)), 0).toFixed(2)
                                        }
                                    </Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                    <HStack justify='end'>
                        <Button
                            as={Link}
                            to={Paths.WebsitePayment}
                            colorScheme='teal'>
                            Continuar
                        </Button>
                    </HStack>
                </Box>
            </Box>
        </>
    )
}

export default WebsiteCart