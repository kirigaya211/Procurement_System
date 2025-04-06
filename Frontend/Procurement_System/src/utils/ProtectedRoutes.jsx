import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export const AdminRoute =({children})=>{
    const {isLoggedIn, isAdmin} = useContext(AuthContext);

    if(!isLoggedIn) {
        return <Navigate to="/" replace/>
    }
    if(!isAdmin){
        return <Navigate to="/body" replace />
    }
    
    return children;
}

export const UserRoute=({children})=>{
    const {isLoggedIn, isAdmin} = useContext(AuthContext);

    if(!isLoggedIn) {
        return <Navigate to="/" replace/>
    }
    if(isAdmin){
        return <Navigate to="/adminDashboard" replace />
    }
    
    return children;
}

