import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import toast, { Toaster } from "react-hot-toast";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { createPlan } from "../../../helper/helper";

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

  const onSelectFile = (event) => {
    setSelectedFile(event.target.files[0]);
    setImage(event.target.files[0]);
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
    <React.Fragment >
      <Dialog
        open={props.open}
        onClose={handleClose} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ margin: 0, padding: 0 }}>
          <div
            style={{
              borderRadius:"50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "auto",
              backgroundColor: "##edebe8",
              boxShadow:
              " rgba(50, 50, 93, 0.25) 0px 30px 50px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 26px -18px inset", // Add border radius for rounded corners
              width: "100%",
              position: "relative",
            }}
          >
            <Toaster />
            <img
              onClick={handleBack}
              style={{
                position: "absolute",
                right: "1%",
                top: "1%",
                fontSize: "10px",
                outline: "none",
                cursor: "pointer",
                width: "20px",
                height: "20px",
              }}
              src="https://cdn-icons-png.flaticon.com/128/93/93634.png"
              alt=""
            />

            <div
              className="mt-3"
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
                className="mt-2"
                style={{ marginBottom: "10px", width: "100%" }}
                onSubmit={storeToLocal}
              >
                <div style={{ alignSelf: "flex-start" }}>Features</div>
                <div className="mt-2 d-flex justify-content-center">
                  <input
                    type="text"
                    placeholder="Title"
                    style={{ width: "25%", height: "5vh",borderRadius:"8px" }}
                    value={title}
                    onChange={handleTitleChange}
                  />
                  <label
                    htmlFor="file"
                    className="ms-2 "
                    style={{ cursor: "pointer"  }}
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
                        style={{ width: "60%", height: "5vh" ,borderRadius:"8px"}}
                      />
                      <input
                        type="file"
                        id="file"
                        accept="image/*"
                        ref={inputRef}
                        style={{ display: "none"  }}
                        onChange={onSelectFile}
                      />
                      <span
                        className="p-1"
                        style={{
                          backgroundColor: "#D3D3D3",
                          width: "40%",
                          paddingRight: 0,
                          height: "5vh",
                          borderRadius:"8px"
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
                    style={{ width: "20%", height: "5vh" ,borderRadius:"8px"}}
                    value={limit}
                    onChange={handleLimitChange}
                  />
                 
                </div>
                <div
              className=" mt-4 pb-2"
              style={{ borderBottom: "solid gray 1px", marginBottom: "5px" }}
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
                <button
                  className=""
                  type="submit"
                  style={{
                    borderRadius: "8px",
                    marginLeft: "216px",
                    paddingRight: " 50px",
                    paddingLeft:"50px"
                  }}
                >
                  Add
                </button>
              </form>
            </div>
            
            <div className="w-75 mb-2" style={{ backgroundColor: "#" }}>
              <form className="mt-1 mb-2 text-center" onSubmit={handleSubmit}>
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          border: "2px solid black", 
                          borderRadius: "5px",
                          padding: "10px",
                        }}
                      >
                        Title
                      </th>
                      <th
                        style={{
                          border: "2px solid black",
                          borderRadius: "5px",
                          padding: "10px",
                        }}
                      >
                        Icon
                      </th>
                      <th
                        style={{
                          border: "2px solid black",
                          borderRadius: "5px",
                          padding: "10px",
                        }}
                      >
                        Limit
                      </th>
                      <th
                        style={{
                          border: "2px solid black",
                          borderRadius: "5px",
                          padding: "10px",
                        }}
                      >
                        Action
                      </th>{" "}
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map((plan, index) => (
                      <tr key={index}>
                         
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "center",
                            borderLeft: "2px solid black",
                            borderRadius: "5px",
                          }}
                        >
                          {plan.title}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "center",
                            borderLeft: "2px solid black",
                            borderRadius: "5px",
                          }}
                        >
                          <img
                            src={plan.icon}
                            alt=""
                            style={{ width: "20px", height: "20px" }}
                          />
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "center",
                            borderLeft: "2px solid black",
                            borderRadius: "5px",
                          }}
                        >
                          {plan.limit}
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            textAlign: "center",
                            borderLeft: "2px solid black",
                            borderRight: "2px solid black",
                            borderRadius: "5px",
                          }}
                        >
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
