import { Avatar,  Box, Heading, HStack, Text} from "@chakra-ui/react"
import type { HomeCardProps } from "../../../declarations/Home"

const WebsiteHome = ({ name, role, src, align = "left" }: HomeCardProps) => {
  const isLeft = align === "left"

  return (
    <HStack
      width="300px"
      height="100px"
      spacing={4}
      p={8}
      bg="var(--background)"
      borderRadius="10px"
      alignItems="center"
      flexDirection={isLeft ? "row" : "row-reverse"}
    >
      <Avatar size="lg" src={src} />
      <Box textAlign={isLeft ? "left" : "right"}>
        <Heading size="md">{name}</Heading>
        <Text fontSize="sm">{role}</Text>
      </Box>

    </HStack>
    
  )
}

export default WebsiteHome