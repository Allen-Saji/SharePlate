import { ChangeEvent, useContext, useState } from 'react';
import { Box, Button, FormControl, FormLabel, HStack, Input, Modal, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { useAuth } from '@/contexts/AuthCtx';
import { LoginData } from '@/types/auth';
import { CharityRegisterModal } from '../register/charityModal';
import { UserContext } from '@/contexts/UserCtx';
import { SupplierRegisterModal } from '../register/supplierModal';
import { getSupplierData, getCharityData } from '@/utils/data/getUserData';

const LoginPage = () => {
    const { signIn, signUp } = useAuth();
    const userContext = useContext(UserContext);
    const toast = useToast();

    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: '',
    });

    const [isLoading, setLoading] = useState<boolean>(false);
    const [isCreate, setIsCreate] = useState<boolean>(false);

    const [isCharity, setIsCharity] = useState<boolean>(false);

    const {
        isOpen: isOpenCharityModal,
        onOpen: onOpenCharityModal,
        onClose: onCloseCharityModal,
    } = useDisclosure();

    const login = async () => {
        setLoading(true);
        const { error, authId } = await signIn(loginData.email, loginData.password);
        setLoading(false);
        if (error) {
            toast({
                position: 'bottom',
                render: () => (
                    <Box color="white" p={3} rounded="12px" bg="red.50">
                        Invalid Credentials
                    </Box>
                ),
            });
        } else {
            const supplierData = await getSupplierData(authId)
            if (supplierData?.data.status === 'fail') {
                setIsCharity(true)
                const charityData = await getCharityData(authId)
                userContext?.setCharityUserData(charityData?.data.data);
            }
            else {
                userContext?.setSupplierUserData(supplierData?.data.data);
                setIsCharity(false)
            }

            toast({
                position: 'bottom',
                render: () => (
                    <Box color="white" p={3} rounded="12px" bg="green.400">
                        Welcome!!
                    </Box>
                ),
            });
        }
    };

    const createUser = async () => {
        setLoading(true);
        const { error, authId, email } = await signUp(loginData.email, loginData.password);
        setLoading(false);
        if (error) {
            toast({
                position: 'bottom',
                render: () => (
                    <Box color="white" p={3} rounded="12px" bg="red.50">
                        Invalid Credentials
                    </Box>
                ),
            });
        } else {
            toast({
                position: 'bottom',
                render: () => (
                    <Box color="white" p={3} rounded="12px" bg="green.400">
                        Success! Please verify your mail
                    </Box>
                ),
            });
            userContext?.setCharityUserData({ ...userContext?.charityUserData, authId, email })
            userContext?.setSupplierUserData({ ...userContext?.supplierUserData, authId, email })
            onOpenCharityModal()
        }
    };

    const handleLoginData = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setLoginData({ ...loginData, [event.target.id]: event.target.value });
    };
    return (
        <Box p={2}>
            <Box mt="20px" mb="30px">
                <Text fontSize="5xl" fontWeight="black" color="gray.50">
                    Welcome
                    <br />
                </Text>
                <Text fontSize="xl" ml="2.5" fontWeight="medium" color="gray.75" mr="1">
                    To SharePlate
                </Text>
            </Box>

            <FormControl pt={28}>
                <>
                    <FormLabel htmlFor="email" color="gray.50" pl="1">
                        Email
                    </FormLabel>
                    <Input
                        bg="gray.50"
                        id="email"
                        value={loginData.email}
                        onChange={handleLoginData}
                        placeholder="john.doe@gmail.com"
                        h={14}
                        mb="7"
                        rounded="12px"
                    />
                    <FormLabel htmlFor="password" color="gray.50" pl="1">
                        Password
                    </FormLabel>
                    <Input
                        bg="gray.50"
                        id="password"
                        type="password"
                        h={14}
                        value={loginData.password}
                        onChange={handleLoginData}
                        rounded="12px"
                        mb={2}
                    />
                    <HStack justify='center'>
                        <Button
                            mt={10}
                            width={80}
                            height={10}
                            onClick={() => isCreate ? createUser() : login()}
                            isLoading={isLoading}
                        >
                            {isCreate ? 'SignUp' : 'SignIn'}
                        </Button>
                    </HStack>
                    <HStack justify="center" mt={10}>
                        <Text fontWeight="medium" fontSize="sm" color="gray.25">
                            {isCreate ? 'Already' : 'Don\'t'} have an account?
                        </Text>
                        <Text fontWeight="semibold" fontSize="sm" color="gray.25" cursor='pointer' onClick={() => setIsCreate(!isCreate)}>
                            {isCreate ? 'SignIn' : 'SignUp'}
                        </Text>
                    </HStack>
                </>
            </FormControl>
            <Modal
                isCentered
                size="xs"
                onClose={onCloseCharityModal}
                isOpen={isOpenCharityModal}
                motionPreset="slideInBottom"
            >
                {isCharity ?
                    <CharityRegisterModal isCharity={isCharity} setIsCharity={setIsCharity} /> :
                    <SupplierRegisterModal isCharity={isCharity} setIsCharity={setIsCharity} />
                }
            </Modal>
        </Box>
    );
};

export default LoginPage;