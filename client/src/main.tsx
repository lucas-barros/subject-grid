import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Toast from "@radix-ui/react-toast";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" forcedTheme="dark">
        <Theme>
          <Toast.Provider swipeDirection="right">
            <App />
          </Toast.Provider>
        </Theme>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
