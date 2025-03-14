import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../AuthContext";

const Login =()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async ()=>{
        e.preventDefault();
        setMessage("");


        try{
            const response = await fetch("http://localhost:3001/api/users/login",{
                method:"POST",
                headers:{
                    "Content-type": "application/json"
                },
                body: JSON.stringify({email, password}),
            });
            if(response.ok){
                const data = await response.json();
                login(data.token);
                setMessage("Login successful!");
                navigate("/");
            }else{
                const error = await response.json();
                setMessage(error.error || "Login failed. Please try again")
            }
        }catch(error){
            setMessage("An error occured. Please try again later.")
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg max-w-sm w-full p-6">
          <div className="text-center">
            <img
              src="https://i.imgur.com/T3EXdQe.jpeg"
              className="rounded-full mb-4 border w-20 h-20 mx-auto"
              alt="logo"
            />
            <h3 className="text-2xl font-bold">Welcome Back</h3>
            <p className="text-gray-500 text-sm">Please enter your details to sign in</p>
          </div>
          <form onSubmit={handleLogin} className="mt-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm text-gray-600">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm text-gray-600">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </form>
          {message && (
            <div className="mt-4 text-center text-sm text-blue-600 bg-blue-100 p-2 rounded">
              {message}
            </div>
          )}
          <div className="text-center mt-4">
            <span className="text-gray-500 text-sm">Don't have an account?</span>
            <button
              className="text-blue-600 font-semibold ml-1 hover:underline"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
      
    );
    
}

export default Login;