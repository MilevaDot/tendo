import { Box, Button, Center, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react"
import { FaUser } from "react-icons/fa"
import { account, database, ID } from "../../lib/appwrite"
import { Appwrite } from "../../lib/env"
import { Query } from "appwrite"
import { toast } from "sonner"
import { Link } from "react-router-dom"
import { Paths } from "../../router/routes"
import HelperHelment from "@helpers/HelperHelmet"

const ForgottenPassword = () => {
    const sendMagicLink = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget

        const data = new FormData(form)
        const { email } = Object.fromEntries(data.entries()) as {
            [k: string]: string
        }
        const emailsResponse = await database.listDocuments(
            Appwrite.databaseId,
            Appwrite.collections.agenda,
            [
                Query.equal('email', email)
            ]
        )

        if ( emailsResponse.documents.length != 0 ) {
            await account.createMagicURLToken(ID.unique(), email, 'http://localhost:5173/magiclogin')
        }
        else {
            toast.error('Algo salió mal', {
                description: 'El correo que ingresaste no está registrado'
            })
        }
    }

    return (
        <>
            <HelperHelment title='Tendo | Olvidé mi contraseña' />
        
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
                    onSubmit={sendMagicLink}
                    >
                    <Heading
                        size='md'
                        textAlign='center'
                        >
                        Olvidé mi contraseña
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
                    <Text
                        fontSize='0.7em'
                        >
                        Ingresa tu email y te enviaremos un correo
                    </Text>
                    <Button
                        type='submit'
                        colorScheme='teal'
                        >
                        Enviar
                    </Button>
                    <Link to={Paths.Login}>
                        <Text
                            fontSize='0.7em'
                            textAlign='end'
                            >
                            Volver
                        </Text>
                    </Link>
                </Box>
            </Center>
        </>
    )
}

export default ForgottenPassword