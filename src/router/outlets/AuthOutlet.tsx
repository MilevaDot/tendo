import { Navigate, Outlet } from "react-router-dom"
import { Paths } from "../routes"

const AuthOutlet = () => {
    const session = localStorage.getItem('appwriteSessionId')
    return (
        session ? <Navigate to={Paths.Website} /> : <Outlet />
    )
}

export default AuthOutlet