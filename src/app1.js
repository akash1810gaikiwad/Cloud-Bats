import React from "react";
import Sidebar from "./layouts/Sidebar";
import Main from "./pages/main";
import Nav from "./layouts/Nav";

function App() {
  return (

 <div id="wrapper" className="theme-cyan">


<div className="page-loader-wrapper">
    <div className="loader">
        <div className="m-t-30"><img src="assets/images/logo-icon.svg" width="48" height="48" alt="Iconic"/></div>
        <p>Please wait...</p>
    </div>
</div>


<Nav/>


            
   
   <Sidebar/>       
    



<Main/>

</div>
 
  );
}

export default App;
