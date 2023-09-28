import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

/* ***Layouts**** */
import FullLayout from "../layouts/FullLayout";
import BlankLayout from "../layouts/BlankLayout";

/* ****Pages***** */
import Main from "../pages/main";
import CurrencyMaster from "../pages/views/AdminView/CurrencyMaster";
import EntityMaster from "../pages/views/AdminView/EntityMaster";
import LocationMaster from "../pages/views/AdminView/LocationMaster";
 
import ChannelMaster from "../pages/views/AdminView/ChannelMaster";
 
import PlaceMaster from "../pages/views/AdminView/PlaceMaster";
 

/* ****Auth***** */
import Login from "../pages/Login";
import RegionMaster from "../pages/views/AdminView/RegionMaster";

/* ***Layouts**** */
// const FullLayout = lazy(() => import("../layouts/FullLayout"));

/* ****Pages***** */
// const CurrencyMaster = lazy(() => import("../pages/CurrencyMaster"));

const Router = [
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/login", element: <Login /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      //{ path: '/', element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", element: <Main /> },
      { path: "/currency", element: <CurrencyMaster /> },
      { path: "/channel", element: <ChannelMaster /> },
      { path: "/entity", element: <EntityMaster /> },
      { path: "/location", element: <LocationMaster /> },
      { path: "/placemaster", element: <PlaceMaster /> },
      { path: "/Regionmaster", element: <RegionMaster /> },

      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
