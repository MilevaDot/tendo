import { Box, Heading, Text, Tooltip, Stack, Icon } from "@chakra-ui/react"
import { ServiceCardProps } from "../../../declarations/WebsiteService"

const ServiceCard = ({ title, icon, description, images, tooltip, benefits, slogan, cita }: ServiceCardProps) => {
    
    return (
        <Tooltip label={tooltip} aria-label={title}>
            <Box bg="#f4f4f4" p="2rem" borderRadius="10px" boxShadow="lg"
                // _hover={{boxShadow: 'xl', transform: 'scale(1.05)', transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                // }}
                mb="2rem" display="flex" flexDirection="column" alignItems="center" 
                transition="transform 0.3s ease, box-shadow 0.3s ease" padding={5} gap={3}
            >
                <Heading  size="xl" mb={4} color="teal.600" display="flex" alignItems="center" gap={3}>
                    {icon} {title}
                </Heading>
                <Text fontSize="xl" mb={3} color="gray.600" fontStyle="italic">
                    {description}
                </Text>
                {slogan && (
                    <Text fontSize="2xl" fontWeight="bold" color="teal.600" textAlign="center">
                        {slogan}
                    </Text>
                )}
                {images}
                {benefits && (
                    <Stack direction={{ base: "column", md: "row" }} spacing={6} align="center" mt={4}>
                        {benefits.map((benefit, i) => (
                            <Box key={i} textAlign="center" maxW="200px">
                                <Icon as={benefit.icon} boxSize={8} color="teal.500" mb={2} />
                                <Text fontWeight="medium" color="gray.800">{benefit.text}</Text>
                            </Box>
                        ))}
                    </Stack>
                )}
                {cita && (
                    <Box mt={7}>
                        {cita}
                    </Box>
                )}
            </Box>
        </Tooltip>
    )
}

export default ServiceCard