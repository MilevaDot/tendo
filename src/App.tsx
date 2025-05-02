import { ChakraProvider } from "@chakra-ui/react"
import AppRoutes from "./router/AppRoutes"
import './app.css'
import { Toaster } from "sonner"
import { UserProvider } from "./shared/context/UserContext"
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <>
        <ChakraProvider>
          <Analytics />
          <Toaster richColors />
            <UserProvider>
              <AppRoutes />
            </UserProvider>
        </ChakraProvider>
    </>
  )
}

export default App
