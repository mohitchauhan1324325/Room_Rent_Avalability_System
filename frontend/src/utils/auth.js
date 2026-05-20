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
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Get role directly
export const getUserRole = () => {
  const user = getUser();
  return user?.role || null;
};