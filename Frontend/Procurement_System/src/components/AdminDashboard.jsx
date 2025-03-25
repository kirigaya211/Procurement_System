import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const ManageProcurement = () => {
  const [procurements, setProcurements] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProcurement = async () => {
      // const token = localStorage.getItem("token");

      // if(!token){
      //     setMessage("You must be logged in to manage facilities");
      //     setLoading(false);
      //     return;
      // }

      try {
        const response = await fetch(
          "http://localhost:3001/api/procurement/get-all-procurement-list"
        );
        if (response.ok) {
          const data = await response.json();
          setProcurements(data);
        } else {
          const error = await response.json();
          setMessage(error.message || "Failed to fetch facilities");
        }
      } catch (error) {
        setMessage("An error occurred while fetching facilities.");
      }
    };
    fetchProcurement();
  }, []);

  return (
    <div className="min-w-full container mt-5">
      <div className=" text-center mb-4">
        <h1 className="display-block text-bold text-yellow-400 text-4xl mb-4">
          Manage Procurement
        </h1>
        <p className="text-gray-400 ">View and Manage Procurement</p>
      </div>

      {message && (
        <div className="text-red-600 text-center text-xl animate-pulse">
          {message}
        </div>
      )}
      {!loading && procurements.length > 0 && (
        <div className="flex-row">
          {procurements.map((procurement) => (
            <div key={procurement._id}>
              <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-6">
                <div className="display-block text-bold text-yellow-400 text-4xl mb-4">
                  {procurement.procure}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProcurement;
