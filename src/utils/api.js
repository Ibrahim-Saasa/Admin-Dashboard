import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const getToken = () => {
  return (
    sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken")
  );
};

export const postData = async (URL, formData) => {
  try {
    const token = getToken();
    const response = await fetch(apiUrl + URL, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return {
      success: false,
      error: true,
      message: "Network error. Please try again.",
    };
  }
};

export const fetchDataFromApi = async (URL) => {
  try {
    const token = getToken();
    const params = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(apiUrl + URL, params);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// ✅ ADD THIS FUNCTION
export const editData = async (url, updatedData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("No authentication token found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.put(apiUrl + url, updatedData, config);
    return response.data;
  } catch (error) {
    console.error("Edit Data Error:", error.response?.data || error.message);
    throw error;
  }
};
