import { extendTheme } from '@chakra-ui/react';
// import '@/styles/global.css';

const theme = extendTheme({
    colors: {
        white: {
            50: '#FEFEFE'
        },
        black: {
            25: '#353535',
            50: '#272727',
        },
        yellow: {
            50: '#FAFFC1',
        },
        gray: {
            25: '#D3D3D3',
            50: '#F4F4F4',
            75: '#D4D4D4',
        },
        red: {
            25: '#FFE0E0',
            50: '#FE7E7E',
        },
        green: {
            25: '#E0FFED',
            50: '#C1FFDA',
        },
        purple: {
            25: '#E3A7FF',
        },
        blue: {
            50: '#CFE8FF',
        },
    },
    fonts: {
        heading: `'SFProMedium', sans-serif`,
        body: `'SFProMedium', sans-serif`,
    },
});

export default theme;
