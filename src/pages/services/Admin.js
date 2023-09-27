import axios from "axios";
import qs from "qs";

import Swal from "sweetalert2";
import { setToken, setLoginCode } from "./redux/authSlice";
import{ showMessage } from "../../GlobalFunction"

const apiurl = process.env.APIURL

function getCurrency(token) {
    return new Promise((resolve, reject) => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: apiurl +  "currencymaster",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      axios
        .request(config)
        .then((response) => {
          const responseData = response.data;
          resolve(responseData);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }
  
  function AddCurrency(params, LoginCode, token, navigate, selectedFileName) {
    console.log(selectedFileName);
    if (!params.CurrencyName) {
      return;
    }
    if (!params.CurrencySymbol) {
      return;
    }
    if (!params.ShortName) {
      return;
    }
    let data = JSON.stringify({
      CurrencyName: params.CurrencyName,
      Currency_image: selectedFileName,
      CurrencySymbol: params.CurrencySymbol,
      ShortName: params.ShortName,
      AddedBy: LoginCode,
    });
  
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: apiurl +  "currencymaster/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
  
    axios
      .request(config)
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          showMessage("Data Added Successfully", "success", navigate, "");
        } else {
          showMessage("Something went Wrong...", "error", navigate, "");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    var formdata = new FormData();
    formdata.append("file", params.Currency_image, "params.Currency_image");
  
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
  
    fetch("http://localhost:3000/upload", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }