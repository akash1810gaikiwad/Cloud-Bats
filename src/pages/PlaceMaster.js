import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddEntity, getEntity } from "../Global";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { showMessage } from "../GlobalFunction";
import { PlaceParams } from "./model/masters";

const PlaceMaster = () => {
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

  
  const defaultParams = PlaceParams;
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
        id: obj.PlaceCode ? obj.PlaceCode : null,
        PlaceName: obj.PlaceName ? obj.PlaceName : null,
        ShortName: obj.ShortName ? obj.ShortName : null,
        PlaceTypeCode: obj.PlaceTypeCode ? obj.PlaceTypeCode : null,
        ZoneCode: obj.ZoneCode ? obj.ZoneCode : null,
        IsActive: obj.IsActive ? obj.IsActive : null,
        AddedBy: obj.AddedBy ? obj.AddedBy : null,
        AddedOn: obj.AddedOn ? obj.AddedOn : null,
        ModifiedBy: obj.ModifiedBy ? obj.ModifiedBy : null,
        ModifiedOn: obj.ModifiedOn ? obj.ModifiedOn : null,
        CountryCode: obj.CountryCode ? obj.CountryCode : null,
        StateCode: obj.StateCode ? obj.StateCode : null,
      });
    }
    addEvent(data);
  };
  const saveEvent = (params) => {
    if (!params.id === null) {
      //update event
      let dataevent = tableData || [];
      let event = dataevent.find((d) => d.id === parseInt(params.id));
      event.PlaceName = params.PlaceName;
      event.ShortName = params.ShortName;
      event.PlaceTypeCode = params.PlaceTypeCode;
      event.ZoneCode = params.ZoneCode;
      event.IsActive = params.IsActive;
      event.AddedBy = params.AddedBy;
      event.AddedOn = params.AddedOn;
      event.ModifiedBy = params.ModifiedBy;
      event.ModifiedOn = params.ModifiedOn;
      event.CountryCode = params.CountryCode;
      event.StateCode = params.StateCode;

      settableData([]);
      setTimeout(() => {
        settableData(dataevent);
      });
    } else {
      //add event

      AddEntity(params, LoginCode, token, navigate);

      let event = {
        PlaceCode: params.PlaceCode,
        ShortName: params.ShortName,
        PlaceTypeCode: params.PlaceTypeCode,
        ZoneCode: params.ZoneCode,
        IsActive: params.IsActive,
        AddedBy: params.AddedBy,
        AddedOn: params.AddedOn,
        ModifiedBy: params.ModifiedBy,
        ModifiedOn: params.ModifiedOn,
        CountryCode: params.CountryCode,
        StateCode: params.StateCode,
         
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
              <h2>Place Master</h2>
            </div>
            <div className="body">
              <div class="card">
                <div class="body">
                  <a
                    id="modal_view_right"
                    data-toggle="modal"
                    data-target="#information_modal"
                    class="btn btn-primary m-b-15"
                    type="button">
                    <i class="icon wb-plus" aria-hidden="true"></i> Add Place
                  </a>
                  <div class="table-responsive">
                    <table
                      class="table table-bordered table-hover table-striped"
                      cellspacing="0"
                      id="addrowExample">
                      <thead>
                        <tr>
                        
                          <th>PlaceType</th>
                          <th>Country</th>
                          <th>State</th>
                          <th>PlaceName</th>
                          <th>ShortName</th>
                          <th>ZoneName</th>
                          <th>Action</th>
            
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
                             
                              <td>{data.PlaceType}</td>
                              <td>{data.Country}</td>
                              <td>{data.state}</td>
                              <td>{data.PlaceName}</td>
                              <td>{data.ShortName}</td>
                              <td>{data.ZoneName}</td>
                          

                              <td class="actions">
                                <button
                                  type="button"
                                  class="btn btn-sm btn-icon btn-pure btn-default on-default button-remove"
                                  href="#largeModal"
                                  data-toggle="modal"
                                  data-target="#largeModal"
                                  id="addToTable"
                                  onClick={() => editDate(data, index)}>
                                  <i
                                    class="fa fa-pencil"
                                    aria-hidden="true"></i>
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
        aria-labelledby="myModalLabel2">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="title" id="largeModalLabel">
                {params.id ? "Edit Currency" : "Add Place"}
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

                <div class="form-holder">
                    <label class="form-row-inner">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter PlaceName"
                        id="PlaceName"
                        name="PlaceName"
                        defaultValue={params.PlaceName}
                        onChange={(e) => changeValue(e)}
                        required
                      />
                      {/* <span class="label">PlaceType</span> */}
                    </label>
                    <span> </span>

                    <label class="form-row-inner">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter ShortName"
                        id="ShortName"
                        name="ShortName"
                        defaultValue={params.ShortName}
                        onChange={(e) => changeValue(e)}
                        required
                      />
                      {/* <span class="label">PlaceType</span> */}
                    </label>
                    <span> </span>
                    <label class="form-row-inner">
                    <div>
                                    <select class="custom-select custom-select-sm">
                                        <option>Select Zone</option>
                                        <option defaultValue="1">NORTH</option>
                                        <option defaultValue="2">SOUTH</option>    
                                        <option defaultValue="3">EAST</option>
                                        <option defaultValue="4">WEST</option>                                     
                                    </select>
                                </div>
                     
                    </label>
                    <span> </span>

                    <label class="form-row-inner">
                    <div>
                                    <select class="custom-select custom-select-sm">
                                        <option>Select Country</option>
                                        <option defaultValue="1">India</option>
                                        <option defaultValue="2">Nepal</option>                                       
                                    </select>
                                </div>
                     
                    </label>
                            <spam> </spam>
                    <label class="form-row-inner">
                    <div>
                                    <select class="custom-select custom-select-sm">
                                        <option>Select State</option>
                                        <option defaultValue="1">STate1</option>
                                        <option defaultValue="2">State2</option>                                       
                                    </select>
                                </div>
                     
                    </label>

                      <span> </span>

                  </div>


                  {/* <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">PlaceType</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Select Place Type"
                      id="EntityName"
                      name="EntityName"
                      defaultValue={params.PlaceTypeCode}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>

         
        

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Country</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Select Country"
                      id="PermAddress"
                      name="PermAddress"
                      defaultValue={params.CountryCode}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">State</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Select State"
                      id="CorpAddress"
                      name="CorpAddress"
                      defaultValue={params.StateCode}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">PlaceName</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter PlaceName"
                      id="ContactPerson"
                      name="ContactPerson"
                      defaultValue={params.PlaceName}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">ShortName</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter ShortName"
                      id="Contact"
                      name="Contact"
                      defaultValue={params.ShortName}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">ZoneName</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter ZoneName"
                      id="PANNO"
                      name="PANNO"
                      defaultValue={params.ZoneName}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div> */}
                  {/* <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">CINNumber</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter CINNumber"
                      id="CINNumber"
                      name="CINNumber"
                      defaultValue={params.CINNumber}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div> */}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => saveEvent(params)}>
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
                }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceMaster;
