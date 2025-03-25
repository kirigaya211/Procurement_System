import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        setMessage("Registration successful!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        const error = await response.json();
        setMessage(error.message || "Account already exists. Please login.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
        <div className="text-center">
          <img
            src="https://i.imgur.com/T3EXdQe.jpeg"
            className="w-20 h-20 rounded-full mx-auto border mb-4"
            alt="USeP"
          />
          <h3 className="text-xl font-bold">Create an Account</h3>
          <p className="text-gray-500 text-sm">
            Sign up and start using our platform
          </p>
        </div>
        <form onSubmit={handleRegister} className="mt-4">
          <div className="mb-3">
            <label htmlFor="name" className="block text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your fullname"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm text-gray-600">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-sm text-gray-600">Password</label>
            <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required/>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Register</button>
        </form>
        {message &&(
            <div className="mt-3 text-center text-blue-600 text-sm">{message}</div>
        )}
        <div className="text-center mt-3 text-sm">
            <span className="text-gray-500 text-sm">Already have an account?</span>{" "}
            <button onClick={()=>navigate("/")} className="text-blue-600 font-semibold hover:underline">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
