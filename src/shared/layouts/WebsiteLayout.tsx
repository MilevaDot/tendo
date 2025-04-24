import { ReactElement } from "react"
import NavbarWebsite from "../components/navbar/NavbarWebsite"

const WebsiteLayout = ({children} : {
    children: ReactElement
}) => {
    return (
        <>
            <NavbarWebsite />
            { children }
        </>
    )
}

export default WebsiteLayout