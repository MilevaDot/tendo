import { useEffect } from "react"
import { account } from "../../lib/appwrite"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../router/routes"
import { toast } from "sonner"
import HelperHelment from "../../helpers/HelperHelmet"

const MagicLogin = () => {

    const urlParams = new URLSearchParams(window.location.search)

    const userId = urlParams.get('userId')
    const secret = urlParams.get('secret')

    const navigate = useNavigate()

    const createMagicSession = async () => {
        await account.createSession(userId!, secret!).then((session) =>{
            localStorage.setItem('appwriteSessionId', session.$id)
            toast.success('Iniciaste sesión')
            navigate(Paths.Website)
        }).catch(() => {
            toast.error('Algo salió mal', {
                description: 'No se pudo iniciar sesión'
            })
        })
    }

    useEffect(() => {
        createMagicSession()
    }, [])

    return (
        <>
            <HelperHelment title='Tendo | Iniciar sesión' />
        </>
    )
}

export default MagicLogin