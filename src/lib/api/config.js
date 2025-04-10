// config.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"; // Default base URL

export const apiConfig = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  // Add other configurations if needed
};

const apiEndpoints = {
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,  // updated to include /api
    register: `${API_BASE_URL}/api/auth/register`,  // updated to include /api
  },
};

export default apiEndpoints;
