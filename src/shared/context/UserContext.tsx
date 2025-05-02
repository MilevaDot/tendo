import { createContext, ReactNode } from "react"
import { account } from "../../lib/appwrite"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../router/routes"
import { toast } from "sonner"

type userContext = {
    logIn: (email: string, password: string) => void
    logOut: () => void
}

export const UserContext = createContext<userContext | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const appwriteSession = localStorage.getItem('appwriteSessionId')
    const navigate = useNavigate()

    const logOut = async () => {
        await account.deleteSession(appwriteSession!).then(() => {
            localStorage.removeItem('appwriteSessionId')
            navigate(Paths.Login)
            toast.success('Cerraste sesión')
        }).catch(() => {
            toast.error('Algo salió mal', {
                description: 'No se pudo cerrar sesión'
            })
        })
    }

    const logIn = async (email: string, password: string) => {
        account.createEmailPasswordSession(email, password).then((response) => {
            localStorage.setItem('appwriteSessionId', response.$id)
            toast.success('Sesión iniciada')
            navigate(Paths.Website)
        }).catch(() => {
            toast.error('Algo salió mal', {
                description: 'El usuario y/o contraseña no son correctos'
            })
        })
    }

    return (
        <UserContext.Provider value={{ logIn, logOut }}>
            { children }
        </UserContext.Provider>
    )
}