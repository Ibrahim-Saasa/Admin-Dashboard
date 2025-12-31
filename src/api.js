import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (URL, formData) => {
  try {
    const response = await fetch(apiUrl + URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    // Always return data, whether success or error
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
    const params = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
