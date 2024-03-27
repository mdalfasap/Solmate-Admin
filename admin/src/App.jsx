import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLogin from "./components/signin/AdminLogin";
import AdminRegister from "./components/signin/AdminRegister"
import Home from "./components/home/home";
import Subscritption from "./components/home/subscription/Subscritption";
import Notification from './components/home/notification/Notification'
import Administration from "./components/home/administration/Administration";
import Dashboard from "./components/home/dashboard/Dashboard";
import ViewUser from "./components/home/ViewUser";

function App() {
const router = createBrowserRouter(
  [
    {
      path: "/",
      element:<AdminLogin/>
    },
    {
      path: "/adminregister",
      element:<AdminRegister/>
    },
    {
      path: "/usermanagement",
      element:<Home/>
    },
    {
      path: "/subscription",
      element:<Subscritption/>
    },
    {
      path: "/notification",
      element:<Notification/>
    },
    {
      path: "/administration",
      element:<Administration/>
    },
    {
      path: "/dashboard",
      element:<Dashboard/>
    },
    {
      path: "/viewUser/:id",
      element:<ViewUser/>
    },
  ],
  {
    redirectTo: "/dashboard",
  }
);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

