import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddEntity, getEntity } from "../Global";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ChannelParams } from "./model/masters";
import { showMessage } from "../GlobalFunction";
import { getChannel, getDesignation } from "./services/Admin";
import { DesignationParams } from "./model/masters";

const DesignationMaster = () => {
  const [tableData, settableData] = useState([]);
  const token = useSelector((state) => state.token);
  const LoginCode = useSelector((state) => state.LoginCode);
  useEffect(() => {
    getDesignation(token)
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

  const defaultParams = DesignationParams;
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
      event.DesignationCode = params.DesignationCode;
      event.DesignationName = params.DesignationName;
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

      // AddEntity(params, LoginCode, token, navigate);

      let event = {
        DesignationCode: params.DesignationCode,
        DesignationName: params.DesignationName,
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

    showMessage("Designation has been saved successfully.");
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
              <h2>Designation Master </h2>
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
                    <i class="icon wb-plus" aria-hidden="true"></i> Add
                    Designation
                  </a>
                  <div class="table-responsive">
                    <table
                      class="table table-bordered table-hover table-striped"
                      cellspacing="0"
                      id="addrowExample"
                    >
                      <thead>
                        <tr>
                          <th>Designation Name</th>
                          <th>Short Name</th>
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
                              <td>{data.DesignationName}</td>
                              <td>{data.ShortName}</td>

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
                {params.id ? "Edit Channel" : "Add Channel"}
              </h4>
            </div>
            <section>
              <div class="inner" style={{ padding: "5px" }}>
                <div class="form-row">
                  <div class="form-holder">
                    <label class="form-row-inner">
                      <input
                        type="text"
                        class="form-control"
                        id="DesignationName"
                        name="DesignationName"
                        defaultValue={params.DesignationName}
                        onChange={(e) => changeValue(e)}
                        required
                      />
                      <span class="label">Designation Name</span>
                    </label>
                  </div>

                  <div class="form-holder">
                    <label class="form-row-inner">
                      <input
                        type="text"
                        class="form-control"
                        id="ShortName"
                        name="ShortName"
                        defaultValue={params.ShortName}
                        onChange={(e) => changeValue(e)}
                        required
                      />
                      <span class="label">Short Name</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

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

export default DesignationMaster;
