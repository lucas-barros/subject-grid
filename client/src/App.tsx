import React from "react";
import "./App.css";
import "@radix-ui/themes/styles.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
