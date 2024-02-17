import { useAuth } from '@/contexts/AuthCtx';
import { Box, Card, Flex, useMediaQuery, useToast } from '@chakra-ui/react';
import Link from 'next/router';
import { FiHome, FiLogOut, FiUser } from 'react-icons/fi';

export const BottomBar = () => {
    const { signOut, appSession } = useAuth();
    const toast = useToast()
    const logout = () => {
        signOut();
        toast({
            position: 'bottom',
            render: () => (
                <Box color="white" p={3} rounded="12px" bg="purple.25">
                    Adios!
                </Box>
            ),
        });
    };

    const changeScreen = (option: string) => {
        const path = option === 'home' ? '/' : option;
        Link.push(path);
    };

    const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
    const bottomBarWidth = isLargerThan768 ? '700px' : '500px';
    return (
        <Flex justify="center">
            {appSession !== null ? (
                <Card
                    w={bottomBarWidth}
                    rounded="12"
                    bg="rgba(255, 255, 255, 0.15)"
                    backdropFilter="blur(5px)"
                >
                    <Flex justify="space-around" h="60px" align="center">
                        <Box>
                            <FiLogOut color='white' size="25" onClick={() => logout()} />
                        </Box>
                        <Box>
                            <FiHome color='white' size="25" onClick={() => changeScreen('home')} />
                        </Box>
                        <Box>
                            <FiUser color='white' size="25" onClick={() => changeScreen('profile')} />
                        </Box>
                    </Flex>
                </Card>
            ) : (
                ''
            )}
        </Flex>
    );
}