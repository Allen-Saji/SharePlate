import React, { FC, PropsWithChildren, createContext, useMemo, useState } from 'react';

const UserContext = createContext<UserContextProps | null>(null);

const UserProvider: FC<PropsWithChildren<{}>> = ({ children }) => {

    const [charityUserData, setCharityUserData] = useState<CharityUser>({
        authId: '',
        name: '',
        email: '',
        phoneNumber: '',
        capacity: 0,
        nonVegCount: 0,
        vegCount: 0,
        latitude: 0,
        longitude: 0,
        registrationCertificate: '',
    });


    const [supplierUserData, setSupplierUserData] = useState<SupplierUser>({
        authId: '',
        email: '',
        latitude: 0,
        longitude: 0,
        name: '',
        phoneNumber: '',
        aadharNumber: '',
    });

    const userContextData = useMemo(() => ({ charityUserData, setCharityUserData, supplierUserData, setSupplierUserData }), [charityUserData, supplierUserData]);
    return <UserContext.Provider value={userContextData}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
