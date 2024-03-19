import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import toast, { Toaster } from "react-hot-toast";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { createPlan } from "../../../helper/helper";
// Import the uploadFileToS3 function

export default function AddPremium(props) {
  const [image, setImage] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [plans, setPlans] = React.useState([]);
  const [price, setPrice] = React.useState("");
  const [selectedPeriod, setSelectedPeriod] = React.useState("monthly");
  const [title, setTitle] = React.useState("");
  const [limit, setLimit] = React.useState("");
  const inputRef = React.useRef();
  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append Features
    plans.forEach((plan, index) => {
      formData.append(`Features[${index}][title]`, plan.title);
      formData.append(`Features[${index}][limit]`, plan.limit);
      formData.append(`Features[${index}][icon]`, plan.icon);
    });

    formData.append("Period", selectedPeriod);
    formData.append("Price", price);
    formData.append("Type", "Premium");
    // Append selected file if exists
    console.log(image, "selectedFileselectedFileselectedFileselectedFile");
    formData.append("icon", image);

    try {
      await createPlan(formData);
      toast.loading(<b>Creating plan...</b>, {
        duration: 2000,
      });
      setTimeout(() => {
        props.done();
        setPlans([]);
        setPrice("");
        setSelectedPeriod("monthly");
      }, 2000);
    } catch (error) {
      toast.error(
        <b>{error.response?.data.error || "Something went wrong"}</b>
      );
    }
  };

  const handleBack = () => {
    props.done(false);
  };

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  //   console.log(event.target,'fgheirdfsaklheriu')
  // };
  const onSelectFile = (event) => {
    setSelectedFile(event.target.files[0]);

    // const reader = new FileReader();
    // reader.readAsDataURL();
    // reader.addEventListener("load", () => {
      setImage(event.target.files[0]);
      console.log(image);
    // });
  };

  const handleClose = () => {
    props.done(false);
  };

  const storeToLocal = (event) => {
    event.preventDefault();

    if (!title || !limit || !selectedFile) {
      toast.error("All fields are required");
      return;
    }

    const newPlan = {
      title,
      limit,
      icon: URL.createObjectURL(selectedFile),
    };

    setPlans([...plans, newPlan]);
    setTitle("");
    setLimit("");
    setSelectedFile("");
  };

  const deleteFeature = (index) => {
    const updatedPlans = [...plans];
    updatedPlans.splice(index, 1);
    setPlans(updatedPlans);
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ margin: 0, padding: 0 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "auto",
              backgroundColor: "#B2BEB5",
              width: "100%",
              position: "relative",
            }}
          >
            <Toaster />
            <button
              onClick={handleBack}
              style={{
                position: "absolute",
                right: "1%",
                top: "1%",
                fontSize: "10px",
                background: "",
                outline: "none",
              }}
            >
              X
            </button>
            <div
              className="mt-5"
              style={{
                textAlign: "center",
                width: "100%",
                fontSize: "20px",
                borderBottom: "solid black 1px",
              }}
            >
              <p>create a plan</p>
            </div>
            <div
              className="d-flex align-items-start ps-2 pe-2"
              style={{ textAlign: "left", width: "100%" }}
            >
              <form
                className="mt-4"
                style={{ marginBottom: "20px", width: "100%" }}
                onSubmit={storeToLocal}
              >
                <div style={{ alignSelf: "flex-start" }}>Features</div>
                <div className="mt-2 d-flex justify-content-center">
                  <input
                    type="text"
                    placeholder="Title"
                    style={{ width: "25%", height: "5vh" }}
                    value={title}
                    onChange={handleTitleChange}
                  />
                  <label
                    htmlFor="file"
                    className="ms-2 "
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      style={{
                        border: "1px solid #ccc",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <input
                        placeholder="Icon"
                        type="text"
                        value={selectedFile ? selectedFile.name : ""}
                        readOnly
                        style={{ width: "60%", height: "5vh" }}
                      />
                      <input
                        type="file"
                        id="file"
                        accept="image/*"
                        ref={inputRef}
                        style={{ display: "none" }}
                        onChange={onSelectFile}
                      />
                      <span
                        className="p-1"
                        style={{
                          backgroundColor: "#D3D3D3",
                          width: "40%",
                          paddingRight: 0,
                          height: "5vh",
                        }}
                      >
                        Choose File
                      </span>
                    </div>
                  </label>
                  <input
                    className="ms-2"
                    placeholder="Limit"
                    type="text"
                    style={{ width: "20%", height: "5vh" }}
                    value={limit}
                    onChange={handleLimitChange}
                  />
                  <button className="ms-3 " type="submit">
                    {" "}
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="w-75 mb-2" style={{ backgroundColor: "#D3D3D3" }}>
              <form className="mt-1 mb-2 text-center" onSubmit={handleSubmit}>
                <div
                  className="d-flex justify-content-center mt-4 pb-2"
                  style={{ borderBottom: "solid gray 1px" }}
                >
                  <label htmlFor="selectPeriod">Select Period :</label>
                  <select
                    id="selectPeriod"
                    name="selectPeriod"
                    style={{ marginLeft: "1%", width: "25%", height: "5vh" }}
                    onChange={handlePeriodChange}
                    value={selectedPeriod}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                  <label htmlFor="price" className="ps-3">
                    Price (in ₹) :
                  </label>
                  <input
                    className="ms-1"
                    type="text"
                    id="price"
                    name="price"
                    value={price}
                    style={{ width: "25%", height: "5vh" }}
                    onChange={handlePriceChange}
                  />
                </div>
                <table style={{ width: "100%" }}>
                  <tbody>
                    {plans.map((plan, index) => (
                      <tr key={index}>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {plan.title}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          <img
                            src={plan.icon}
                            alt=""
                            style={{ width: "20px", height: "20px" }}
                          />
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          {plan.limit}
                        </td>
                        <td style={{ padding: "10px", textAlign: "center" }}>
                          <RiDeleteBin2Fill
                            className="link"
                            onClick={() => deleteFeature(index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button type="submit" className="btn btn-primary mt-2">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
