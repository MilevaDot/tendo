import { Heading, HStack, VStack, Text, Image, Box } from "@chakra-ui/react"
import HelperHelment from "../../helpers/HelperHelmet"
import item1 from "../../assets/Nosotros_Item1.png"
import item2 from "../../assets/Nosotros_Item2.png"
import item3 from "../../assets/Nosotros_Item3.png"
import fondo from "../../assets/FondoUs.png"
import item4 from "../../assets/CarrouselItem4.jpg"
import { useEffect } from "react"
import Aos from 'aos'
import 'aos/dist/aos.css'


const WebsiteUs = () => {
    useEffect(()=>{
        Aos.init({
            once: true
        })
    },[])
    return (
        <>
            <HelperHelment title='Tendo | Nosotros' />
        <Box bgImage={fondo} bgSize='cover' bgRepeat='repeat' w='100%' minH='100vh' position='absolute'>
            <VStack mt='100px' mb="100px" h='100%' w='100%' p='0 100px' gap='5em'>
                <HStack data-aos="fade-right" data-aos-duration='2000' justifyContent='space-between' w='100%'>
                    <VStack justifyContent='left' alignItems='start' w='1000px'>
                    <Heading color='teal'>Quienes somos?</Heading>
                    <Text>En Tendo, somos una marca peruana apasionada por la moda y comprometida con ofrecerte lo mejor en estilo, comodidad y calidad. Nacimos con el propósito de brindarte una experiencia de compra única, combinando las últimas tendencias con prendas accesibles y pensadas para realzar tu personalidad.
                    Cada colección que diseñamos está inspirada en el ritmo de vida del Perú moderno: dinámico, diverso y lleno de color. Nos enfocamos en ofrecer ropa para cada ocasión, desde lo casual hasta lo elegante, apostando por materiales de calidad y un proceso de venta 100% confiable y seguro.</Text>
                    </VStack>
                    <Image src={item1}/>
                </HStack>
                <HStack data-aos="fade-left" data-aos-duration='2000' justifyContent='space-between' w='100%'>
                    <Image src={item3}/>
                    <VStack justifyContent='right' alignItems='start' w='1000px'>
                    <Heading color='teal'>Nuestra vision:</Heading>
                    <Text>Ser una marca líder en el mercado peruano de moda, reconocida por ofrecer prendas de calidad, con estilo y al alcance de todos, impulsando la identidad y confianza de nuestros clientes a través de una experiencia de compra innovadora y cercana. Aspiramos a expandirnos a nivel nacional y convertirnos en una referencia de moda accesible y auténtica para todos los peruanos.</Text>
                    </VStack>
                </HStack>
                <HStack data-aos="fade-right" data-aos-duration='2000' justifyContent='space-between' w='100%'>
                    <VStack justifyContent='left' alignItems='start' w='1000px'>
                    <Heading color='teal'>Nuestra mision:</Heading>
                    <Text>Brindar a nuestros clientes ropa moderna, cómoda y de calidad, que se adapte a su estilo de vida y resalte su identidad. Nos esforzamos por ofrecer una experiencia de compra fácil, segura y satisfactoria, apostando por la innovación constante, la atención personalizada y el compromiso con el desarrollo de la moda peruana.</Text>
                    </VStack>
                    <Image src={item2}/>
                </HStack>
                <HStack data-aos="zoom-in-down" data-aos-duration='2000'>
                    <Heading color='teal' fontSize='60px'>"Tu look, tu actitud, tu tienda."</Heading>
                </HStack>

                
            </VStack>
                <Image src={ item4 } h='650px' w='100%' />
        </Box>
        </>
    )
}

export default WebsiteUs