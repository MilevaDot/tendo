import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react"
import { FaLock, FaUser } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { account, database, ID } from "../../lib/appwrite"
import { EmailIcon } from "@chakra-ui/icons"
import { toast } from "sonner"
import { Paths } from "../../router/routes"
import { Appwrite } from "../../lib/env"
import { LuIdCard } from "react-icons/lu"
import HelperHelment from "../../helpers/HelperHelmet"

const SignUp = () => {
    const navigate = useNavigate()
    const createAccount = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        if ( form ) {
            const data = new FormData(form)
            const { email, password, username, dni } = Object.fromEntries(data.entries()) as {
                [k: string]: string
            }
            await account.create(ID.unique(), email, password, username).then(async () => {
                await database.createDocument(Appwrite.databaseId, Appwrite.collections.agenda, ID.unique(), {
                    name: username,
                    email: email,
                    dni: dni
                }).then(() =>{
                    navigate(Paths.Login)
                    toast.success('Cuenta creada satisfactoriamente')
                })
            }).catch(() => {
                toast.error('Algo salió mal', {
                    description: 'No se pudo crear la cuenta'
                })
            })
        }
    }
    return (
        <>
            <HelperHelment title='Tendo | Registrarse' />

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
                    onSubmit={createAccount}
                    >
                    <Heading
                        size='md'
                        textAlign='center'
                        >
                        Crear cuenta
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
                            name='username'
                            placeholder='Nombre completo'
                            />
                    </FormControl>
                    <FormControl
                        borderBottom='1px solid black'
                        display='flex'
                        alignItems='center'
                        >
                        <FormLabel>
                            <LuIdCard />
                            {/* <FaUser /> */}
                        </FormLabel>
                        <Input
                            required
                            border='none'
                            outline='none'
                            focusBorderColor='transparent'
                            type='text'
                            name='dni'
                            placeholder='DNI'
                            />
                    </FormControl>
                    <FormControl
                        borderBottom='1px solid black'
                        display='flex'
                        alignItems='center'
                        >
                        <FormLabel>
                            <EmailIcon />
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
                        <Link to='/login'>
                            <Text
                                fontSize='0.7em'
                                >
                                Ya tengo una cuenta
                            </Text>
                        </Link>
                    </Box>
                    <Button
                        type='submit'
                        colorScheme='teal'
                        >
                        Registrarme
                    </Button>
                </Box>
            </Center>
        </>
    )
}

export default SignUp