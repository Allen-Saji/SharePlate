import { useAuth } from "@/contexts/AuthCtx";
import { UserContext } from "@/contexts/UserCtx";
import { registerCharity } from "@/utils/data/registerCharity";
import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, useDisclosure, useToast } from "@chakra-ui/react"
import Link from "next/router";
import { ChangeEvent, Dispatch, FC, SetStateAction, useContext } from "react";

type CharityRegisterModalProp = {
    isCharity: boolean;
    setIsCharity: Dispatch<SetStateAction<boolean>>
}

export const CharityRegisterModal: FC<CharityRegisterModalProp> = ({ isCharity, setIsCharity }) => {

    const userContext = useContext(UserContext);
    const toast = useToast();

    const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (event.target.id === 'capacity' || event.target.id === 'nonVegCount' || event.target.id === 'vegCount')
            userContext?.setCharityUserData({ ...userContext.charityUserData, [event.target.id]: Number(event.target.value) });
        else userContext?.setCharityUserData({ ...userContext.charityUserData, [event.target.id]: event.target.value });
    };

    const register = async () => {
        if (!userContext?.charityUserData) {
            toast({
                position: 'bottom',
                render: () => (
                    <Box color="white" p={3} rounded="12px" bg="red.50">
                        Something went wrong!
                    </Box>
                ),
            });
            return
        }
        const data = await registerCharity(userContext.charityUserData)
        if (data.status === 'success') {
            toast({
                position: 'bottom',
                render: () => (
                    <Box color="white" p={3} rounded="12px" bg="green.400">
                        Registeration Success! Verify & SignIn
                    </Box>
                ),
            });
            Link.push('/')
        } else {
            toast({
                position: 'bottom',
                render: () => (
                    <Box color="white" p={3} rounded="12px" bg="red.50">
                        Something went wrong!
                    </Box>
                ),
            });
        }
    }

    return (
        <>
            <ModalOverlay bg="rgba(255, 255, 255, 0.15)" backdropFilter="blur(20px)" />
            <ModalContent>
                <ModalHeader color="gray.50">Charity Registeration</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel color="gray.25" htmlFor="name" pl="1">
                            Name
                        </FormLabel>
                        <Input
                            bg="gray.50"
                            id="name"
                            value={userContext?.charityUserData.name}
                            mb="7"
                            rounded="12px"
                            onChange={handleFormChange}
                        />
                        <FormLabel color="gray.25" htmlFor="phoneNumber" pl="1">
                            Phone
                        </FormLabel>
                        <Input
                            bg="gray.50"
                            id="phoneNumber"
                            value={userContext?.charityUserData.phoneNumber}
                            mb="7"
                            rounded="12px"
                            onChange={handleFormChange}
                        />
                        <FormLabel color="gray.25" htmlFor="registrationCertificate" pl="1">
                            Organization Id
                        </FormLabel>
                        <Input
                            bg="gray.50"
                            id="registrationCertificate"
                            value={userContext?.charityUserData.registrationCertificate}
                            mb="7"
                            rounded="12px"
                            onChange={handleFormChange}
                        />
                        <FormLabel color="gray.25" htmlFor="capacity" pl="1">
                            Capacity
                        </FormLabel>
                        <Input
                            bg="gray.50"
                            id="capacity"
                            value={userContext?.charityUserData.capacity}
                            mb="7"
                            rounded="12px"
                            onChange={handleFormChange}
                            type="number"
                        />
                        <FormLabel color="gray.25" htmlFor="nonVegCount" pl="1">
                            nonVegCount
                        </FormLabel>
                        <Input
                            bg="gray.50"
                            id="nonVegCount"
                            value={userContext?.charityUserData.nonVegCount}
                            mb="7"
                            rounded="12px"
                            onChange={handleFormChange}
                            type="number"
                        />
                        <FormLabel color="gray.25" htmlFor="nonVegCount" pl="1">
                            vegCount
                        </FormLabel>
                        <Input
                            bg="gray.50"
                            id="vegCount"
                            value={userContext?.charityUserData.vegCount}
                            mb="7"
                            rounded="12px"
                            onChange={handleFormChange}
                            type="number"
                        />
                        <Button
                            onClick={register}
                            disabled={false}
                        >Register</Button>
                    </FormControl>
                    <HStack justify="center" mt={10}>
                        <Text fontWeight="medium" fontSize="sm" color="gray.25">
                            Want to be a {isCharity ? 'donor/seller ?' : 'charity organisation'}
                        </Text>
                        <Text fontWeight="semibold" fontSize="sm" color="gray.25" cursor='pointer' onClick={() => setIsCharity(!isCharity)}>
                            Register as {isCharity ? 'seller' : 'charity'}
                        </Text>
                    </HStack>
                </ModalBody>
            </ModalContent>
        </>
    )
}