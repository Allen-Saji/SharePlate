import { ChakraProvider, Container } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "@/configs/chakra";
import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthCtx";
import { UserProvider } from "@/contexts/UserCtx";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <Container h='100vh' pt="25px" px="25px" backgroundColor='#000000'>
            <Component {...pageProps} />
          </Container>
        </UserProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}
