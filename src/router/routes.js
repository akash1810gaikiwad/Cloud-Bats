import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

/* ***Layouts**** */
import FullLayout from "../layouts/FullLayout";
import BlankLayout from "../layouts/BlankLayout";

/* ****Pages***** */
import Main from "../pages/main";
import CurrencyMaster from "../pages/CurrencyMaster";
import EntityMaster from "../pages/EntityMaster";
import LocationMaster from "../pages/LocationMaster";
import ChannelMaster from "../pages/ChannelMaster";
import PlaceMaster from "../pages/PlaceMaster";
import DesignationMaster from "../pages/DesignationMaster";

/* ****Auth***** */
import Login from "../pages/Login";

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
      { path: "/designationmaster", element: <DesignationMaster /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
