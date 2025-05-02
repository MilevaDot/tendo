import { Navigate, Outlet } from "react-router-dom"
import BaseLayout from "../../shared/layouts/BaseLayout"
import { Paths } from "../routes"
import { useContext } from "react"
import { UserContext } from "@context/UserContext"

const BaseOutlet = () => {
    const context = useContext(UserContext)
    console.log(context)
    return (                
            context?.profile?.type == 'Interno'
                ?
                <BaseLayout>
                    <Outlet />       
                </BaseLayout>
                :
                <Navigate to={Paths.Website} />
    )
}

export default BaseOutlet