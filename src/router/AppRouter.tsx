import { createBrowserRouter, RouterProvider } from "react-router";
import { routes } from "./Routes";


const router = createBrowserRouter(routes);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
