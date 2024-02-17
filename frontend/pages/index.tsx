import { BottomBar } from "@/components/general/bottomBar";
import LoginPage from "@/components/general/loginPage";
import { Options } from "@/components/home/options";
import { Welcome } from "@/components/home/welcome";
import { useAuth } from "@/contexts/AuthCtx";
import { UserContext } from "@/contexts/UserCtx";
import Head from "next/head";
import { useContext, useEffect } from "react";

const Home = () => {
  const { appSession } = useAuth();
  const userContext = useContext(UserContext);

  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            userContext?.setCharityUserData({ ...userContext.charityUserData, latitude, longitude })
            userContext?.setSupplierUserData({ ...userContext.supplierUserData, latitude, longitude })
          },
          (error) => {
            console.error("Error getting user location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getUserLocation();
  }, []);
  const userName = userContext?.charityUserData.name || userContext?.supplierUserData.name
  console.log(userName);

  return (
    <>
      <Head>
        <title>SharePlate</title>
        <meta name="description" content="Food for everyone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {appSession === null ? (
        <LoginPage />
      ) : (
        <main>
          <Welcome userName='{userName}' />
          <Options userType="supplier" />
          <BottomBar />
        </main>)}
    </>
  )
}

export default Home