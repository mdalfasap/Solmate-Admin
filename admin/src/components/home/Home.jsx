import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import UserManagement from "./userManagement/UserManagement";
import Sidebar from "./Sidebar";
import Update from "./Update";
import { fetchUserData, submitDetails } from "../../helper/helper";
import ViewUser from "./ViewUser";
import Navbar from "./Navbar";

function home() {
  const [userData, setUserData] = useState({});
  const [pendingData, setPendingData] = useState([]);
  const navigate = useNavigate();
  const [id, setId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        setUserData(userData);
        console.log(userData);
      } catch (error) {
        console.error("Error in UserProfile:", error);
      }
    };
    fetchData();
  }, []);
  const [updateUser, setUpdateUser] = useState();
  const [viewUser, setViewUser] = useState();
  const [deleteUser, setDeleteUser] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else if (token) {
      const tokenData = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = tokenData.exp * 1000;

      if (Date.now() >= expirationTime) {
        console.log("Token expired. Removing token.");
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  const done = () => {
    setDeleteUser(false);
  };

  const blockUser = async () => {
    try {
   
      const updatedUserData = [...userData];
 
      const userIndex = updatedUserData.findIndex((user) => user._id === id);

      updatedUserData[userIndex].blocked = !updatedUserData[userIndex].blocked;

      setUserData(updatedUserData);

      await submitDetails(id, updatedUserData[userIndex]);

      window.location.reload();
    } catch (error) {
      console.error("Error blocking user:", error);
      // Handle error, if any
    }
  };

  const showUpdate = () => {
    setUpdateUser(true);
  };
  const showView = () => {
    setViewUser(true);
  };
  const showDelete = (row) => {
    setDeleteUser(true);
    setId(row);
  };
  return (
    <>
      <div
        className="container-fluid "
        style={{
          height: "100vh",
          backgroundColor: "#36454F",
          overflow: "hidden",
        }}
      >
        <div className=" row  ">
          <Navbar />
          <div className="col-2 p-4 text-white">
            <Sidebar />
          </div>{" "}
          <div
            className="col-10 "
            style={{ backgroundColor: "#D3D3D3", height: "90vh" }}
          >
            {updateUser && <Update />} {viewUser && <ViewUser />}
            <Modal show={deleteUser} centered>
              <Modal.Title style={{ paddingLeft: "110px", paddingTop: "20px" }}>
                Block User Confirmation
              </Modal.Title>

              <Modal.Body
                style={{
                  paddingLeft: "110px",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                }}
              >
                {" "}
                Are you sure you want to Block User ?{" "}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={done}>
                  No
                </Button>
                <Button variant="danger" onClick={blockUser}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>
            <UserManagement
              showUpdate={showUpdate}
              showView={showView}
              showDelete={showDelete}
            />{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}

export default home;
