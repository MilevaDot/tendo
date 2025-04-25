import { Box, Center, Heading } from "@chakra-ui/react"
import HelperHelment from "../../helpers/HelperHelmet"

const Website = () => {
    return (
        <>
            <HelperHelment title='Tendo | Home' />
            <Box h='100vh' position='relative' overflow='hidden' width='100%'>
                <video autoPlay loop muted playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}>
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

            <Box margin='20px'>
                <Heading>Somos lo que necesitas, tenemos lo que deseas</Heading>
            </Box>
            <Box margin='20px'>
                <Heading>Somos lo que necesitas, tenemos lo que deseas</Heading>
            </Box>
            <Box margin='20px'>
                <Heading>Somos lo que necesitas, tenemos lo que deseas</Heading>
            </Box>
            <Box margin='20px'>
                <Heading>Somos lo que necesitas, tenemos lo que deseas</Heading>
            </Box>
            <Box margin='20px'>
                <Heading>Somos lo que necesitas, tenemos lo que deseas</Heading>
            </Box>
            <Box margin='20px'>
                <Heading>Somos lo que necesitas, tenemos lo que deseas</Heading>
            </Box>
            <Box margin='20px'>
                <Heading>Somos lo que necesitas, tenemos lo que deseas</Heading>
            </Box>
            <Box margin='20px'>
                <Heading>Somos lo que necesitas, tenemos lo que deseas</Heading>
            </Box>
        </>
    )
}

export default Website
