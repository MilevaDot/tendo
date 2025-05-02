import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormLabel, HStack, Input } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { database, ID } from "../../lib/appwrite"
import { Appwrite } from "../../lib/env"
import { toast } from "sonner"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { useRef } from "react"
import HelperHelment from "@helpers/HelperHelmet"
// import Breadcrumbs from "../../shared/components/breadcrumbs/Breadcrumbs"

const WarehouseCreate = () => {
    const formRef = useRef<HTMLFormElement>(null)
    

    const createForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)
        const entries = Object.fromEntries(data.entries())
        await database.createDocument(Appwrite.databaseId, Appwrite.collections.warehouses, ID.unique(), entries).then(() => {
            toast.success('Almacén creado')
        }).catch(() => {
            toast.error('Algo salió mal', {
                description: 'No se pudo crear el almacén'
            })
        })
    }
    return (
        <>
            {/* <Breadcrumbs title='Almacenes'>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color='teal'>Creando almacén</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumbs> */}
            <HelperHelment title='Tendo | Creando almacén' />
            <Breadcrumb p='20px 20px 20px 20px' separator={<ChevronRightIcon />}>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/warehouse'>Almacenes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color='teal'>Creando almacén</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <HStack p='0px 20px' justifyContent='space-between'>
                <Box display='flex' gap='1em'>
                    <Link to={ '/warehousecreate' }>
                        <Button size='sm' colorScheme='teal' onClick={() => formRef.current?.requestSubmit()}>Guardar</Button>
                    </Link>
                    <Link to={ '/warehouse' }>
                        <Button size='sm' colorScheme='gray'>Cancelar</Button>
                    </Link>
                </Box>
            </HStack>
            <Box
                m='20px'
                p='0px 50px'
                borderRadius='10px'
                backgroundColor='var(--gray)'
                border='2px solid var(--gray-border)'
                >
                <Box as='form' p='20px' onSubmit={createForm} ref={formRef}>
                    <HStack gap='10em'>
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input type='text' name='name' required />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Nombre corto</FormLabel>
                            <Input type='text' name='short_name' required />
                        </FormControl>
                    </HStack>
                    <HStack gap='10em'>
                        <FormControl>
                            <FormLabel>Descripción</FormLabel>
                            <Input type='text' name='description' required />
                        </FormControl>
                    </HStack>
                </Box>
            </Box>
        </>
    )
}

export default WarehouseCreate