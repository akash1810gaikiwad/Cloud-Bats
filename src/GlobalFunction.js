import Swal from "sweetalert2";



function showMessage (msg = "", type = "", navigate, route) {
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

  export {
     showMessage
  };