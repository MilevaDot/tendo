import { ChakraProvider } from "@chakra-ui/react"
import AppRoutes from "./router/AppRoutes"
import './app.css'
import { Toaster } from "sonner"
import { UserProvider } from "./shared/context/UserContext"

const App = () => {
  return (
    <>
        <ChakraProvider>
          <Toaster richColors />
            <UserProvider>
              <AppRoutes />
            </UserProvider>
        </ChakraProvider>
    </>
  )
}

export default App
