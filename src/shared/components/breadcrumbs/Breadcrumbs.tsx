import { ChevronRightIcon } from "@chakra-ui/icons"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { ReactElement } from "react"

const Breadcrumbs = ({ title, children }: {
    title: string
    children: ReactElement
}) => {
    return (
        <>
            <Breadcrumb p='20px 20px 20px 20px' separator={<ChevronRightIcon />}>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink color='teal'>{title}</BreadcrumbLink>
                </BreadcrumbItem>
                {children}
            </Breadcrumb>
        </>
    )
}

export default Breadcrumbs