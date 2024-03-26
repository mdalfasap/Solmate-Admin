import axios from "axios";
axios.defaults.baseURL = "http://localhost:8081";

export async function registerUser(credential) {
  try {
    const response = await axios.post("/api/register", credential);
    return response.data;
  } catch (error) {
    console.log("Error during registration:", error);

    if (error.response) {
      console.error("Response data:", error.response.data);
      return Promise.reject(error.response.data);
    }

    return Promise.reject({ error: "Internal Server Error" });
  }
}

export async function loginUser(credentials) {
  try {
    const response = await axios.post("/api/login", credentials);
    await localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response.data || { error: "Internal Server Error" };
  }
}

export const fetchAdminData = async () => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.get("/api/getAdmin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error;
  }
};
export const fetchUserData = async () => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.get("/api/getUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.users;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const fetchPendingData = async () => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.get("/api/getUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.pending;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const createPlan = async (plan) => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.post("/api/createPlan", plan, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating plan:", error);
    throw error;
  }
};

export const fetchNormalPlan = async () => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.get("/api/getPlan", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.Normal;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const fetchPremiumPlan = async () => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.get("/api/getPlan", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.Premium;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deletePlan = async (id) => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.delete(`/api/deletePlan/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error deleting plan:", error);
    throw error;
  }
};

export async function submitDetails(userId, response) {
  try {
    const token = await localStorage.getItem("token");
    const { data } = await axios.post(
      `/api/submitDetails/${userId}`,
      response,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  } catch (error) {
    console.error("Error on Submit:", error);
    return Promise.reject({ error: "Couldn't Submit" });
  }
}
