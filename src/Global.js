import axios from "axios";
import qs from "qs";

import Swal from "sweetalert2";
import { setToken, setLoginCode } from "./redux/authSlice";

const  showMessage = (msg = "", type = "", navigate, route) => {
  Swal.fire({
    icon: type,
    title: msg,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000, // Hide after 1.20 seconds
    // }).then(() => { if(type==='success'){navigate('/dashboard');}
  }).then(() => {
    if (type === "success") {
      navigate(route);
    }
  });
};

function LoginApi(dispatch, navigate, params) {
  let config2 = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.ipify.org/?format=json",
    headers: {},
  };

  axios
    .request(config2)
    .then((response) => {
      console.log(response.data.ip);
      let data = qs.stringify({
        username: params.email,
        password: params.password,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://103.14.97.155:3000/login",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.access_token) {
            showMessage(
              "User Login Successfully...",
              "success",
              navigate,
              "/dashboard"
            );
            // localStorage.setItem("test", response.data.access_token);
            dispatch(setToken(response.data.access_token));
            dispatch(setLoginCode(response.data.LoginCode));
          }
        })
        .catch((error) => {
          showMessage(
            "User Details Not Found Please Check Again",
            "error",
            navigate,
            ""
          );
          //dispatch(clearToken());
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

function Module(token) {
  return new Promise((resolve, reject) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://103.14.97.155:3000/modulemaster",
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

function SubModule(token) {
  return new Promise((resolve, reject) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://103.14.97.155:3000/submodulemaster",
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

function getCurrency(token) {
  return new Promise((resolve, reject) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://103.14.97.155:3000/currencymaster",
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
    url: "http://103.14.97.155:3000/currencymaster/",
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

function getEntity(token) {
  return new Promise((resolve, reject) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://103.14.97.155:3000/Entitymaster/",
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

function AddEntity(params, LoginCode, token, navigate) {
  if (!params.CurrencyName) {
    return;
  }
  if (!params.Currency_image) {
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
    Currency_image: params.Currency_image,
    CurrencySymbol: params.CurrencySymbol,
    ShortName: params.ShortName,
    AddedBy: LoginCode,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://103.14.97.155:3000/Entitymaster/",
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
}

function getLocation(token) {
  return new Promise((resolve, reject) => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://103.14.97.155:3000/locationmaster/",
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
function AddLocation(params, LoginCode, token, navigate) {
  if (!params.CurrencyName) {
    return;
  }
  if (!params.Currency_image) {
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
    Currency_image: params.Currency_image,
    CurrencySymbol: params.CurrencySymbol,
    ShortName: params.ShortName,
    AddedBy: LoginCode,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://103.14.97.155:3000/locationmaster/",
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
}
export {
  LoginApi,
  getCurrency,
  AddCurrency,
  getEntity,
  AddEntity,
  getLocation,
  AddLocation,
  Module,
  SubModule,
  showMessage
};
