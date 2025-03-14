import React from "react";
import {Routes, Route} from "react-router"
import Header from "./components/Header";
import Body from "./components/Body";
import Login from "./components/Login";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element ={
        <>
        <Header/>
        <Body/>
        </>
      }/>
      <Route path="/login" element={
      <>
      <Header/>
      <Login/>
      </>
      }/>
    </Routes>
    
    </>
  );
}

export default App;
