import { Skeleton, Td, Tr } from "@chakra-ui/react"

const SkeletonLoader = () => {
    return (
        <Tr>
            <Td>
                <Skeleton height='20px'/>
            </Td>
            <Td>
                <Skeleton height='20px'/>
            </Td>
            <Td>
                <Skeleton height='20px'/>
            </Td>
            <Td>
                <Skeleton height='20px'/>
            </Td>
            <Td>
                <Skeleton height='20px'/>
            </Td>
        </Tr>
    )
}

export default SkeletonLoader