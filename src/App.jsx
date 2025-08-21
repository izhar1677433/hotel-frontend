import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

// import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// import pages
import Home from "./pages/Home";
import RoomDetails from "./pages/RoomDetails";
import NotFound from "./pages/NotFound";

import Rooms from "./pages/Rooms";
import Contact from "./pages/contact";
import Restaurant from "./pages/Restaurant";
import About from "./pages/About";
import Login from "./pages/Login";
import AnimatedGallery from "./components/AnimatedGallery ";
import Room from "./components/Room";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Admin from "./components/Admin";
import Adminlogin from "./components/Adminlogin";

// Layout component that includes Header and Footer
const Layout = () => {
  return ( 
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "room/:id",
        element: <RoomDetails />,
      },
      {
        path: "restaurants",
        element: <Restaurant />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "pages/Login",
        element: <Login />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "animated",
        element: <AnimatedGallery />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element:  <ProtectedRoute requireAdmin={true}>
          <Adminlogin />,
          </ProtectedRoute>
            
      },
    ],
  },
]);

  const App = () => {
    return (
      <RouterProvider router={router} />
    );
  };
export default App;
