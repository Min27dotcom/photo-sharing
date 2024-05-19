import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import UserDetail from "../components/UserDetail";
import Profile from "../pages/Profile";
import UserPage from "../pages/UserPage";
import UserPhotos from "../components/UserPhotos";


export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Profile/>
      },
      {
        path: "user",
        element: <UserPage/>,
        children: [
          {
            path: ":userId",
            element: <UserDetail/>
          },
          {
            path: "photo/:userId",
            element: <UserPhotos/>
          }
        ]
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
      {
        path: "logout",
        element: <Logout />
      },
      {
        path: "*",
        element: <Navigate to="/" />
      }
    ]
  }
];