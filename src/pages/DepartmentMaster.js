import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddEntity, getEntity } from "../Global";
import { showMessage } from "../GlobalFunction";
import { DepartmentParams, EntityParams, ZoneParams } from "./model/masters"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DepartmentMaster = () => {
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


const defaultParams = DepartmentParams;
  const [params, setParams] = useState(defaultParams);

  const [isAddEventModal, setIsAddEventModal] = useState(false);

  const addEvent = (data = null) => {
    setIsAddEventModal(true);
  };
  const delDate = (data = null) => {
    const filteredData = tableData.filter(
      (item) => item.DepartmentCode !== data.DepartmentCode
    );
    settableData(filteredData);
  };

  const editDate = (data) => {
    let params = JSON.parse(JSON.stringify(defaultParams));
    setParams(params);
    if (data) {
      let obj = JSON.parse(JSON.stringify(data));

      setParams({
        id: obj.DepartmentCode ? obj.DepartmentCode : null,
        DepartmentName: obj.DepartmentName ? obj.DepartmentName : null,
        ShortName: obj.ShortName ? obj.ShortName : null,
        IsActive: obj.IsActive ? obj.IsActive : null,
        AddedBy: obj.AddedBy ? obj.AddedBy : null,
        AddedOn: obj.AddedOn ? obj.AddedOn : null,

    
      });
    }
    addEvent(data);
  };
  const saveEvent = (params) => {
    if (!params.id === null) {
      //update event
      let dataevent = tableData || [];
      let event = dataevent.find((d) => d.id === parseInt(params.id));
      event.DepartmentName = params.DepartmentName;
      event.ShortName = params.ShortName;    
      event.IsActive = params.IsActive;
      event.AddedBy = params.AddedBy;   
      event.AddedOn = params.AddedOn;
      

      settableData([]);
      setTimeout(() => {
        settableData(dataevent);
      });
    } else {
      //add event

      AddEntity(params, LoginCode, token, navigate);

      let event = {
        DepartmentCode: params.DepartmentCode,
        DepartmentName: params.DepartmentName,
        ShortName: params.ShortName,
        IsActive: params.IsActive,
        AddedBy: params.AddedBy,
        AddedOn: params.AddedOn,
        
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
              <h2>Department Master </h2>
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
                    <i class="icon wb-plus" aria-hidden="true"></i> Add Department
                  </a>
                  <div class="table-responsive">
                    <table
                      class="table table-bordered table-hover table-striped"
                      cellspacing="0"
                      id="addrowExample">
                      <thead>
                        <tr>
                          <th>DepartmentName</th>
                          <th>ShortName</th>                      
                        </tr>
                      </thead>
                     
                      {tableData.map((data, index) => {
                        return (
                          <tbody key={index}>
                            <tr class="gradeA">
                              <td>{data.DepartmentName}</td>
                              <td>{data.ShortName}</td>
                             

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
                {params.id ? "Edit Department" : "Add Department"}
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
                  
                  <label class="form-row-inner">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Department Name"
                        id="DepartmentName"
                        name="DepartmentName"
                        defaultValue={params.DepartmentName}
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

export default DepartmentMaster;
