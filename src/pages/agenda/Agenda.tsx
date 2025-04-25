import { ChevronRightIcon, Search2Icon } from "@chakra-ui/icons"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Checkbox, HStack, Input, InputGroup, InputLeftElement, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { Link } from "react-router-dom"
// import FilterButton from "../../shared/components/filter/FilterButton"
import { useEffect, useState } from "react"
import { AgendaType } from "../../declarations/Agenda"
import { database } from "../../lib/appwrite"
import { Appwrite } from "../../lib/env"
import { Query } from "appwrite"
import { Paths } from "../../router/routes"
import HelperHelment from "../../helpers/HelperHelmet"
import HelperSkeleton from "../../helpers/HelperSkeleton"

const Agenda = () => {
    const [agendas, setAgendas] = useState<Array<AgendaType>>()
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const getAgendas = async () => {
        setLoading(true)
        const response = await database.listDocuments(
            Appwrite.databaseId,
            Appwrite.collections.agenda
        )
        setAgendas(response.documents as Array<AgendaType>)
        setLoading(false)
    }

    const searchAgenda = async () => {
        setLoading(true)
        const response = await database.listDocuments(
            Appwrite.databaseId,
            Appwrite.collections.agenda,
            [
                Query.or([
                    Query.contains('name', search),
                    Query.contains('email', search),
                ])
            ]
        )
        setAgendas(response.documents as Array<AgendaType>)
        setLoading(false)
    }

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ( e.key == 'Enter' ) {
            searchAgenda()
        }
    }

    useEffect(() => {
        getAgendas()
    }, [])

    return (
        <>
            <HelperHelment title='Tendo | Agenda' />

            <Breadcrumb p='20px 20px 20px 20px' separator={<ChevronRightIcon />}>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color='teal'>Agenda</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <HStack p='0px 20px' justifyContent='space-between'>
                <Box>
                    <Link to={ Paths.AgendaCreate }>
                        <Button size='sm' colorScheme='teal'>Crear</Button>
                    </Link>
                </Box>
                <Box display='flex' gap='1em' alignItems='center'>
                    {/* <FilterButton
                        field1='Activo'
                        filterField1={searchActive}
                        field2='Inactivo'
                        filterField2={searchInactive}
                        cleanFilters={getWarehouses}
                        /> */}
                    <InputGroup>
                        <InputLeftElement>
                            <Search2Icon color='teal' />
                        </InputLeftElement>
                        <Input
                            type='tel'
                            placeholder='Buscar contacto'
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
                                <Th paddingY='0.8em'>Email</Th>
                                <Th paddingY='0.8em'>Phone</Th>
                                <Th paddingY='0.8em'>DNI</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                loading ?
                                    <>
                                        <HelperSkeleton column={5} />
                                    </>
                                :
                                agendas?.map(agenda => (
                                    <Tr key={agenda.$id}>
                                        <Td>
                                            <Checkbox colorScheme='teal'></Checkbox>
                                        </Td>
                                        <Td>
                                            <Link to={`/agenda/${agenda.$id}`}>
                                                <Box display='flex' gap='1em'>
                                                    {agenda.name}
                                                </Box>
                                            </Link>
                                        </Td>
                                        <Td>
                                            <Link to={`/agenda/${agenda.$id}`}>
                                                {agenda.email}
                                            </Link>
                                        </Td>
                                        <Td>
                                            <Link to={`/agenda/${agenda.$id}`}>
                                                {agenda.phone}
                                            </Link>
                                        </Td>
                                        <Td>
                                            <Link to={`/agenda/${agenda.$id}`}>
                                                {agenda.dni}
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

export default Agenda