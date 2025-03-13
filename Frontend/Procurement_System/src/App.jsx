import React from "react";
import {Routes, Route} from "react-router"
import Header from "./components/Header";
import Body from "./components/Body";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element ={
        <>
        <Header/>
        <Body/>
        </>
      }></Route>
    </Routes>
    
    </>
  );
}

export default App;
