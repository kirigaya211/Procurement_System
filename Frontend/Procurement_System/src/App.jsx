import React from "react";
import {Routes, Route} from "react-router"
import Navbar from "./components/Navbar"
import Body from "./components/Body";
import Login from "./components/Login";
import Procurement  from "./components/Procurement";

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
    </Routes>
    </>
  );
}

export default App;
