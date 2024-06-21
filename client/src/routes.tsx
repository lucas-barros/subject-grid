import { createBrowserRouter } from "react-router-dom";
import { Root } from "./pages/Root";

export const routes = {
  root: "/",
};

export const router = createBrowserRouter([
  {
    path: routes.root,
    Component: Root,
  },
]);
