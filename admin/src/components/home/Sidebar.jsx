import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AppstoreOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";

function Sidebar() {
  const navigate = useNavigate();

  const showAdministration = () => {
    navigate("/administration");
  };
  const showUserManagement = () => {
    navigate("/usermanagement");
  };
  const showNotification = () => {
    navigate("/notification");
  };
  const showSubscription = () => {
    navigate("/subscription");
  };

  const showDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <motion.p
        whileHover={{
          scale: 1.1,
          backgroundColor: "#e4e5f1",
          color: "#36454F",
          borderRadius: "100px",
          x: 12,
        }}
        transition={{ duration: 0.3 }}
        className="p-2  link"
        onClick={showDashboard}
        
      >
        Admin dashboard
      </motion.p>

      <motion.p
        whileHover={{
          scale: 1.1,
          backgroundColor: "#e4e5f1",
          color: "#36454F",
          borderRadius: "100px",
          x: 12,
        }}
        transition={{ duration: 0.3 }}
        className="p-2 mt-4 link"
        onClick={showAdministration}
      >
        Administration
      </motion.p>

      <motion.p
        whileHover={{
          scale: 1.1,
          backgroundColor: "#e4e5f1",
          color: "#36454F",
          borderRadius: "100px",
          x: 12,
        }}
        transition={{ duration: 0.3 }}
        className="p-2 link"
        onClick={showUserManagement}
      >
        User management
      </motion.p>

      <motion.p
        whileHover={{
          scale: 1.1,
          backgroundColor: "#e4e5f1",
          color: "#36454F",
          borderRadius: "100px",
          x: 12,
        }}
        transition={{ duration: 0.3 }}
        className="p-2 link"
        onClick={showNotification}
      >
        Push notification
      </motion.p>

      <motion.p
        whileHover={{
          scale: 1.1,
          backgroundColor: "#e4e5f1",
          color: "#36454F",
          borderRadius: "100px",
          x: 12,
        }}
        transition={{ duration: 0.3 }}
        className="p-2 link"
        onClick={showSubscription}
      >
        Subscription
      </motion.p>
    </div>
  );
}

export default Sidebar;
