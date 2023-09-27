import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddEntity, getEntity } from "../Global";
import { showMessage } from "../GlobalFunction";
import { EntityParams } from "./model/masters"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EntityMaster = () => {
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


const defaultParams = EntityParams;
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
      event.CurrencyName = params.CurrencyName;
      event.CurrencySymbol = params.CurrencySymbol;
      event.Currency_image = params.Currency_image;
      event.ShortName = params.ShortName;

      settableData([]);
      setTimeout(() => {
        settableData(dataevent);
      });
    } else {
      //add event

      AddEntity(params, LoginCode, token, navigate);

      let event = {
        EntityId: params.EntityId,
        EntityName: params.EntityName,
        PermAddress: params.PermAddress,
        CorpAddress: params.CorpAddress,
        ContactPerson: params.ContactPerson,
        Contact: params.Contact,
        IsActive: params.IsActive,
        PANNO: params.PANNO,
        CINNumber: params.CINNumber,
      };
      let dataevent = tableData || [];
      dataevent = dataevent.concat([event]);
      setTimeout(() => {
        settableData(dataevent);
      });
    }

    //showMessage("Event has been saved successfully.");
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
              <h2>Entity Master </h2>
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
                    <i class="icon wb-plus" aria-hidden="true"></i> Add Entity
                  </a>
                  <div class="table-responsive">
                    <table
                      class="table table-bordered table-hover table-striped"
                      cellspacing="0"
                      id="addrowExample">
                      <thead>
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
                              <td>{data.EntityName}</td>
                              <td>{data.PermAddress}</td>
                              <td>{data.ContactPerson}</td>
                              <td>{data.Contact}</td>
                              <td>{data.IsActive}</td>
                              <td>{data.PANNO}</td>
                              <td>{data.CINNumber}</td>

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
                      <span class="input-group-text">Entity Name</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Entity Name"
                      id="EntityName"
                      name="EntityName"
                      defaultValue={params.EntityName}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Address</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter PermAddress"
                      id="PermAddress"
                      name="PermAddress"
                      defaultValue={params.PermAddress}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Corp Address</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter CorpAddress"
                      id="CorpAddress"
                      name="CorpAddress"
                      defaultValue={params.CorpAddress}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Contact Person</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter ContactPerson"
                      id="ContactPerson"
                      name="ContactPerson"
                      defaultValue={params.ContactPerson}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Contact</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Contact"
                      id="Contact"
                      name="Contact"
                      defaultValue={params.Contact}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">PANNO</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter PANNO"
                      id="PANNO"
                      name="PANNO"
                      defaultValue={params.PANNO}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
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
                  </div>
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

export default EntityMaster;
