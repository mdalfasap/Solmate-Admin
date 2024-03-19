import React, { useEffect, useState } from "react";
import MenuListComposition from "./Dropdown";

function Navbar() {

  return (
    <>
         <div className="col-2  ps-5 pt-2">
      <img src="src\assets\logo.png" alt="" style={{ width: '5vw' }} />
    </div>
    <div className="col-10 d-flex justify-content-end">
 <span className="ms-3 me-3 text-light"> 
 <MenuListComposition/>
 </span>
    </div>
    </>
  )
}

export default Navbar
