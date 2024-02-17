import { Box, Heading, Text } from "@chakra-ui/react"
import { FC } from "react"

type WelcomeProps = {
    userName: string
}

export const Welcome: FC<WelcomeProps> = ({ userName }) => (
    <Box pb={20}>
        <Box mt="40px" mb="60px">
            <Heading fontSize="7xl" lineHeight="1.1" color="gray.50">
                Food For
                <br />
            </Heading>
            <Heading fontSize="7xl" color="gray.50">
                Everyone!
            </Heading>
        </Box>

        <Box mt="20px">
            <Text fontSize="3xl" lineHeight="0.8" color="gray.50">
                Welcome
                <br />
            </Text>
            <Text fontSize="6xl" color="gray.75">
                {userName}
            </Text>
        </Box>
    </Box>
)