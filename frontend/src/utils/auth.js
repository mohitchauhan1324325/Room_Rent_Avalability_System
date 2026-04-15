// Check login
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); 
};

// Get full user (from storage)
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Get role directly
export const getUserRole = () => {
  return getUser()?.role;
};