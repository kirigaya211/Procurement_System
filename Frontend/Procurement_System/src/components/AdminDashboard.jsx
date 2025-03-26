import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as XLSX from "xlsx";  


const ManageProcurement = () => {
  const [procurements, setProcurements] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProcurement = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You must be logged in to manage facilities");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3001/api/procurement//get-all-procurement-list", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
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
      } finally {
        setLoading(false);
      }
    };
    fetchProcurement();
  }, []);


  const handleExport = async (procurement) => {
    try {
      const data = await fetch(`http://localhost:3001/api/procurement/get-procurement-list/${procurement}`
      );
      const response = await data.json()
      // console.log("Export Response:", response);
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(response.items);

      XLSX.utils.book_append_sheet(wb, ws, "Request for Procurement");

      XLSX.writeFile(wb, "Procurement.xlsx");
    } catch (error) {
      console.log(error)
    }



  }

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
        <div className=" flex-row justify-items-center">
          {procurements.map((procurement) => (
            <div key={procurement._id}>
              <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white p-6 text-center">
                <div className="display-block text-bold text-red-400 text-4xl mb-4">
                  {procurement.procure}
                </div>
                <button onClick={() => handleExport(procurement._id)} className="text-bold text-blue-400">Export</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageProcurement;
