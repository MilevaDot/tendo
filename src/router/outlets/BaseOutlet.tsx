import { Navigate, Outlet } from "react-router-dom"
import BaseLayout from "../../shared/layouts/BaseLayout"
import { Paths } from "../routes"
import { useProfileStore } from "../../shared/store/useProfileStore"

const BaseOutlet = () => {
    const { profile } = useProfileStore()
    return (                
            profile?.type == 'Interno'
                ?
                <BaseLayout>
                    <Outlet />       
                </BaseLayout>
                :
                <Navigate to={Paths.Website} />
    )
}

export default BaseOutlet