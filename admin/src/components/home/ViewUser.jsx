import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../helper/helper";

function ViewUser() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUserData = await fetchUserData();
        
        setUserData(fetchedUserData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBack = () => {
    navigate("/usermanagement"); // Navigate to the user management page
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
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3">Loading...</td>
                  </tr>
                ) : (
                  userData.map((user) => (
                    
                    <tr key={user.id}>
                       <img  style={{ width: "37px", borderRadius: "50%" }}src={user.photoUpload} alt="" />
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.email}</td>
                      <td>{user.schoolName}</td>
                      <td>{user.religion}</td>
                      <td>{user.education}</td>
                      <td>{user.language}</td>
                      <td>{user.graduationYear}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewUser;
