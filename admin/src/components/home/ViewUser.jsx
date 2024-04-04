import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { getUser } from "../../helper/helper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import toast, { Toaster } from "react-hot-toast";
import "./ViewUser.css"; // Import CSS file for custom scrollbar style
import LikedProfilesComponent from "./LikedProfile";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: "none", // To ensure there's no maximum width constraint
  },
}));

function ViewUser(props) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState("one");

  const handleClose = () => {
    setOpen(false);
  };
                                                                                                 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(id);
        setUser(userData);
        setUpdatedUser(userData); // Set initial state for updatedUser
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);  
  const handleBack = () => {
    navigate("/usermanagement");
  };

  const handleEdit = () => {
    setOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`/api/update/${id}`, updatedUser);
      setOpen(false);
      setUser(updatedUser);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
    }
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
            <Button variant="contained" color="success" onClick={handleBack}>
              Back
            </Button>
            <Toaster />
            {/* User Data */}
            {user && (
              <div className="user-container">
                <div
                  className="card mb-3 "
                  style={{
                    boxShadow:
                      " rgba(50, 50, 93, 0.25) 0px 30px 50px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 26px -18px inset",
                  }}
                >
                  <div className="card-body" style={{ padding: "20px" }}>
                    <img
                      style={{ width: "50px", borderRadius: "50%" }}
                      src={user.photoUpload[0]}
                      alt=""
                    />
                    <FaRegEdit
                      onClick={handleEdit}
                      style={{
                        cursor: "pointer",
                        color: "blue",
                        marginLeft: "900px",
                      }}
                    />
                    <h5 className="card-title" style={{ marginTop: "10px" }}>
                      {`${user.firstName} ${user.lastName}`}
                    </h5>

                    <div className="row">
                      {open ? (
                        <div>
                          <React.Fragment>
                            <BootstrapDialog
                              onClose={handleClose}
                              aria-labelledby="customized-dialog-title"
                              open={open}
                            >
                              <DialogTitle
                                sx={{ m: 0, p: 2 }}
                                id="customized-dialog-title"
                                style={{
                                  boxShadow:
                                    " rgba(50, 50, 93, 0.25) 0px 30px 50px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 26px -18px inset",
                                }}
                              >
                                User Edit
                              </DialogTitle>
                              <IconButton
                                aria-label="close"
                                onClick={handleClose}
                                sx={{
                                  position: "absolute",
                                  right: 8,
                                  top: 8,
                                  color: (theme) => theme.palette.grey[500],
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                              <DialogContent dividers>
                                <Typography gutterBottom>
                                  <div className="row">
                                    <div
                                      className="col-4 "
                                      style={{ paddingLeft: "30px" }}
                                    >
                                      <p className="card-text">
                                        <strong>Email:</strong>
                                        <input
                                          type="text"
                                          name="email"
                                          value={updatedUser.email}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Gender:</strong>
                                        <input
                                          type="text"
                                          name="gender"
                                          value={updatedUser.gender}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Mobile Number:</strong>
                                        {user.number}
                                      </p>
                                      <p className="card-text">
                                        <strong>Relationship Status:</strong>{" "}
                                        <input
                                          type="text"
                                          name="relationshipStatus"
                                          value={updatedUser.relationshipStatus}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Smoking Habbit:</strong>{" "}
                                        <input
                                          type="text"
                                          name="smokingHabbit"
                                          value={updatedUser.smokingHabbit}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Drinking Habbit:</strong>
                                        <input
                                          type="text"
                                          name="drinkingHabbit"
                                          value={updatedUser.drinkingHabbit}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>

                                      <p className="card-text">
                                        <strong>Company Name:</strong>
                                        <input
                                          type="text"
                                          name="companyName"
                                          value={updatedUser.companyName}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Job Title:</strong>
                                        <input
                                          type="text"
                                          name="jobTitle"
                                          value={updatedUser.jobTitle}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>State:</strong>
                                        <input
                                          type="text"
                                          name="state"
                                          value={updatedUser.state}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Postal Code:</strong>
                                        <input
                                          type="text"
                                          name="postalCode"
                                          value={updatedUser.postalCode}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                    </div>
                                    <div
                                      className="col-4"
                                      style={{ paddingLeft: "20px" }}
                                    >
                                      {/* Column 2 */}
                                      <p className="card-text">
                                        <strong>Nick Name:</strong>
                                        <input
                                          type="text"
                                          name="nickName"
                                          value={updatedUser.nickName}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Date of Birth:</strong>
                                        <input
                                          type="text"
                                          name="dateOfBirth"
                                          value={updatedUser.dateOfBirth}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Education:</strong>
                                        <input
                                          type="text"
                                          name="education"
                                          value={updatedUser.education}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Describe Yourself:</strong>{" "}
                                        <input
                                          type="text"
                                          name="describeYourself"
                                          value={updatedUser.describeYourself}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Language:</strong>
                                        <input
                                          type="text"
                                          name="language"
                                          value={updatedUser.language}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Work Email:</strong>
                                        <input
                                          type="text"
                                          name="workEmail"
                                          value={updatedUser.workEmail}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Work Address:</strong>
                                        <input
                                          type="text"
                                          name="workAddress"
                                          value={updatedUser.workAddress}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Your Interest:</strong>
                                        <input
                                          type="text"
                                          name="yourInterest"
                                          value={updatedUser.yourInterest}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Country:</strong>
                                        <input
                                          type="text"
                                          name="country"
                                          value={updatedUser.country}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                    </div>
                                    <div
                                      className="col-4"
                                      style={{ paddingLeft: "30px" }}
                                    >
                                      {/* Column 3 */}
                                      <p className="card-text">
                                        <strong>Height:</strong>
                                        <input
                                          type="text"
                                          name="height"
                                          value={updatedUser.height}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Religion:</strong>
                                        <input
                                          type="text"
                                          name="Relation"
                                          value={updatedUser.religion}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>School Name:</strong>
                                        <input
                                          type="text"
                                          name="schoolName"
                                          value={updatedUser.schoolName}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Graduation Year:</strong>
                                        <input
                                          type="text"
                                          name="graduationYear"
                                          value={updatedUser.graduationYear}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Course Name:</strong>
                                        <input
                                          type="text"
                                          name="courseName"
                                          value={updatedUser.courseName}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>House No:</strong>
                                        <input
                                          type="text"
                                          name="houseNo"
                                          value={updatedUser.houseNo}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Street Name:</strong>
                                        <input
                                          type="text"
                                          name="streetName"
                                          value={updatedUser.streetName}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>City:</strong>
                                        <input
                                          type="text"
                                          name="city"
                                          value={updatedUser.city}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>

                                      <p className="card-text">
                                        <strong>Experience:</strong>
                                        <input
                                          type="text"
                                          name="experience"
                                          value={updatedUser.experience}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                      <p className="card-text">
                                        <strong>Field of Study:</strong>
                                        <input
                                          type="text"
                                          name="fieldOfStudy"
                                          value={updatedUser.fieldOfStudy}
                                          onChange={handleInputChange}
                                          className="input-box"
                                        />
                                      </p>
                                    </div>
                                  </div>
                                </Typography>
                              </DialogContent>
                              <DialogActions>
                                <Button autoFocus onClick={handleUpdateUser}>
                                  Save changes
                                </Button>
                              </DialogActions>
                            </BootstrapDialog>
                          </React.Fragment>
                          {/* <Button type="submit">Save</Button>
                          <Button onClick={handleCancelEdit}>Cancel</Button> */}
                        </div>
                      ) : (
                        <div className="row">
                          <div className="col-4">
                            <p className="card-text">
                              <strong>Email:</strong> {user.email}
                            </p>
                            <p className="card-text">
                              <strong>Gender:</strong> {user.gender}
                            </p>
                            <p className="card-text">
                              <strong>Mobile Number:</strong> {user.number}
                            </p>
                            <p className="card-text">
                              <strong>Relationship Status:</strong>{" "}
                              {user.relationshipStatus}
                            </p>
                            <p className="card-text">
                              <strong>Smoking Habbit:</strong>{" "}
                              {user.smokingHabbit}
                            </p>
                            <p className="card-text">
                              <strong>Drinking Habbit:</strong>{" "}
                              {user.drinkingHabbit}
                            </p>

                            <p className="card-text">
                              <strong>Company Name:</strong> {user.companyName}
                            </p>
                            <p className="card-text">
                              <strong>Job Title:</strong> {user.jobTitle}
                            </p>
                            <p className="card-text">
                              <strong>State:</strong> {user.state}
                            </p>
                            <p className="card-text">
                              <strong>Postal Code:</strong> {user.postalCode}
                            </p>
                          </div>
                          <div className="col-4">
                            {/* Column 2 */}
                            <p className="card-text">
                              <strong>Nick Name:</strong> {user.nickName}
                            </p>
                            <p className="card-text">
                              <strong>Date of Birth:</strong> {user.dateOfBirth}
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
                              <strong>Work Email:</strong> {user.workEmail}
                            </p>
                            <p className="card-text">
                              <strong>Work Address:</strong> {user.workAddress}
                            </p>
                            <p className="card-text">
                              <strong>Your Interest:</strong>{" "}
                              {user.yourInterest}
                            </p>
                            <p className="card-text">
                              <strong>Country:</strong> {user.country}
                            </p>
                          </div>
                          <div className="col-4">
                            {/* Column 3 */}
                            <p className="card-text">
                              <strong>Height:</strong> {user.height}
                            </p>
                            <p className="card-text">
                              <strong>Religion:</strong> {user.religion}
                            </p>
                            <p className="card-text">
                              <strong>School Name:</strong> {user.schoolName}
                            </p>
                            <p className="card-text">
                              <strong>Graduation Year:</strong>{" "}
                              {user.graduationYear}
                            </p>
                            <p className="card-text">
                              <strong>Course Name:</strong> {user.courseName}
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
                              <strong>Experience:</strong> {user.experience}
                            </p>
                            <p className="card-text">
                              <strong>Field of Study:</strong>{" "}
                              {user.fieldOfStudy}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {user && (
              <div
                className=" "
                style={{
                  overflowY: "auto",
                  width: "100%",
                  height: "250px",
                  paddingTop:"3px",
                 
                }}
              >
                <div className="card mb-3" style={{}}>
                  <div className="card-body" style={{ padding: "20px" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs        
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                      >
                        <Tab value="one" label="Like Profile" />
                        <Tab value="two" label="Fevorite Profile" />
                      </Tabs>
                    </Box>
                    {value === "one" && (
                      <div className=" ">
                        <LikedProfilesComponent/>
                        </div>
                    )}
                    {value === "two" && (
                      <div className="justify-center m-5">Fevorite Profile</div>
                    )}
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
