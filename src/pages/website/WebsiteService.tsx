import { Box, Button, Stack } from "@chakra-ui/react"
import HelperHelment from "../../helpers/HelperHelmet"
import { GiSewingMachine } from "react-icons/gi"
import { FaTshirt, FaCheckCircle, FaRulerCombined, FaUserTie, FaSoap, FaTruck, FaLeaf } from 'react-icons/fa'
import ServiceCard from "../../shared/components/collage/ServiceCard"
import ImageGrid from "../../shared/components/collage/ImageGrid"

const WebsiteService = () => {
    const sastreriaImages=[
        { src: "https://i0.wp.com/gentleman.com.mx/wp-content/uploads/2022/03/port.MG-photo-7.jpg?w=980&ssl=1", alt: "Sastrería 1", height: "450px" },
        { src: "https://deposeguro.com/wp-content/uploads/2024/04/maquinas-para-taller-de-costura.jpg", alt: "Sastrería 2", height: "194px" },
        { src: "https://highlandercleaners.com/wp-content/uploads/2023/03/AdobeStock_217594882-980x654.jpeg", alt: "Sastrería 3", height: "240px", marginTop: 2 },
        { src: "https://deposeguro.com/wp-content/uploads/2024/04/taller-de-costura-1.jpg", alt: "Sastrería 4", height: "450px" },
    ]

    const lavanderiaImages =[
        {src: "https://bestcleanersny.com/wp-content/uploads/2020/07/services-dry-cleaning-2-1024x1024.jpg" , alt: "Lavandería 1", height: "450px" },
        {src: "https://highlandercleaners.com/wp-content/uploads/2024/09/AdobeStock_396252752-980x368.jpeg" , alt: "Lavandería 2", height: "217px" },
        {src: "https://highlandercleaners.com/wp-content/uploads/2023/12/AdobeStock_96661527-1080x675.jpeg" , alt: "Lavandería 3", height: "217px", marginTop: 2 },
        {src: "https://highlandercleaners.com/wp-content/uploads/2018/01/picking-up-dry-cleaning-768x512.jpg" , alt: "Lavandería 4", height: "450px" },
    ]

    return (
        <>
            <HelperHelment title='Tendo | Servicios' />
            <br />

            <Box mt="100px" mb="50px"  padding="15px" px={{ base: "1rem", md: "10rem" }} >
                <Stack spacing={20}>
                <ServiceCard
                    title="Servicio de Sastrería Personalizada"
                    icon={<GiSewingMachine size={50} />}
                    description="Transformamos tus prendas con ajustes a medida, confección exclusiva y asesoría en estilo para que siempre vistas con elegancia y confianza."
                    tooltip="Haz clic para saber más sobre nuestro servicio de sastrería"
                    slogan="Vístete de ti."
                    images={<ImageGrid imageList={sastreriaImages} />}
                    benefits={[
                        { icon: FaRulerCombined, text: "Ajustes personalizados para realzar tu figura" },
                        { icon: FaCheckCircle, text: "Confección exclusiva que refleja tu personalidad" },
                        { icon: FaUserTie, text: "Asesoría en estilo para que cada detalle hable por ti" },
                    ]}
                    cita={
                        <Button
                            colorScheme="teal"
                            size="md"
                            onClick={() => window.open("https://wa.me/+51973280498", "_blank")}
                        >
                            Agenda tu cita
                        </Button>
                    }
                />

                <ServiceCard 
                    title="Servicio de Lavandería"
                    icon={<FaTshirt size={50} />}
                    description="Limpieza profesional para tus prendas delicadas, con opciones ecológicas y entrega a domicilio."
                    tooltip="Haz clic para ver más sobre nuestro servicio de lavandería"
                    slogan="Tu ropa limpia, tu vida más ligera."
                    images={<ImageGrid imageList={lavanderiaImages} />}
                    benefits={[
                        { icon: FaSoap, text: "Lavado delicado para ropa fina y casual" },
                        { icon: FaLeaf, text: "Opciones ecológicas, sin químicos agresivos" },
                        { icon: FaTruck, text: "Entrega y recogida a domicilio" },
                        { icon: FaTshirt, text: "Planchado impecable listo para colgar" },
                    ]}
                    cita={
                        <Button
                            colorScheme="teal"
                            size="md"
                            onClick={() => window.open("https://wa.me/+51963246850", "_blank")}
                        >
                            Agenda tu cita
                        </Button>
                    }
                />
                </Stack>
            </Box>      
        </>
    )
}

export default WebsiteService