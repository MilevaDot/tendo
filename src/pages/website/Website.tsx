import { Box, Center, Heading, HStack, Text} from "@chakra-ui/react"
import HelperHelment from "../../helpers/HelperHelmet"
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa"
import HomeSection from "../../shared/components/home/HomeSection"

const Website = () => {
    return (
        <>
            <HelperHelment title='Tendo | Home' />
            <Box h='100vh' position='relative' overflow='hidden' width='100%'>
                <video autoPlay loop muted playsInline
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
                    <source src='./src/assets/topvideo.mp4' type='video/mp4' />
                </video>
                <Box w='100%' h='100%' display='flex' position='absolute' justifyContent='center'>
                    <Center>
                        <Heading color='white' as='h2' size='3xl'>
                            Vestir <span style={{color:'teal'}}>bien</span> es <span style={{color:'teal'}}>pasarla</span> bien
                        </Heading>
                    </Center>
                </Box>
            </Box>

            <HomeSection/>

            <Box bg="var(--background)" p="40px 80px">
                <Heading size="lg" mb={4}> Donde la confección se encuentra con la perfección</Heading>
                <Heading size="2xl" color="var(--button)"> Estilo a tu medida, cuidado en cada detalle </Heading>
            </Box>

            <Box p="40px 80px">
                <Box display="flex" justifyContent="space-between" alignItems="center">
                <Text w="300px">
                    Mantente informado/a sobre nosotros. Sé parte de nuestra familia
                    siguiendo nuestras redes sociales.
                </Text>
                    <Text fontSize="2xl" fontWeight="bold">
                        Somos Tendo
                    </Text>
                </Box>

                <HStack spacing={6} mt={8} justifyContent="center" fontSize="2xl" color="gray.600" >
                    <FaFacebook />
                    <FaInstagram />
                    <FaTwitter />
                    <FaTiktok />
                </HStack>
            </Box>
        </>
    )
}

export default Website