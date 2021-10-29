import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const colors: any = {
  colors: {
    customGrey: 
    {
      50: '#eaeffc',
      100: '#d5d5e0',
      200: '#babac6',
      300: '#9ea1ad',
      400: '#838695',
      500: '#696d7b',
      600: '#525561',
      700: '#3a3c46',
      800: '#21242c',
      900: '#0d0b16',
    },
    greyBrand: {
      400: "#313640", // button 
      500: "#474a54" // button:active
    }
  }
}

const theme = extendTheme({ config, ...colors });
export default theme;
