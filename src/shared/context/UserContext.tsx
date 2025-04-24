import { createContext, ReactNode, useEffect, useState } from "react"
import { AgendaType } from "../../declarations/Agenda"
import { Models, Query } from "appwrite"
import { account, database } from "../../lib/appwrite"
import { Appwrite } from "../../lib/env"
import { useNavigate } from "react-router-dom"
import { Paths } from "../../router/routes"
import { toast } from "sonner"

type userContext = {
    profile: AgendaType | undefined
    session: Models.User<Models.Preferences> | undefined
    logIn: (email: string, password: string) => void
    logOut: () => void
    getSession: () => void
    getProfile: () => void
}

export const UserContext = createContext<userContext | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState<AgendaType>()
    const [session, setSession] = useState<Models.User<Models.Preferences>>()
    const appwriteSession = localStorage.getItem('appwriteSessionId')
    const navigate = useNavigate()

    const getSession = async () => {
        setSession(await account.get())
    }

    const getProfile = async () => {
        const { documents } =  await database.listDocuments(
            Appwrite.databaseId,
            Appwrite.collections.agenda,
            [
                Query.equal('email', (await account.get()).email)
            ]
        )
        setProfile(documents[0] as AgendaType)
    }

    const loadData = async () => {
        await getSession()
        await getProfile()
    }


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
            navigate(Paths.MainMenu)
        }).catch(() => {
            toast.error('Algo salió mal', {
                description: 'El usuario y/o contraseña no son correctos'
            })
        })
        await loadData()
    }

    useEffect(() => {
        if (appwriteSession) {
            loadData()
        }
    }, [])

    return (
        <UserContext.Provider value={{ profile, session, logIn, logOut, getSession, getProfile }}>
            { children }
        </UserContext.Provider>
    )
}