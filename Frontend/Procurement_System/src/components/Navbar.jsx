import React, {useContext, useState} from "react";
import {NavLink} from "react-router-dom";
import {Menu, X} from "lucide-react";
import {AuthContext} from "../AuthContext";

const Navlink = ()=>{
    // const {isLoggedIn, isAdmin, logout} = useContext(AuthContext);
    // const navigate = useNavigate();

    // const handleLogout = ()=>{
    //     logout();
    //     navigate("/")
    // };

    return(
        <>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/projects">Projects</NavLink>
        </>
    )
}

const Navbar =()=>{
    const[isOpen, setIsOpen]=useState(false);

    const toggleNavbar = ()=>{
        setIsOpen(!isOpen);
    }

    return(
       <>
         <nav className="w-1/3 flex justify-end">
            <div className="hidden w-full md:flex justify-between"><Navlink/></div>
            <div className="md:hidden">
                <button onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
            </div>
        </nav>
        {isOpen &&(
            <div className="flex flex-col items-center basis-full">
                <Navlink/>
            </div>
        )}
       </>
    )
}


export default Navbar;
