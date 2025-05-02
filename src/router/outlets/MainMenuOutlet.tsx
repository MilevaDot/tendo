import { Navigate, Outlet } from "react-router-dom"
import { Paths } from "../routes"

import { useProfileStore } from "../../shared/store/useProfileStore"

const MainMenuOutlet = () => {
    const { profile } = useProfileStore()
    return (
        profile?.type == 'Interno'
            ?
            <Outlet />
            :
            <Navigate to={Paths.Website} />
    )
}

export default MainMenuOutlet