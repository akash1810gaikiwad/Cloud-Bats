import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Module, SubModule } from "../Global";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const token = useSelector((state) => state.token);
  const [tableData, settableData] = useState([]);
  const [tableData2, settableData2] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  useEffect(() => {
    Module(token)
      .then((data) => {
        console.log("Data from API:", data);
        settableData(data);
        // Use the data as needed in your modal or component
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
    SubModule(token)
      .then((data2) => {
        console.log("Data from API:", data2);
        settableData2(data2);
        // Use the data as needed in your modal or component
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  }, []);
  const [itemVisibility, setItemVisibility] = useState(
    Array(tableData.length).fill(false)
  );
  const handleModuleClick = (moduleCode) => {
    setSelectedModule(moduleCode);
  };
  const toggleItem = (index) => {
    const updatedVisibility = [...itemVisibility];
    console.log(Array(tableData.length).fill(false));
    updatedVisibility[index] = !updatedVisibility[index];

    setItemVisibility(updatedVisibility);
  };
  const activeModules = tableData.filter((module) => module.IsActive === "Y");

  const activeSubmodules = tableData2.filter(
    (submodule) => submodule.IsActive === "Y"
  );
  // Use map to render the filtered objects

  return (
    <div id="left-sidebar" className="sidebar">
      <button type="button" className="btn-toggle-offcanvas">
        <i className="fa fa-arrow-left"></i>
      </button>
      <div className="sidebar-scroll">
        <div className="user-account">
          <img
            src="assets/images/user.jpeg"
            className="rounded-circle user-photo"
            alt="User Profile Picture"
          />
          <div className="dropdown">
            <span>Welcome,</span>
            <a
              href="javascript:void(0);"
              className=" user-name"
              data-toggle="dropdown">
              <strong>Admin</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-right account">
              <li>
                <a href="page-profile2.html">
                  <i className="icon-user"></i>My Profile
                </a>
              </li>
              <li>
                <a href="app-inbox.html">
                  <i className="icon-envelope-open"></i>Messages
                </a>
              </li>
              <li>
                <a href="javascript:void(0);">
                  <i className="icon-settings"></i>Settings
                </a>
              </li>
              <li className="divider"></li>
              <li>
                <a href="page-login.html">
                  <i className="icon-power"></i>Logout
                </a>
              </li>
            </ul>
          </div>
          <hr />
          <ul className="row list-unstyled">
            <li className="col-4">
              <small>Version</small>
              <h6>0.0.1</h6>
            </li>
            <li className="col-4">
              <small>Previous</small>
              <h6>3:11 pm</h6>
            </li>
            <li className="col-4">
              <small>Today</small>
              <h6>3:11 pm</h6>
            </li>
          </ul>
        </div>

        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#menu">
              Menu
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#Chat">
              <i className="icon-book-open"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#setting">
              <i className="icon-settings"></i>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#question">
              <i className="icon-question"></i>
            </a>
          </li>
        </ul>

        <div className="tab-content padding-0">
          <div className="tab-pane active" id="menu">
            <nav id="left-sidebar-nav" className="sidebar-nav">
              <ul id="main-menu" class="metismenu li_animation_delay">
                <li>
                  <a href="#Dashboard" class="has-arrow">
                    <i class="fa fa-dashboard"></i>
                    <span>Admin</span>
                  </a>
                  <ul>
                    <li>
                      <Link to="dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="currency">Currency Master</Link>
                    </li>
                    <li>
                      <Link to="entity">Entity Master</Link>
                    </li>
                  </ul>
                </li>
              </ul>
              {activeModules.map((module, index) => (
                <ul
                  id="main-menu"
                  className="metismenu li_animation_delay"
                  key={module.ModuleCode}>
                  <li
                    className={
                      selectedModule === module.ModuleCode ? "active" : ""
                    }
                    onClick={() => handleModuleClick(module.ModuleCode)}>
                    <a href={"#" + module.ModuleCode} className="has-arrow">
                      <i className="fa fa-dashboard"></i>
                      <span>{module.ModuleName}</span>
                    </a>
                    <ul>
                      {selectedModule === module.ModuleCode && (
                        <>
                          {activeSubmodules
                            .filter(
                              (submodule) =>
                                submodule.ModuleCode === selectedModule
                            )
                            .map((submodule, index) => (
                              <li key={submodule.SubModuleCode}>
                                <Link to="/dashboard">
                                  {submodule.SubModuleName}
                                </Link>
                              </li>
                            ))}
                        </>
                      )}
                    </ul>
                  </li>
                </ul>
              ))}
            </nav>
          </div>
          <div className="tab-pane" id="Chat">
            <form>
              <div className="input-group m-b-20">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="icon-magnifier"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
            </form>
            <ul className="right_chat list-unstyled li_animation_delay">
              <li>
                <a href="javascript:void(0);" className="media">
                  <img
                    className="media-object"
                    src="assets/images/xs/avatar1.jpg"
                    alt=""
                  />
                  <div className="media-body">
                    <span className="name d-flex justify-content-between">
                      Chris Fox <i className="fa fa-heart-o font-12"></i>
                    </span>
                    <span className="message">chrisfox@gmail.com</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="media">
                  <img
                    className="media-object"
                    src="assets/images/xs/avatar2.jpg"
                    alt=""
                  />
                  <div className="media-body">
                    <span className="name d-flex justify-content-between">
                      Joge Lucky <i className="fa fa-heart-o font-12"></i>
                    </span>
                    <span className="message">Jogelucky@gmail.com</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="media">
                  <img
                    className="media-object"
                    src="assets/images/xs/avatar3.jpg"
                    alt=""
                  />
                  <div className="media-body">
                    <span className="name d-flex justify-content-between">
                      Isabella <i className="fa fa-heart-o font-12"></i>
                    </span>
                    <span className="message">Isabella@gmail.com</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="media">
                  <img
                    className="media-object"
                    src="assets/images/xs/avatar4.jpg"
                    alt=""
                  />
                  <div className="media-body">
                    <span className="name d-flex justify-content-between">
                      Folisise Chosielie <i className="fa fa-heart font-12"></i>
                    </span>
                    <span className="message">FolisiseChosielie@gmail.com</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" className="media">
                  <img
                    className="media-object"
                    src="assets/images/xs/avatar5.jpg"
                    alt=""
                  />
                  <div className="media-body">
                    <span className="name d-flex justify-content-between">
                      Alexander <i className="fa fa-heart-o font-12"></i>
                    </span>
                    <span className="message">Alexander@gmail.com</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="tab-pane" id="setting">
            <h6>Choose Skin</h6>
            <ul className="choose-skin list-unstyled">
              <li data-theme="purple">
                <div className="purple"></div>
              </li>
              <li data-theme="blue">
                <div className="blue"></div>
              </li>
              <li data-theme="cyan" className="active">
                <div className="cyan"></div>
              </li>
              <li data-theme="green">
                <div className="green"></div>
              </li>
              <li data-theme="orange">
                <div className="orange"></div>
              </li>
              <li data-theme="blush">
                <div className="blush"></div>
              </li>
              <li data-theme="red">
                <div className="red"></div>
              </li>
            </ul>

            <ul className="list-unstyled font_setting mt-3">
              <li>
                <label className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="font"
                    defaultValue="font-nunito"
                  />
                  <span className="custom-control-label">
                    Nunito Google Font
                  </span>
                </label>
              </li>
              <li>
                <label className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="font"
                    defaultValue="font-ubuntu"
                  />
                  <span className="custom-control-label">Ubuntu Font</span>
                </label>
              </li>
              <li>
                <label className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="font"
                    defaultValue="font-raleway"
                  />
                  <span className="custom-control-label">
                    Raleway Google Font
                  </span>
                </label>
              </li>
              <li>
                <label className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    name="font"
                    defaultValue="font-IBMplex"
                  />
                  <span className="custom-control-label">
                    IBM Plex Google Font
                  </span>
                </label>
              </li>
            </ul>

            <ul className="list-unstyled mt-3">
              <li className="d-flex align-items-center mb-2">
                <label className="toggle-switch theme-switch">
                  <input type="checkbox" />
                  <span className="toggle-switch-slider"></span>
                </label>
                <span className="ml-3">Enable Dark Mode!</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <label className="toggle-switch theme-rtl">
                  <input type="checkbox" />
                  <span className="toggle-switch-slider"></span>
                </label>
                <span className="ml-3">Enable RTL Mode!</span>
              </li>
              <li className="d-flex align-items-center mb-2">
                <label className="toggle-switch theme-high-contrast">
                  <input type="checkbox" />
                  <span className="toggle-switch-slider"></span>
                </label>
                <span className="ml-3">Enable High Contrast Mode!</span>
              </li>
            </ul>

            <hr />
            <h6>General Settings</h6>
            <ul className="setting-list list-unstyled">
              <li>
                <label className="fancy-checkbox">
                  <input type="checkbox" name="checkbox" />
                  <span>Allowed Notifications</span>
                </label>
              </li>
              <li>
                <label className="fancy-checkbox">
                  <input type="checkbox" name="checkbox" />
                  <span>Offline</span>
                </label>
              </li>
              <li>
                <label className="fancy-checkbox">
                  <input type="checkbox" name="checkbox" />
                  <span>Location Permission</span>
                </label>
              </li>
            </ul>

            <a href="#" target="_blank" className="btn btn-block btn-primary">
              Buy this item
            </a>
            <a
              href="https://themeforest.net/user/wrraptheme/portfolio"
              target="_blank"
              className="btn btn-block btn-secondary">
              View portfolio
            </a>
          </div>
          <div className="tab-pane" id="question">
            <form>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="icon-magnifier"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
            </form>
            <ul className="list-unstyled question">
              <li className="menu-heading">HOW-TO</li>
              <li>
                <a href="javascript:void(0);">How to Create Campaign</a>
              </li>
              <li>
                <a href="javascript:void(0);">Boost Your Sales</a>
              </li>
              <li>
                <a href="javascript:void(0);">Website Analytics</a>
              </li>
              <li className="menu-heading">ACCOUNT</li>
              <li>
                <a href="javascript:void(0);">Cearet New Account</a>
              </li>
              <li>
                <a href="javascript:void(0);">Change Password?</a>
              </li>
              <li>
                <a href="javascript:void(0);">Privacy &amp; Policy</a>
              </li>
              <li className="menu-heading">BILLING</li>
              <li>
                <a href="javascript:void(0);">Payment info</a>
              </li>
              <li>
                <a href="javascript:void(0);">Auto-Renewal</a>
              </li>
              <li className="menu-button mt-3">
                <a
                  href="../docs/index.html"
                  className="btn btn-primary btn-block">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
