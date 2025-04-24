import { IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react"
import { FiFilter } from "react-icons/fi"

const FilterButton = ({
    field1,
    filterField1,
    field2,
    filterField2,
    cleanFilters
}: {
    field1: string
    filterField1: () => void
    field2: string
    filterField2: () => void
    cleanFilters: () => void
}) => {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                icon={<FiFilter color='teal' />}  />
            <MenuList>
                <MenuItem onClick={filterField1}>{field1}</MenuItem>
                <MenuItem onClick={filterField2}>{field2}</MenuItem>
                <MenuDivider />
                <MenuItem fontSize='10px' onClick={cleanFilters}>Limpiar filtros</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default FilterButton