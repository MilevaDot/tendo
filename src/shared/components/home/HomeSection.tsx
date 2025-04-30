import { Box, Text, VStack } from "@chakra-ui/react"
import WebsiteHome from "../../../shared/components/home/websiteHome"

const HomeSection = () => (
  <Box m="40px 80px" display="flex" gap={8} flexWrap="wrap" justifyContent="space-between">
    <VStack align="flex-start" spacing={6}>
      <WebsiteHome name="Aaron Ilizarbe" role="C.E.O and Founder" src="src/assets/luz_avatar.jpg" align="left" />
    </VStack>
    <VStack align="center" spacing={6} mt={10}>
      <WebsiteHome name="Katia Mamani" role="Office Manager" src="src/assets/luz_avatar.jpg" align="left" />
    </VStack>
    <VStack align="flex-end" spacing={6}>
      <WebsiteHome name="Jhon Alvarez" role="General Manager" src="src/assets/luz_avatar.jpg" align="right" />
    </VStack>
    <Box width="100%" pt={10}>
      <Text maxW="800px" fontSize="lg" lineHeight="1.8" textAlign="justify" color="gray.600">
        Nuestro equipo está conformado por profesionales apasionados por la moda y el cuidado de cada prenda.
        Creemos firmemente que la ropa no solo refleja nuestro estilo, sino que también comunica quiénes somos.
        Por eso, en <strong>Tendo</strong>, nos comprometemos a ofrecer prendas de calidad junto con servicios
        personalizados de sastrería y lavandería, para que cada cliente luzca impecable y se sienta auténticamente
        representado por su vestimenta.
      </Text>
    </Box>
  </Box>
)

export default HomeSection
