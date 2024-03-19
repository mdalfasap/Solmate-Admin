
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { fetchAdminData } from "../../../helper/helper";

function Dashboard() {
    const navigate = useNavigate();

    // const [logout,setLogout]=useState(false)
    const token = localStorage.getItem("token")

    useEffect(() => {
      if (!token) {
        navigate("/");
      }
    }, [token]);
  

    const logoutAction=()=>{
      localStorage.removeItem('token')
      navigate('/')
    }
    const cancelLogout = () => {
      setLogout(false);
    };
  
  return (
    <>
    <div className="container-fluid " style={{ height: "100vh",backgroundColor:'#36454F',overflow:'hidden' }}>
 <div className=" row  ">
 <Navbar />
          <div className="col-2 p-4 text-white">
            <Sidebar />
          </div>
<div className="col-10 " style={{backgroundColor:'#D3D3D3',height:'90vh'}}>
{/* {logout ?
(<div className="popup">
 <p>Are you sure you want to logout?</p>
 <button className="btn btn-danger w-25" onClick={logoutAction}>OK</button><br/>
 <button className="btn btn-warning mt-3 w-25"  onClick={cancelLogout}>Cancel</button>
</div>)
:
( */}
<>Dashboard</>
 {/* )} */}




</div>
   </div>

 </div>
</>
  )
}

export default Dashboard