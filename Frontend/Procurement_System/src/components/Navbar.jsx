import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../AuthContext";

const Navbar = ()=>{
    const {isLoggedIn, isAdmin, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = ()=>{
        logout();
        navigate("/")
    };

    return(
        <>
        </>
    )
}


export default Navbar;
