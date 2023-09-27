import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

const FullLayout = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // if(token === null)
    // {
    //   navigate('/')
    // }
  }, []);

  return (
    <div id="wrapper" className="theme-cyan">
      {isLoading ? (
        <div className="page-loader-wrapper">
          <div className="loader">
            <div className="m-t-30">
              <img
                src="assets/images/logo-icon.svg"
                width="48"
                height="48"
                alt="Iconic"
              />
            </div>
            <p>Please wait...</p>
          </div>
        </div>
      ) : null}

      <Nav />

      <Sidebar />

      <Outlet />
    </div>
  );
};

export default FullLayout;
