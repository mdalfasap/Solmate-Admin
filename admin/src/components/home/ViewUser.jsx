import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { Button } from "react-bootstrap";

function ViewUser(props) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/getUser/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleBack = () => {
    navigate("/usermanagement");
  };
  const update = () => {
    navigate("/update"); // Pass row data to showUpdate function
  };
  return (
    <div>
      <div
        className="container-fluid"
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
            <Button variant="contained" color="success"onClick={handleBack} >
              Back
            </Button>

            {/* User Data */}
            {user && (
              <div
                style={{
                  overflowY: "auto",
                  marginTop: "-15px",
                  width: "700px",
                  height: "470px",
                  marginLeft: "150px",
                }}
              >
                <div
                  className="card mb-3"
                  style={{
                    borderRadius: "20px",
                    boxShadow:
                      " rgba(50, 50, 93, 0.25) 0px 30px 50px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 26px -18px inset", // Add border radius for rounded corners
                  }}
                >
                  <FaRegEdit
                    onClick={() => update()}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      marginLeft: "650px",
                      marginTop: "20px",
                    }}
                  />
                  <div className="card-body" style={{ padding: "20px" }}>
                    <img
                      style={{ width: "50px", borderRadius: "50%" }}
                      src={user.photoUpload[0]}
                      alt=""
                    />
                    <h5
                      className="card-title"
                      style={{ marginTop: "10px" }}
                    >{`${user.firstName} ${user.lastName}`}</h5>
                    {/* User Information */}
                    <div className="user-info">
                      <p className="card-text">
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p className="card-text">
                        <strong>Gender:</strong> {user.gender}
                      </p>
                      <p className="card-text">
                        <strong>Nick Name:</strong> {user.nickName}
                      </p>
                      <p className="card-text">
                        <strong>Date of Birth:</strong> {user.dateOfBirth}
                      </p>
                      <p className="card-text">
                        <strong>Height:</strong> {user.height}
                      </p>
                      <p className="card-text">
                        <strong>Religion:</strong> {user.religion}
                      </p>
                      <p className="card-text">
                        <strong>Relationship Status:</strong>{" "}
                        {user.relationshipStatus}
                      </p>
                      <p className="card-text">
                        <strong>Smoking Habbit:</strong> {user.smokingHabbit}
                      </p>
                      <p className="card-text">
                        <strong>Drinking Habbit:</strong> {user.drinkingHabbit}
                      </p>
                      <p className="card-text">
                        <strong>Education:</strong> {user.education}
                      </p>
                      <p className="card-text">
                        <strong>Describe Yourself:</strong>{" "}
                        {user.describeYourself}
                      </p>
                      <p className="card-text">
                        <strong>Language:</strong> {user.language}
                      </p>
                      <p className="card-text">
                        <strong>School Name:</strong> {user.schoolName}
                      </p>
                      <p className="card-text">
                        <strong>Graduation Year:</strong> {user.graduationYear}
                      </p>
                      <p className="card-text">
                        <strong>Course Name:</strong> {user.courseName}
                      </p>
                      <p className="card-text">
                        <strong>Field of Study:</strong> {user.fieldOfStudy}
                      </p>
                      <p className="card-text">
                        <strong>Company Name:</strong> {user.companyName}
                      </p>
                      <p className="card-text">
                        <strong>Job Title:</strong> {user.jobTitle}
                      </p>
                      <p className="card-text">
                        <strong>Work Email:</strong> {user.workEmail}
                      </p>
                      <p className="card-text">
                        <strong>Work Address:</strong> {user.workAddress}
                      </p>
                      <p className="card-text">
                        <strong>Your Interest:</strong> {user.yourInterest}
                      </p>
                      <p className="card-text">
                        <strong>House No:</strong> {user.houseNo}
                      </p>
                      <p className="card-text">
                        <strong>Street Name:</strong> {user.streetName}
                      </p>
                      <p className="card-text">
                        <strong>City:</strong> {user.city}
                      </p>
                      <p className="card-text">
                        <strong>State:</strong> {user.state}
                      </p>
                      <p className="card-text">
                        <strong>Postal Code:</strong> {user.postalCode}
                      </p>
                      <p className="card-text">
                        <strong>Country:</strong> {user.country}
                      </p>
                      <p className="card-text">
                        <strong>Interested In:</strong> {user.interestedIn}
                      </p>
                      <p className="card-text">
                        <strong>Experience:</strong> {user.experience}
                      </p>
                      <p className="card-text">
                        <strong>Blocked:</strong> {user.blocked}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
