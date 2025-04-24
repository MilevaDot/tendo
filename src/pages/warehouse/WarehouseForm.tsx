import React, { useEffect, useRef, useState } from "react"
import { WarehouseType } from "../../declarations/Warehouse"
import { database } from "../../lib/appwrite"
import { Appwrite } from "../../lib/env"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Checkbox, FormControl, FormLabel, HStack, Input } from "@chakra-ui/react"
import { ChevronRightIcon, DeleteIcon } from "@chakra-ui/icons"
import { toast } from "sonner"
import HelperHelment from "../../helpers/HelperHelmet"
import './warehouseform.css'
import { Paths } from "../../router/routes"

const WarehouseForm = () => {
    const [warehouse, setWarehouse] = useState<WarehouseType>()
    const [edit, setEdit] = useState<boolean>(false)
    const [invisible, setInvisible] = useState<boolean>(true)
    const formRef = useRef<HTMLFormElement>(null)
    const [isChecked, setIsChecked] = useState<boolean>()

    const { id } = useParams()
    const navigate = useNavigate()

    const getWarehouse = async () => {
        const response = await database.getDocument(Appwrite.databaseId, Appwrite.collections.warehouses, id!)
        setWarehouse(response as WarehouseType)
        setIsChecked((response as WarehouseType ).active)
    }

    const deleteWarehouse = async (warehouseId: string) => {
        await database.deleteDocument(Appwrite.databaseId, Appwrite.collections.warehouses, warehouseId).then(() => {
            navigate('/warehouse')
            toast.warning('Almacén eliminado')
        }).catch(() => {
            toast.error('Algo salió mal', {
                description: 'No se pudo eliminar el almacén'
            })
        })
    }

    const editWarehouse = () => {
        setEdit(true)
        setInvisible(false)
    }

    const saveWarehouse = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setEdit(false)
        setInvisible(true)

        const form = e.currentTarget
        const data = new FormData(form)
        const formFields= Object.fromEntries(data.entries())

        await database.updateDocument(Appwrite.databaseId, Appwrite.collections.warehouses, warehouse!.$id, {
            name: formFields.name,
            short_name: formFields.short_name,
            description: formFields.description,
            active: formFields.active ? true : false
        }).then(() => {
            toast.success('Almacén editado')
        }).catch(() => {
            toast.error('Algo salió mal', {
                description: 'No se pudo editar el almacén'
            })
        })
    }

    useEffect(() => {
        getWarehouse()
    }, [])


    return (
        <>
            <HelperHelment title={`Tendo | ${warehouse?.name}`} />

            <Breadcrumb p='20px 20px 20px 20px' separator={<ChevronRightIcon />}>
                <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to={Paths.Warehouse}>Almacenes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color='teal'>{warehouse?.name}</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <HStack p='0px 20px' justifyContent='space-between'>
                <Box display='flex' gap='1em'>
                    <Button size='sm' colorScheme='teal' onClick={editWarehouse} className={invisible ? '' : 'inactive'} >Editar</Button>
                    <Button size='sm' colorScheme='teal' onClick={() => formRef.current?.requestSubmit()} className={invisible ? 'inactive' : ''}>Guardar</Button>
                    <Link to={ '/warehouse' }>
                        <Button size='sm' colorScheme='gray'>Cancelar</Button>
                    </Link>
                </Box>
                <Box>
                    <Button
                        size='sm'
                        colorScheme='red'
                        leftIcon={<DeleteIcon />}
                        onClick={() => warehouse && deleteWarehouse(warehouse?.$id)}
                        >
                        Eliminar
                    </Button>
                </Box>
            </HStack>
            <Box
                m='20px'
                p='0px 50px'
                borderRadius='10px'
                backgroundColor='var(--gray)'
                border='2px solid var(--gray-border)'
                >
                <Box as='form' p='20px' onSubmit={saveWarehouse} ref={formRef}>
                    <HStack gap='10em'>
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input type='text' name='name' disabled={edit ? false : true} defaultValue={warehouse?.name} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Nombre corto</FormLabel>
                            <Input type='text' name='short_name' disabled={edit ? false : true} defaultValue={warehouse?.short_name} />
                        </FormControl>
                    </HStack>
                    <HStack gap='10em'>
                        <FormControl>
                            <FormLabel>Descripción</FormLabel>
                            <Input type='text' name='description' disabled={edit ? false : true} defaultValue={warehouse?.description} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Activo</FormLabel>
                            <Checkbox
                                disabled={edit ? false : true}
                                name='active'
                                isChecked={isChecked}
                                colorScheme='teal'
                                onChange={() => setIsChecked((prev) => !prev)}
                                >
                            </Checkbox>
                        </FormControl>
                    </HStack>
                </Box>
            </Box>
        </>
    )
}

export default WarehouseForm