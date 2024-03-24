import React from 'react'
import { Navigate } from 'react-router-dom';
import { Bounce, toast } from "react-toastify";

function Logout() {
    const token = localStorage.getItem('token');
    
    if (token) {
        localStorage.removeItem('token');
        return <Navigate to='/login' replace />
    }
    else {
        
        toast.warn("go to register", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
       return (
            <Navigate to='/login' replace />
        )
    }
}

export default Logout
