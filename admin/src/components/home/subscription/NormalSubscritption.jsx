import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchNormalPlan } from "../../../helper/helper";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { deletePlan } from "../../../helper/helper";
import { Modal, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import AddNormal from "./AddNormal";
import { DataGrid } from "@mui/x-data-grid";

function NormalSubscription() {
  const [add, setAdd] = useState(false);
  const [plan, setPlan] = useState([]);
  const [dltBox, setDltBox] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const create = () => {
    setAdd(true);
  };

  const done = (a) => {
    setAdd(false);
    if (a != false) {
      setTimeout(() => {
        toast.success(<b>Plan created</b>);
      }, 1000);
    }
  };

  const fetchData = async () => {
    try {
      const fetchedPlan = await fetchNormalPlan();
      setPlan(fetchedPlan);
    } catch (error) {
      console.error("Error in Plan:", error);
    }
  };

  const deleteCPlan = (id) => {
    setSelectedItemId(id);
    setDltBox(true);
  };

  const handleDeleteConfirmation = async () => {
    await deletePlan(selectedItemId);
    toast.success(<b>Plan Deleted</b>);

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
  }, [add]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "Price", headerName: "Price (in ₹)", width: 180 },
    { field: "Period", headerName: "Period", width: 160 },
    { field: "NoOfBoost", headerName: "Number of Boost", width: 180 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <RiDeleteBin2Fill
          onClick={() => deleteCPlan(params.row._id)}
          style={{ cursor: "pointer", color: "rgba(130, 26, 95, 1)" }}
        />
      ),
    },
  ];

  // Ensure each row has a unique id
  const rows = plan.map((item, index) => ({
    id: index + 1,
    ...item,
  }));

  return (
    <>
      <div className="container" style={{ marginTop: "-40px",  }}>
        <Toaster />
        <div className="row">
          <div className="col-12 d-flex justify-content-end"> 
          <div className="col-12 mt-2">
            <motion.button
              whileHover={{
                scale: 1.1,
                backgroundColor: "white",
                color: "black",
              }}
              style={{
                backgroundColor: "#2c3e50", // Background color
                color: "white", // Text color
                marginLeft: "686px",
              }}
              transition={{ duration: 0.3 }}
              className="p-2 link rounded"
              onClick={create}
            >
              Create a Plan
            </motion.button>
            <div
              style={{
                height: "350px",
                width: "90%",
                borderRadius: "5px",
                backgroundColor: "white",
                boxShadow:  " rgba(50, 50, 93, 0.25) 0px 30px 50px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 26px -18px inset", // Set background color to white
              }}
            >
              <h2
                style={{
                  padding: "5px 5px 10px 10px",
                  fontFamily: "sans-serif",
                  fontWeight: "lighter",
                }}
              >
                Normal
              </h2>
              <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection={true} // Remove checkbox selection
              />
            </div>
          </div>
        </div>
      </div>
      </div>

      <AddNormal open={add} done={done} />
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

export default NormalSubscription;
