import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react"
import { FaLock, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { Paths } from "../../router/routes"
import { useContext } from "react"
import HelperHelment from "@helpers/HelperHelmet"
import { UserContext } from "@context/UserContext"


const Login = () => {
    const context = useContext(UserContext)

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget

        if ( form ) {
            const data = new FormData(form)
            const { email, password } = Object.fromEntries(data.entries()) as {
                [k: string]: string
            }

            context?.logIn(email, password)
        }
    }

    return (
        <>
            <HelperHelment title='Tendo | Iniciar sesión' />
        
            <Center
                h='100vh'
                >
                <Box
                    as='form'
                    w='300px'
                    display='flex'
                    flexDirection='column'
                    gap='1em'
                    padding='1em'
                    onSubmit={signIn}
                    >
                    <Heading
                        size='md'
                        textAlign='center'
                        >
                        Iniciar Sesión
                    </Heading>
                    <FormControl
                        borderBottom='1px solid black'
                        display='flex'
                        alignItems='center'
                        >
                        <FormLabel>
                            <FaUser />
                        </FormLabel>
                        <Input
                            required
                            border='none'
                            outline='none'
                            focusBorderColor='transparent'
                            type='text'
                            name='email'
                            placeholder='ejemplo@tendo.com'
                            />
                    </FormControl>
                    <FormControl
                        borderBottom='1px solid black'
                        display='flex'
                        alignItems='center'
                        >
                        <FormLabel>
                            <FaLock />
                        </FormLabel>
                        <Input
                            required
                            border='none'
                            outline='none'
                            focusBorderColor='transparent'
                            type='password'
                            name='password'
                            placeholder='Contraseña'
                            />
                    </FormControl>
                    <Box display='flex' justifyContent='end'>
                        <Link to='/signup'>
                            <Text
                                fontSize='0.7em'
                                >
                                Eres nuevo? Regístrate
                            </Text>
                        </Link>
                    </Box>
                    <Button
                        type='submit'
                        colorScheme='teal'
                        >
                        Ingresar
                    </Button>
                    <Link to={Paths.ForgottenPassword}>
                        <Text
                            fontSize='0.7em'>
                            Olvidé mi contraseña
                        </Text>
                    </Link>
                </Box>
            </Center>
        </>
    )
}

export default Login