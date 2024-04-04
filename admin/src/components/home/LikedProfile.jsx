// LikedProfilesComponent.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
 

function  LikedProfilesComponent() {
  const [profiles, setProfiles] = useState([]);
 
  const [ setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    async function fetchLikedProfiles() {
      try {
        const senderId = id;
        const response = await axios.get(`/api/likeprofile/${senderId}`);
        setProfiles(response.data.profiles);
      } catch (error) {
        setError("Failed to fetch liked profiles");
      }  
    }

    fetchLikedProfiles();
  }, []);

  return (
    <div>
     
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Profile</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>
                  <img
                    src={profile.photoUpload}
                    alt=""
                    style={styles.profileImage}
                  />
                </td>
                <td style={styles.tableCell}>{profile.firstName}</td>
                <td style={styles.tableCell}>{profile.email}</td>
                <td style={{ color: "red", cursor: "pointer" }}>
                  <DeleteIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
}

const styles = {
  tableHeader: {
    backgroundColor: "#f2f2f2",
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "8px",
    textAlign: "left",
  },
  profileImage: {
    width: "37px",
    borderRadius: "50%",
  },
};

export default LikedProfilesComponent;
