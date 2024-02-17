import { useAuth } from "@/contexts/AuthCtx";
import { UserContext } from "@/contexts/UserCtx";
import { registerSupplier } from "@/utils/data/registerSupplier";
import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Select, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { ChangeEvent, Dispatch, FC, SetStateAction, useContext } from "react";

type SupplierRegisterModalProp = {
    isCharity: boolean;
    setIsCharity: Dispatch<SetStateAction<boolean>>
}

export const SupplierRegisterModal: FC<SupplierRegisterModalProp> = ({ isCharity, setIsCharity }) => {

    const userContext = useContext(UserContext);
    const toast = useToast();


    const handleFormChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (event.target.id === 'capacity' || event.target.id === 'nonVegCount' || event.target.id === 'vegCount')
            userContext?.setSupplierUserData({ ...userContext.supplierUserData, [event.target.id]: Number(event.target.value) });
        else userContext?.setSupplierUserData({ ...userContext.supplierUserData, [event.target.id]: event.target.value });
    };

    const register = async () => {
        if (!userContext?.supplierUserData) {
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
        const data = await registerSupplier(userContext.supplierUserData)
        if (data.status === 'success') {
            toast({
                position: 'bottom',
                render: () => (
                    <Box color="white" p={3} rounded="12px" bg="green.400">
                        Registeration Success!
                    </Box>
                ),
            });
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
                <ModalHeader color="gray.50">Supplier Registeration</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel color="gray.25" htmlFor="name" pl="1">
                            Name
                        </FormLabel>
                        <Input
                            bg="gray.50"
                            id="name"
                            value={userContext?.supplierUserData.name}
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
                            value={userContext?.supplierUserData.phoneNumber}
                            mb="7"
                            rounded="12px"
                            onChange={handleFormChange}
                        />
                        <FormLabel color="gray.25" htmlFor="aadharNumber" pl="1">
                            Aadhar Number
                        </FormLabel>
                        <Input
                            bg="gray.50"
                            id="aadharNumber"
                            value={userContext?.supplierUserData.aadharNumber}
                            mb="7"
                            rounded="12px"
                            onChange={handleFormChange}
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