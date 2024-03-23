import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ children }) {

    const token = localStorage.getItem('token');
    if (token) {
        return children;
    }
    else {
        return <Navigate to='/login' replace/>
    }
}
export default ProtectedRoutes