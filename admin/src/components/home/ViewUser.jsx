import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function ViewUser(props) {
  const [users, setUsers] = useState([]);
 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = props.userId; 
        const response = await axios.get(`http://localhost:8081/api/getUser/${userId}`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [props.userId]);
  const handleBack = () => {
    navigate("/usermanagement"); // Navigate to the user management page
  };
 

  return (
    <div>
      <div
        className="container-fluid "
        style={{
          height: "100vh",
          backgroundColor: "#36454F",
          overflow: "hidden",
        }}
      >
        <div className="row">
          <Navbar />
          <div className="col-2 p-4 text-white">
            <Sidebar />
          </div>
          <div
            className="col-10"
            style={{
              backgroundColor: "#D3D3D3",
              height: "90vh",
              padding: "20px",
            }}
          >
            {/* Back Button */}
            <button className="btn btn-primary mb-3" onClick={handleBack}>
              Back
            </button>

            {/* Table */}
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
