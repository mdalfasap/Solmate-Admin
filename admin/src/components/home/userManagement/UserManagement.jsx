import React, { useState, useEffect } from "react";
import { fetchPendingData, fetchUserData } from "../../../helper/helper";
import { CiSearch, CiViewList } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdClear } from "react-icons/md"; // Import clear icon
import DataTable from "react-data-table-component";
import { ImBlocked } from "react-icons/im";
import { Tab, Tabs } from "@mui/material"; // Import Tabs and Tab components from MUI
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CgUnblock } from "react-icons/cg";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function UserManagement(props) {
  const [userData, setUserData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [value, setValue] = useState(0); // Initialize value state to 0 for the first tab
  const [dataSource, setDataSource] = useState([]);
  const [pendingSource, setPendingSource] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // State for search value
  const [pendingValue, setPendingValue] = useState(""); // pending value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUserData = await fetchUserData();
        setUserData(fetchedUserData);
        setDataSource(fetchedUserData);
        const fetchedPendigData = await fetchPendingData();
        setPendingData(fetchedPendigData);
        setPendingSource(fetchedPendigData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  const update = (row) => {
    props.showUpdate(row); // Pass row data to showUpdate function
  };

  const view = (row) => {
    props.showView(row); // Pass row data to showView function
  };

  const blockUser = (row) => {
    props.showDelete(row);
  };

  const columns = [
    {
      name: "Photo",
      selector: (row) => (
        <img
          src={row.photoUpload[0]} // Assuming photoUpload is an array with photo URLs
          alt={`Photo of ${row.firstName}`}
          style={{ width: "37px", borderRadius: "50%" }}
        />
      ),
      sortable: false,
    },
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`, // Combine first and last name
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.number,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.blocked) {
          return "inactive";
        } else {
          return "Active";
        }
      },
      sortable: true,
      cell: (row) => (
        <div style={{ color: row.blocked ? "red" : "green" }}>
          {row.blocked ? "Inactive" : "Active"}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <CiViewList
            onClick={() => view(row)}
            style={{ cursor: "pointer", color: "blue", marginRight: "20px" }}
          />
          <FaRegEdit
            onClick={() => update(row)}
            style={{ cursor: "pointer", color: "blue", marginRight: "20px" }}
          />
          {row.blocked ? (
            <CgUnblock
              onClick={() => blockUser(row._id)}
              style={{ cursor: "pointer", color: "gray" }}
              title="Unblock User"
            />
          ) : (
            <ImBlocked
              onClick={() => blockUser(row._id)}
              style={{ cursor: "pointer", color: "red" }}
              title="Block User"
            />
          )}
        </div>
      ),
      sortable: false,
    },
  ];

  const handleFilter = (event) => {
    const keyword = event.target.value.toLowerCase();
    setSearchValue(keyword);

    const filteredByName = dataSource.filter((row) => {
      const fullName = `${row.firstName} ${row.lastName}`.toLowerCase(); // Combine first and last name for filtering
      return fullName.includes(keyword);
    });

    const filteredByEmail = dataSource.filter((row) => {
      const email = row.email.toLowerCase();
      return email.includes(keyword);
    });

    const filteredData =
      filteredByName.length > 0 ? filteredByName : filteredByEmail;
    setUserData(filteredData);
  };

  const clearSearch = () => {
    setSearchValue("");
    setUserData(dataSource);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the value state when tab changes
  };

  //pending User search

  const PendingFilter = (event) => {
    const keyword = event.target.value.toLowerCase();
    setPendingValue(keyword); // Update pendingValue state

    const filteredByName = pendingSource.filter((row) => {
      const fullName = `${row.firstName} ${row.lastName}`.toLowerCase();
      return fullName.includes(keyword);
    });

    const filteredByEmail = pendingSource.filter((row) => {
      const email = row.email.toLowerCase();
      return email.includes(keyword);
    });
    

    const filteredData =
      filteredByName.length > 0 ? filteredByName : filteredByEmail;

    setPendingData(filteredData); // Update pendingData state
  };

  const clearPending = () => {
    setPendingValue("");
    setPendingData(pendingSource);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label="User" />
          <Tab label="Pending User" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div
          className="text"
          style={{
            width: "300px",
            float: "right",
            marginTop: "-43px",
            position: "relative",
          }}
        >
          <input
            type="text"
            className="form-control"
            name="search"
            id="search"
            placeholder="Search..."
            value={searchValue}
            onChange={handleFilter}
          />
          {searchValue && (
            <MdClear
              onClick={clearSearch}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            />
          )}
        </div>
        <DataTable
          title="Users"
          columns={columns}
          data={userData}
          fixedHeader
          selectableRows
          pagination
          highlightOnHover
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div
          className="text"
          style={{
            width: "300px",
            float: "right",
            marginTop: "-43px",
            position: "relative",
          }}
        >
          <input
            type="text"
            className="form-control"
            name="search"
            id="search"
            placeholder="Search... "
            value={pendingValue}
            onChange={PendingFilter}
          />
          {pendingValue && (
            <MdClear
              onClick={clearPending}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            />
          )}
        </div>
        <DataTable
          title="Pending Users"
          columns={columns}
          data={pendingData}
          fixedHeader
          selectableRows
          pagination
          highlightOnHover
        />
      </CustomTabPanel>
    </div>
  );
}

export default UserManagement;
