import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { createPlan } from "../../../helper/helper";
import DialogContent from "@mui/material/DialogContent";
import toast, { Toaster } from "react-hot-toast";

export default function AddNormal(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const NoOfBoost = event.target.querySelector("#noOfBoost").value;
    const Period = event.target.querySelector("#selectPeriod").value;
    const Price = event.target.querySelector("#price").value;
    const Type = "Normal";

    const planData = {
      NoOfBoost,
      Period,
      Price,
      Type,
    };

    try {
      await createPlan(planData);
      toast.loading(<b>creating plan...</b>, {
        duration: 2000,
      });
      setTimeout(() => {
        props.done();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(
        <b>{error.response?.data.error || "Something went wrong"}</b>
      );
    }
  };
  const handleBack = () => {
    props.done(false);
  };

  const handleClose = () => {
    props.done(false);
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
              height: "60vh",
              backgroundColor: "#B2BEB5",
              width: "100%",
              position: "relative",
            }}
          >
            <Toaster />
             <img onClick={handleBack}                        
              style={{
                position: "absolute",
                right: "1%",
                top: "1%",
                fontSize: "10px",
                outline: "none",
                cursor:'pointer',
                width:'20px',
                height:'20px'
              }} src="https://cdn-icons-png.flaticon.com/128/93/93634.png" alt="" />
            <div
              className="mt-4"
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
              className=" d-flex align-items-center ps-3"
              style={{ textAlign: "center", width: "100%" }}
            >
              <form
                className="mt-4"
                style={{ marginBottom: "20px", width: "100%" }}
                onSubmit={handleSubmit}
              >
                <div className="mt-1">
                  <label htmlFor="noOfBoost">No of Boost :</label>
                  <input
                    type="text"
                    id="noOfBoost"
                    name="noOfBoost"
                    style={{
                      position: "relative",
                      left: "3%",
                      width: "50%",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="mt-4">
                  <label htmlFor="selectPeriod">Select Period :</label>
                  <select
                    id="selectPeriod"
                    name="selectPeriod"
                    style={{
                      position: "relative",
                      left: "2%",
                      width: "50%",
                      height: "5vh",
                      borderRadius: "10px",
                    }}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="weekly">Weekly</option>
                  </select>{" "}
                </div>
                <div className="mt-4">
                  <label htmlFor="price">Price ( in ₹) :</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    style={{
                      position: "relative",
                      left: "3%",
                      width: "50%",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <button
                  className="mt-5"
                  type="submit"
                  style={{ borderRadius: "5px" }}
                >
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
