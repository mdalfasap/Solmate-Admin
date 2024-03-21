import * as React from "react";
import { useEffect, useState } from "react";
import { fetchPremiumPlan, deletePlan } from "../../../helper/helper";
import { Modal, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import AddPremium from "./AddPremium";
// import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function Premium() {
  const [add, setAdd] = useState(false);
  const [plan, setPlan] = useState([]);
  const [dltBox, setDltBox] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const create = () => {
    setAdd(true);
  };

  const done = (a) => {
    setAdd(false);
    if (a !== false) {
      setTimeout(() => {
        toast.success(<b>Plan created</b>);
      }, 1000);
    }
  };

  const fetchData = async () => {
    try {
      const fetchedPlan = await fetchPremiumPlan();
      setPlan(fetchedPlan);
    } catch (error) {
      console.error("Error in Plan:", error);
    }
  };

  const deleteCPlan = async (id) => {
    setSelectedItemId(id);
    setDltBox(true);
  };

  const handleDeleteConfirmation = async () => {
    await deletePlan(selectedItemId);

    setDltBox(false);
    setSelectedItemId(null);
    fetchData();
  };

  const handleClose = () => {
    setDltBox(false);
    setSelectedItemId(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        className="container"
        style={{ maxHeight: "600px", overflowY: "auto", scrollbarWidth: "" }}
      >
        <h1>Premium</h1>
        <Toaster />
        <div className="row">
          <div
            className="col-12 d-flex justify-content-end"
            style={{ marginTop: "-75px", marginLeft: "-50px" }}
          >
            <motion.button
              whileHover={{
                scale: 1.1,
                color: "white",
              }}
              style={{
                backgroundColor: "#2c3e50",
                color: "#ecf0f1",
                marginTop: "20px",
              }}                                                                         
              transition={{ duration: 0.3 }}
              className="p-2 link rounded"
              onClick={create}
            >
              Create a Plan
            </motion.button>
          </div>

          <div className="col-12 mt-2" style={{}}>
            <div className="d-flex flex-wrap" style={{ marginTop: "-15px" }}>
              {plan.map((item, index) => (
                <Card
                  key={item._id}
                  className="card mt-2 ms-2"
                  sx={{
                    width: 275,
                    height: "350px",
                    backgroundColor: "white", // Change backgroundColor to your desired dark shade color
                    // Set text color to white or any contrasting color
                    textAlign: "center",
                    borderRadius: "20px",
                    background: "white",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    boxShadow:
                      " rgba(50, 50, 93, 0.25) 0px 30px 50px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 26px -18px inset", // Add border radius for rounded corners
                  }}
                >
                  <CardContent style={{ textAlign: "left" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      Plan {index + 1}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      color="text.secondary"
                    >
                      Price: <span>&#8377;</span> {item.Price} / {item.Period}
                    </Typography>
                    <Typography gutterBottom variant="h6">
                      <strong>Features:</strong>
                    </Typography>

                    {/* Render each feature with its title, icon, and limit separately */}
                    {item.Features.map((feature, index) => (
                      <div key={index}>
                        <span style={{ fontWeight: "bold", margin: "8px" }}>
                          Title:
                        </span>{" "}
                        {feature.title}
                        <br />
                        <br />
                        <span style={{ fontWeight: "bold", margin: "8px" }}>
                          Icon:
                          <img src={feature.icon} alt="" />
                        </span>{" "}
                        {} {/* Replace feature.icon with the actual icon */}
                        <br />
                        <br />
                        <span style={{ fontWeight: "bold", margin: "8px" }}>
                          Limit:
                        </span>{" "}
                        {feature.limit}
                        <br />
                        <br />
                      </div>
                    ))}
                  </CardContent>
                  <CardActions style={{ height: "200px" }}>
                    <IconButton onClick={() => deleteCPlan(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AddPremium open={add} done={done} />
      <Modal show={dltBox} onHide={handleClose} centered>
        <Modal.Title style={{ paddingLeft: "120px", paddingTop: "20px" }}>
          Delete Confirmation
        </Modal.Title>

        <Modal.Body
          style={{
            paddingLeft: "87px",
            paddingTop: "30px",
            paddingBottom: "30px",
          }}
        >
          Are you sure you want to delete this item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmation}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Premium;
                                                                       