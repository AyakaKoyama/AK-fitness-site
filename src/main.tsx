import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { ArticleManager } from "./components/ArticleManager.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <ArticleManager />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
