import { Navigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/register" replace />;
    }

    const role = getUserRole();

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;