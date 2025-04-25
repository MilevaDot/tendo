import { Navigate, Outlet } from "react-router-dom"
import { Paths } from "../routes"
import { useContext } from "react"
import { UserContext } from "../../shared/context/UserContext"

const MainMenuOutlet = () => {
    const context = useContext(UserContext)
    return (
        context?.profile?.type == 'Interno'
            ?
            <Outlet />
            :
            <Navigate to={Paths.Website} />
    )
}

export default MainMenuOutlet