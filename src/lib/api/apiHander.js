import toast from "react-hot-toast";
// import { setLoading } from "../features/redux/Loading/loadingSlice";
import apiClient from "../api/config"; // Import the apiClient

// Function to handle API calls
export const apiHandler = async (apiCall, successMessage) => {
  try {
    // Optionally set loading state to true (e.g., to show loading spinner)
    // dispatch(setLoading(true)); // Uncomment if using Redux for loading state

    const response = await apiCall(); // Call the API function
    if (successMessage) {
      toast.success(successMessage); // Show success toast
    }

    // Optionally set loading state to false
    // dispatch(setLoading(false)); // Uncomment if using Redux for loading state

    return response; // Return the successful response
  } catch (error) {
    console.log("API Error:", error);
    
    // Optionally set loading state to false on error
    // dispatch(setLoading(false)); // Uncomment if using Redux for loading state
    
    toast.error(error?.data?.error || error?.data?.message || "An error occurred"); // Show error toast
  }
};
