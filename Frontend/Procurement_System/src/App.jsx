import React from "react";
import {Routes, Route} from "react-router"
import Navbar from "./components/Navbar"
import Body from "./components/Body";
import Login from "./components/Login";
import Procurement  from "./components/Procurement";
import Register from "./components/Register";
import ProcurementList from "./components/ProcurementList";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element ={
        <>
        <Navbar/>
        <Login/>
        </>
      }/>
      <Route path="/body" element={
      <>
      <Navbar/>
      <Body/>
      </>
      }/>
      <Route path="/procurement" element={
        <>
        <Navbar/>
        <Procurement/>
        </>
      }/>
      <Route path="/register" element={
        <>
        <Navbar/>
        <Register/>
        </>
      }/>
      <Route path="/procurementList" element={
        <>
        <Navbar/>
        <ProcurementList/>
        </>
      }/>
      <Route path="/adminDashboard" element={
        <>
        <Navbar/>
        <AdminDashboard/>
        </>
      } />
    </Routes>
    </>
  );
}

export default App;
