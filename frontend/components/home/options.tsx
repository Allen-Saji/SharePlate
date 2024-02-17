import { Card, CardBody, HStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

type OptionsProps = {
    userType: 'supplier' | 'charity'
}

export const Options: FC<OptionsProps> = ({ userType }) => (
    <>
        <Card backgroundImage="https://res.cloudinary.com/rxg/image/upload/v1708101484/shareplate/Image_3_imcp6j.png" backgroundSize="cover"
            backgroundPosition="center" mb={10} py={3} rounded={20} cursor='pointer'>
            <CardBody>
                <HStack justify="space-between">
                    <FaRegArrowAltCircleRight color="white" size="25px" />
                    <Text color="white" fontSize="2xl">{userType === 'supplier' ? 'Donate Food' : 'Scheduled Donations'}</Text>
                </HStack>
            </CardBody>
        </Card>

        <Card backgroundImage="https://res.cloudinary.com/rxg/image/upload/v1708101682/shareplate/Image_4_n5aqeh.png" backgroundSize="cover"
            backgroundPosition="center" mb={10} py={3} rounded={20} cursor='pointer'>
            <CardBody>
                <HStack justify="space-between">
                    <FaRegArrowAltCircleRight color="white" size="25px" />
                    <Text color="white" fontSize="2xl">{userType === 'supplier' ? 'Sell Items' : 'View Store'}</Text>
                </HStack>
            </CardBody>
        </Card>
    </>
)