type CharityUser = {
    name: string;
    registrationCertificate: string;
    latitude: number;
    longitude: number;
    phoneNumber: string;
    authId: string;
    email: string;
    capacity: number;
    vegCount: number;
    nonVegCount: number;
}

type SupplierUser = {
    name: string;
    authId: string;
    latitude: number;
    longitude: number;
    phoneNumber: string;
    email: string;
    aadharNumber: string;
}

type UserContextProps = {
    charityUserData: CharityUser;
    setCharityUserData: React.Dispatch<React.SetStateAction<CharityUser>>;
    supplierUserData: SupplierUser;
    setSupplierUserData: React.Dispatch<React.SetStateAction<SupplierUser>>;
}