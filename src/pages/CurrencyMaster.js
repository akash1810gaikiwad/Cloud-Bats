import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddCurrency, getCurrency } from "../Global";
import {  showMessage } from "../GlobalFunction";
import{CurrencyParams} from "./model/masters"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CurrencyMaster = () => {
  const [tableData, settableData] = useState([]);
  const token = useSelector((state) => state.token);
  const LoginCode = useSelector((state) => state.LoginCode);
  useEffect(() => {
    getCurrency(token)
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

  
  const defaultParams = CurrencyParams
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

      AddCurrency(params, LoginCode, token, navigate, selectedFileName);

      let event = {
        CurrencyName: params.CurrencyName,
        CurrencySymbol: params.CurrencySymbol,
        Currency_image: params.Currency_image,
        ShortName: params.ShortName,
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

  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const fileName = event.target.files[0].name;
      setSelectedFileName(fileName);
    }
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
              <h2>Currency Master </h2>
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
                    <i class="icon wb-plus" aria-hidden="true"></i> Add Currency
                  </a>
                  <div class="table-responsive">
                    <table
                      class="table table-bordered table-hover table-striped"
                      cellspacing="0"
                      id="addrowExample">
                      <thead>
                        <tr>
                          <th>Currency Name</th>
                          <th>Currency Symbol</th>
                          <th>Currency image</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>Currency Name</th>
                          <th>Currency Symbol</th>
                          <th>Currency image</th>
                          <th>Actions</th>
                        </tr>
                      </tfoot>
                      {tableData.map((data, index) => {
                        return (
                          <tbody key={index}>
                            <tr class="gradeA">
                              <td>{data.CurrencyName}</td>
                              <td>{data.CurrencySymbol}</td>
                              <td>{data.Currency_image}</td>
                              <td>
                                <img
                                  src={
                                    "assets/upload/" + data.Currency_image + ""
                                  }
                                  class="rounded-circle avatar"
                                  alt=""
                                />
                              </td>
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
                <section>
                  <div class="inner" style={{ padding: "5px" }}>
                    <div class="form-row">
                      <div class="form-holder">
                        <label class="form-row-inner">
                          <input
                            type="text"
                            class="form-control"
                            id="CurrencyName"
                            name="CurrencyName"
                            defaultValue={params.CurrencyName}
                            onChange={(e) => changeValue(e)}
                            required
                          />
                          <span class="label">Currency Name</span>
                        </label>
                      </div>
                      <div class="form-holder">
                        <label class="form-row-inner">
                          <input
                            type="text"
                            class="form-control"
                            id="CurrencySymbol"
                            name="CurrencySymbol"
                            defaultValue={params.CurrencySymbol}
                            onChange={(e) => changeValue(e)}
                            required
                          />
                          <span class="label">Currency Symbol</span>
                        </label>
                      </div>
                      <div class="form-holder">
                        <label class="form-row-inner">
                          <input
                            type="file"
                            class="form-control"
                            id="Currency_image"
                            name="Currency_image"
                            defaultValue={params.Currency_image}
                            onChange={handleFileChange}
                            required
                          />
                          <span class="label">Currency Image</span>
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
                          <span class="label">Short Code</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            {/* <div className="modal-body">
              <div class="card">
                <div class="body">
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">@</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter CurrencyName"
                      id="CurrencyName"
                      name="CurrencyName"
                      defaultValue={params.CurrencyName}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>

                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">$</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Currency Symbol"
                      id="CurrencySymbol"
                      name="CurrencySymbol"
                      defaultValue={params.CurrencySymbol}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">$</span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Currency image"
                      id="Currency_image"
                      name="Currency_image"
                      defaultValue={params.Currency_image}
                      onChange={(e) => changeValue(e)}
                      required
                    />
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Short Code</span>
                    </div>
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
                  </div>
                </div>
              </div>
            </div> */}
            <div
              className="modal-footer"
              style={{ justifyContent: "flex-start" }}>
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

export default CurrencyMaster;
