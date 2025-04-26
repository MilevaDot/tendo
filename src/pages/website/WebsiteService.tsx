import { Box } from "@chakra-ui/react"
import HelperHelment from "../../helpers/HelperHelmet"
import { GiSewingMachine } from "react-icons/gi"
import { FaTshirt } from 'react-icons/fa'
import ServiceCard from "../../shared/components/collage/ServiceCard"
import ImageGrid from "../../shared/components/collage/ImageGrid"

const WebsiteService = () => {
    const sastreriaImages=[
        { src: "https://i0.wp.com/gentleman.com.mx/wp-content/uploads/2022/03/port.MG-photo-7.jpg?w=980&ssl=1", alt: "Sastrería 1", height: "300px" },
        { src: "https://deposeguro.com/wp-content/uploads/2024/04/maquinas-para-taller-de-costura.jpg", alt: "Sastrería 2", height: "147px" },
        { src: "https://muchosnegociosrentables.com/wp-content/uploads/2023/06/como-montar-un-taller-de-costura-paso-a-paso.jpg", alt: "Sastrería 3", height: "147px", marginTop: 2 },
        { src: "https://deposeguro.com/wp-content/uploads/2024/04/taller-de-costura-1.jpg", alt: "Sastrería 4", height: "300px" },
    ]

    const lavanderiaImages =[...sastreriaImages]
    return (
        <>
            <HelperHelment title='Tendo | Servicios' />
            <br />

            <Box mt="80px" maxW="1200px"  px={{ base: "1rem", md: "2rem" }}>
                {/* Sastrería */}
                <ServiceCard
                    title="Servicio de Sastrería"
                    icon={<GiSewingMachine size={50} />}
                    description="Arreglos personalizados, confección a medida y asesoría en estilo para todo tipo de prendas.
                    l  Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, expedita!"
                    tooltip="Haz clic para saber más sobre nuestro servicio de sastrería"
                    images={<ImageGrid imageList={sastreriaImages} />}
                />

                <ServiceCard
                    title="Servicio de Lavandería"
                    icon={<FaTshirt size={50} />}
                    description="Limpieza profesional para tus prendas delicadas, con opciones ecológicas y entrega a domicilio.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, expedita!"
                    tooltip="Haz clic para ver más sobre nuestro servicio de lavandería"
                    images={<ImageGrid imageList={lavanderiaImages} />}
                />
            </Box>
            
        </>
    )
}

export default WebsiteService