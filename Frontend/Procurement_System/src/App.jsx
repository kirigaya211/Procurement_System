import React from "react";
import {Routes, Route} from "react-router"
import Header from "./components/Header";

function App() {
  return (
    <>
    <Router>
      <Routes path="/" element ={
        <>
        <Header/>
        </>
      }></Routes>
    </Router>
    
    </>
  );
}

export default App;
