import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

const colors: any = {
  colors: {
    greyBrand: {
      400: "#313640", // button 
      500: "#474a54" // button:active
    }
  }
}

const theme = extendTheme({ config, ...colors });
export default theme;
