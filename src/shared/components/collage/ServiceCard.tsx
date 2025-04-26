import { Box, Heading, Text, Tooltip } from "@chakra-ui/react"
import { ServiceCardProps } from "../../../declarations/WebsiteService"

const ServiceCard = ({ title, icon, description, images, tooltip }: ServiceCardProps) => {
    return (
        <Tooltip label={tooltip} aria-label={title}>
            <Box
                bg="#f4f4f4"
                p="2rem"
                borderRadius="10px"
                boxShadow="lg"
                _hover={{
                    boxShadow: 'xl',
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                mb="2rem"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                // textAlign="center"
                transition="transform 0.3s ease, box-shadow 0.3s ease"
                height="auto"
                width="auto"
                padding={5}
                gap={5}
            >
                <Heading size="lg" fontWeight="600" color="#2D3748" mb="1rem" display="flex" alignItems="center" gap="10px">
                    {icon} {title}
                </Heading>
                <Text fontSize="lg" color="gray.700">
                    {description}
                </Text>
                {images}
            </Box>
        </Tooltip>
    )
}

export default ServiceCard