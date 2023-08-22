import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "40em", // 480px
  md: "58em", // 768px
  lg: null, // 992px
  xl: null, // 1280px
  "2xl": "96em", // 1536px
};

const theme = extendTheme({ breakpoints });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
