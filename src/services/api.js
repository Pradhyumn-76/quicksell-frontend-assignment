import axios from "axios";

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("api response:", response.data)
    return response.data.tickets || [];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};