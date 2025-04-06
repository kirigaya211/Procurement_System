import React from "react";
import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Login from "./components/Login";
import Procurement from "./components/Procurement";
import Register from "./components/Register";
import ProcurementList from "./components/ProcurementList";
import AdminDashboard from "./components/AdminDashboard";
import {AdminRoute,UserRoute} from "./utils/ProtectedRoutes";


function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/body"
          element={
            <>
              <UserRoute>
                <Navbar />
                <Body />
              </UserRoute>
            </>
          }
        />
        <Route
          path="/procurement"
          element={
            <>
              <UserRoute>
                <Navbar />
                <Procurement />
              </UserRoute>
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />
        <Route
          path="/procurementList"
          element={
            <>
              <UserRoute>
                <Navbar />
                <ProcurementList />
              </UserRoute>
            </>
          }
        />
        <Route
          path="/adminDashboard"
          element={
            <>
              <AdminRoute>
                <Navbar />
                <AdminDashboard />
              </AdminRoute>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
