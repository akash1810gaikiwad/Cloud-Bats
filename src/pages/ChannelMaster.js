import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddEntity, getEntity } from "../Global";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ChannelParams } from "./model/masters";
import { showMessage } from "../GlobalFunction";

const ChannelMaster = () => {
  const [tableData, settableData] = useState([]);
  const token = useSelector((state) => state.token);
  const LoginCode = useSelector((state) => state.LoginCode);
  useEffect(() => {
    getEntity(token)
      .then((data) => {
        console.log("Data from API:", data);
        settableData(data);
        // Use the data as needed in your modal or component
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  }, []);

  const navigate = useNavigate();

  const [defaultParams] = ChannelParams;
  const [params, setParams] = useState(defaultParams);

  const [isAddEventModal, setIsAddEventModal] = useState(false);

  const addEvent = (data = null) => {
    setIsAddEventModal(true);
  };
  const delDate = (data = null) => {
    const filteredData = tableData.filter(
      (item) => item.CurrencyCode !== data.CurrencyCode
    );
    settableData(filteredData);
  };

  const editDate = (data) => {
    let params = JSON.parse(JSON.stringify(defaultParams));
    setParams(params);
    if (data) {
      let obj = JSON.parse(JSON.stringify(data));

      setParams({
        id: obj.CurrencyCode ? obj.CurrencyCode : null,
        CurrencyName: obj.CurrencyName ? obj.CurrencyName : null,
        CurrencySymbol: obj.CurrencySymbol ? obj.CurrencySymbol : null,
        Currency_image: obj.Currency_image ? obj.Currency_image : null,
        ShortName: obj.ShortName ? obj.ShortName : null,
      });
    }
    addEvent(data);
  };
  const saveEvent = (params) => {
    if (!params.id === null) {
      //update event
      let dataevent = tableData || [];
      let event = dataevent.find((d) => d.id === parseInt(params.id));
      event.ChannelCode = params.ChannelCode;
      event.ChannelName = params.ChannelName;
      event.ShortName = params.ShortName;
      event.Channel_Image = params.Channel_Image;
      event.ChannelGenre = params.ChannelGenre;
      event.ChannelContentType = params.ChannelContentType;
      event.IsActive = params.IsActive;
      event.AddedBy = params.AddedBy;
      event.AddedOn = params.AddedOn;
      event.StateCode = params.StateCode;
      event.SACCode = params.SACCode;
      event.GSTN_id = params.GSTN_id;

      settableData([]);
      setTimeout(() => {
        settableData(dataevent);
      });
    } else {
      //add event

      AddEntity(params, LoginCode, token, navigate);

      let event = {
        ChannelCode: params.ChannelCode,
        ChannelName: params.ChannelName,
        ShortName: params.ShortName,
        Channel_Image: params.Channel_Image,
        ChannelGenre: params.ChannelGenre,
        ChannelContentType: params.ChannelContentType,
        IsActive: params.IsActive,
        AddedBy: params.AddedBy,
        AddedOn: params.AddedOn,
        StateCode: params.StateCode,
        SACCode: params.SACCode,
        GSTN_id: params.GSTN_id,
      };
      let dataevent = tableData || [];
      dataevent = dataevent.concat([event]);
      setTimeout(() => {
        settableData(dataevent);
      });
    }

    showMessage("Event has been saved successfully.");
    let params2 = JSON.parse(JSON.stringify(defaultParams));
    setParams(params2);
    setIsAddEventModal(false);
  };
  const changeValue = (e) => {
    const { value, id } = e.target;

    setParams({ ...params, [id]: value });
  };

  return (
    <div id="main-content">
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="header">
              <h2>Channel Master </h2>
            </div>
            <div className="body">
              <div class="card">
                <div class="body">
                  <a
                    id="modal_view_right"
                    data-toggle="modal"
                    data-target="#information_modal"
                    class="btn btn-primary m-b-15"
                    type="button"
                  >
                    <i class="icon wb-plus" aria-hidden="true"></i> Add Channel
                  </a>
                  <div class="table-responsive">
                    <table
                      class="table table-bordered table-hover table-striped"
                      cellspacing="0"
                      id="addrowExample"
                    >
                      <thead>
                        <tr>
                          <th>Channel Name</th>
                          <th>Short Name</th>
                          <th>Channel Image</th>
                          <th>Channel Genre</th>
                          <th>Channel Content Type</th>
                          <th>State Code</th>
                          <th>SAC Code</th>
                          <th>GSTN ID</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      {/* <tfoot>
                                    <tr>
                                    <th>EntityName</th>
                                        <th>PermAddress</th>
                                        <th>ContactPerson</th>
                                        <th>Contact</th>
                                        <th>IsActive</th>
                                        <th>PANNO</th>
                                        <th>CINNumber</th>
                                        <th>Actions</th>
                                    </tr>
                                </tfoot> */}
                      {tableData.map((data, index) => {
                        return (
                          <tbody key={index}>
                            <tr class="gradeA">
                              <td>{data.ChannelName}</td>
                              <td>{data.ShortName}</td>
                              <td>{data.Channel_Image}</td>
                              <td>{data.ChannelGenre}</td>
                              <td>{data.ChannelContentType}</td>
                              <td>{data.StateCode}</td>
                              <td>{data.SACCode}</td>
                              <td>{data.GSTN_id}</td>

                              <td class="actions">
                                <button
                                  type="button"
                                  class="btn btn-sm btn-icon btn-pure btn-default on-default button-remove"
                                  href="#largeModal"
                                  data-toggle="modal"
                                  data-target="#largeModal"
                                  id="addToTable"
                                  onClick={() => editDate(data, index)}
                                >
                                  <i
                                    class="fa fa-pencil"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                                {/* <a class="btn btn-sm btn-icon btn-pure btn-default on-default button-remove"
                                            data-toggle="tooltip" data-original-title="Remove"><i class="fa fa-trash" aria-hidden="true"></i></a> */}
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal modal_outer right_modal fade"
        id="information_modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel2"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="title" id="largeModalLabel">
                {params.id ? "Edit Currency" : "Add Currency"}
              </h4>
            </div>
            <div className="modal-body">
              <div class="card">
                <div class="body">
                  {/* <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Entity Id</span>
                                </div>
                                <input type="text"
                                class="form-control"
                                placeholder="Enter Entity Id"
                                id="EntityId"
                                name="EntityId"
                                defaultValue={params.EntityId}
                                onChange={(e) => changeValue(e)}
                                required
                                 />
                            </div> */}
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Channel Name</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Channel Name"
                      id="ChannelName"
                      name="ChannelName"
                      defaultValue={params.ChannelName}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Short Name</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Short Name"
                      id="ShortName"
                      name="ShortName"
                      defaultValue={params.ShortName}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Channel Image</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Channel Image"
                      id="Channel_Image"
                      name="Channel_Image"
                      defaultValue={params.Channel_Image}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Channel Genre</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Channel Genre"
                      id="ChannelGenre"
                      name="ChannelGenre"
                      defaultValue={params.ChannelGenre}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Channel Content Type</span>
                    </div>
                    <select class="form-control">
                      <option>Channel Content Type</option>
                      <option defaultValue="1">Sessions</option>
                      <option defaultValue="2">Users</option>
                      <option selected defaultValue="3">
                        Page Views
                      </option>
                      <option defaultValue="4">Bounce Rate</option>
                      <option defaultValue="5">Location</option>
                      <option defaultValue="6">Pages</option>
                      <option defaultValue="7">Referrers</option>
                      <option defaultValue="8">Searches</option>
                      <option defaultValue="9">Technology</option>
                      <option defaultValue="10">404 Errors</option>
                    </select>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">State Code</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter State Code"
                      id="StateCode"
                      name="StateCode"
                      defaultValue={params.StateCode}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">SAC Code</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter SAC Code"
                      id="SACCode"
                      name="SACCode"
                      defaultValue={params.SACCode}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">GSTN ID</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter GSTN ID"
                      id="GSTN_id"
                      name="GSTN_id"
                      defaultValue={params.GSTN_id}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => saveEvent(params)}
              >
                {" "}
                {params.id ? "Update Event" : "Create Event"}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  let params = JSON.parse(JSON.stringify(defaultParams));
                  setParams(params);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelMaster;
