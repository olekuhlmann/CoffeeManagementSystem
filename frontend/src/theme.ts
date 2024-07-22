import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  fonts: {
    heading: `'inter', sans-serif`,
    body: `'inter', sans-serif`,
  },
  config
});

export default theme;