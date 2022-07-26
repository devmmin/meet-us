import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: ({ colorMode }: { colorMode: string }) => ({
      body: {
        margin: 0,
      },
      "html, body, #root, .App": {
        height: "100%",
      },
      "html, body": {
        color: colorMode === "dark" ? "white" : "gray.700",
      },
    }),
  },
});

export default theme;
