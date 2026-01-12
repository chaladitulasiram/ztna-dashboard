import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('supabase_token');
    const location = useLocation();

    if (!token) {
        // Redirect to login but save the current location to return to later
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;