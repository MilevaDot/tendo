import { Badge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Checkbox, HStack, IconButton, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { database } from "../../lib/appwrite"
import { AppwriteResponse } from "../../declarations/AppwriteTypes"
import { WarehouseType } from "../../declarations/Warehouse"
import { Appwrite } from "../../lib/env"
import { ChevronRightIcon, Search2Icon } from "@chakra-ui/icons"
import { Query } from "appwrite"
// import { FiFilter } from "react-icons/fi"
import SkeletonLoader from "../../shared/components/loader/SkeletonLoader"
import FilterButton from "../../shared/components/filter/FilterButton"
import HelperHelment from "../../helpers/HelperHelmet"
// import Breadcrumbs from "../../shared/components/breadcrumbs/Breadcrumbs"

const Warehouse = () => {
    const [warehouses, setWarehouses] = useState(Array<WarehouseType>)
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const getWarehouses = async () => {
        setLoading(true)
        const response: AppwriteResponse = await database.listDocuments(
            Appwrite.databaseId,
            Appwrite.collections.warehouses
        )
        setWarehouses(response.documents as Array<WarehouseType>)
        setLoading(false)
    }

    const searchWarehouse = async () => {
        setLoading(true)
        const response = await database.listDocuments(
            Appwrite.databaseId,
            Appwrite.collections.warehouses,
            [
                Query.or([
                    Query.contains('name', search),
                    Query.contains('short_name', search)
                ])
            ]
        )
        setWarehouses(response.documents as Array<WarehouseType>)
        setLoading(false)
    }

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ( e.key == 'Enter') {
            searchWarehouse()
        }
    }

    const searchActive = async () => {
        setLoading(true)
        const response = await database.listDocuments(
            Appwrite.databaseId,
            Appwrite.collections.warehouses,
            [
                Query.equal('active', true)
            ]
        )
        setWarehouses(response.documents as Array<WarehouseType>)
        setLoading(false)
    }

    const searchInactive = async () => {
        setLoading(true)
        const response = await database.listDocuments(
            Appwrite.databaseId,
            Appwrite.collections.warehouses,
            [
                Query.equal('active', false)
            ]
        )
        setWarehouses(response.documents as Array<WarehouseType>)
        setLoading(false)
    }

    useEffect(() => {
        getWarehouses()
    }, [])

    return (
        <>
            <HelperHelment title='Tendo | Almacén' />
            {/* <Breadcrumbs title='Almacenes'>
                <Box></Box>
            </Breadcrumbs> */}
            <Breadcrumb p='20px 20px 20px 20px' separator={<ChevronRightIcon />}>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color='teal'>Almacenes</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <HStack p='0px 20px' justifyContent='space-between'>
                <Box>
                    <Link to={ '/warehousecreate' }>
                        <Button size='sm' colorScheme='teal'>Crear</Button>
                    </Link>
                </Box>
                <Box display='flex' gap='1em' alignItems='center'>
                    <FilterButton
                        field1='Activo'
                        filterField1={searchActive}
                        field2='Inactivo'
                        filterField2={searchInactive}
                        cleanFilters={getWarehouses}
                        />
                    {/* <Menu>
                        <MenuButton
                            as={IconButton}
                            icon={<FiFilter color='teal' />}  />
                        <MenuList>
                            <MenuItem onClick={searchActive}>Activo</MenuItem>
                            <MenuItem onClick={searchInactive}>Inactivo</MenuItem>
                            <MenuDivider />
                            <MenuItem fontSize='10px' onClick={getWarehouses}>Limpiar filtros</MenuItem>
                        </MenuList>
                    </Menu> */}
                    <InputGroup>
                        <InputLeftElement>
                            <Search2Icon color='teal' />
                        </InputLeftElement>
                        <Input
                            type='tel'
                            placeholder='Buscar almacén'
                            w='auto'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleSearch}
                            />
                    </InputGroup>
                </Box>
            </HStack>

            <Box p='20px'>
                <TableContainer border='2px solid #F1F2F5' borderRadius='10px'>
                    <Table size='sm'>
                        <Thead backgroundColor='#F9FAFC'>
                            <Tr>
                                <Th paddingY='0.8em'><Checkbox colorScheme='teal'></Checkbox></Th>
                                <Th paddingY='0.8em'>Nombre</Th>
                                <Th paddingY='0.8em'>Nombre corto</Th>
                                <Th paddingY='0.8em'>Descripción</Th>
                                <Th paddingY='0.8em'>Activo</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                loading ?
                                    <>
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                        <SkeletonLoader />
                                    </>
                                :
                                warehouses?.map(warehouse => (
                                    <Tr key={warehouse.$id}>
                                        <Td>
                                            <Checkbox colorScheme='teal'></Checkbox>
                                        </Td>
                                        <Td>
                                            <Link to={`/warehouse/${warehouse.$id}`}>
                                                <Box display='flex' gap='1em'>
                                                    {warehouse.name}
                                                </Box>
                                            </Link>
                                        </Td>
                                        <Td>
                                            <Link to={`/warehouse/${warehouse.$id}`}>
                                                {warehouse.short_name}
                                            </Link>
                                        </Td>
                                        <Td>
                                            <Link to={`/warehouse/${warehouse.$id}`}>
                                                {warehouse.description}
                                            </Link>
                                        </Td>
                                        <Td>
                                            <Link to={`/warehouse/${warehouse.$id}`}>
                                                {
                                                    warehouse.active ?
                                                        <Badge p='0px 8px' borderRadius='10px' colorScheme='green'>Activo</Badge>
                                                        :
                                                        <Badge p='0px 8px' borderRadius='10px' colorScheme='red'>Inactivo</Badge>
                                                }
                                            </Link>
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default Warehouse