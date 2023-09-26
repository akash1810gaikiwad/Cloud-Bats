import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/BlankLayout'));

/* ****Pages***** */
const Main = lazy(() => import('../pages/main'));
const CurrencyMaster = lazy(() => import('../pages/CurrencyMaster'));
const LocationMaster = lazy(() => import('../pages/LocationMaster'));

const Login = lazy(() => import('../pages/Login'));

const Router = [
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <Navigate to="/login" /> },
      { path: '/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <FullLayout />,
    children: [
      //{ path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard',  element: <Main /> },
      { path: '/currency',  element: <CurrencyMaster /> },
      { path: '/location',  element: <LocationMaster /> },
      
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  
];

export default Router;
