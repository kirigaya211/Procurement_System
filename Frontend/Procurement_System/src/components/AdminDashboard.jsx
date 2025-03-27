import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const ManageProcurement = () => {
  const [procurements, setProcurements] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const [selectedProcurement, setSelectedProcurement] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProcurement = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You must be logged in to manage procurements.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3001/api/procurement/get-all-procurement-list", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProcurements(data);
        } else {
          const error = await response.json();
          setMessage(error.message || "Failed to fetch procurements.");
        }
      } catch (error) {
        setMessage("An error occurred while fetching procurements.");
      } finally {
        setLoading(false);
      }
    };

    fetchProcurement();
  }, []);

  const fetchDetails = async (procurementId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/procurement/get-procurement-list/${procurementId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setDetails(data);
        setSelectedProcurement(procurementId);
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to fetch details.");
      }
    } catch (error) {
      setMessage("Error fetching procurement details.");
    }
  };

  const handleExport = async (procurementId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/procurement/get-procurement-list/${procurementId}`
      );
      const data = await response.json();

      if (!data || !data.items || data.items.length === 0) {
        console.log("No data found!");
        return;
      }

      const formattedData = data.items.map((item, index) => ({
        "No.": index + 1,
        "Item Name": item.name || "N/A",
        "Description": item.description || "No description",
        "Quantity": item.quantity || 0,
        "Unit Price": `$${item.unitPrice?.toFixed(2) || "0.00"}`,
        "Total Price": `$${(item.quantity * item.unitPrice).toFixed(2) || "0.00"}`,
        "Requested By": item.requestedBy || "Unknown",
        "Date Requested": new Date(item.date).toLocaleDateString() || "N/A",
      }));

      const wb = XLSX.utils.book_new();

      const template = [
        ["Procurement Export Report"],
        [`Export Date: ${new Date().toLocaleString()}`],
        [`Prepared By: Procurement Team`],
        [],
        ["No.", "Item Name", "Description", "Quantity", "Unit Price", "Total Price", "Requested By", "Date Requested"]
      ];

      const jsonSheet = XLSX.utils.json_to_sheet(formattedData, { origin: "A6" });
      const headerSheet = XLSX.utils.aoa_to_sheet(template);

      const ws = { ...headerSheet, ...jsonSheet };

      ws["!cols"] = [
        { wch: 5 },
        { wch: 20 },
        { wch: 30 },
        { wch: 10 },
        { wch: 15 },
        { wch: 15 },
        { wch: 20 },
        { wch: 15 },
      ];

      ws["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } },
        { s: { r: 1, c: 0 }, e: { r: 1, c: 7 } },
        { s: { r: 2, c: 0 }, e: { r: 2, c: 7 } },
      ];

      XLSX.utils.book_append_sheet(wb, ws, "Procurement Report");
      XLSX.writeFile(wb, "Procurement_Report.xlsx");
      console.log("Exported successfully!");

    } catch (error) {
      console.error("Error exporting:", error);
    }
  };

  return (
    <div className="min-w-full container mt-5">
      <div className="text-center mb-4">
        <h1 className="text-bold text-yellow-400 text-4xl mb-4">
          Manage Procurement
        </h1>
        <p className="text-gray-400">View and Manage Procurement</p>
      </div>

      {message && (
        <div className="text-red-600 text-center text-xl animate-pulse">
          {message}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          {loading ? (
            <p>Loading...</p>
          ) : (
            procurements.map((procurement) => (
              <div
                key={procurement._id}
                className={`cursor-pointer p-5 rounded-lg shadow-lg mb-4 
                  ${selectedProcurement === procurement._id ? "bg-blue-100" : "bg-white"}`}
                onClick={() => fetchDetails(procurement._id)}
              >
                <h2 className="text-xl font-bold">{procurement.procure}</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();  
                    handleExport(procurement._id);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
                >
                  Export
                </button>
              </div>
            ))
          )}
        </div>

        <div className="col-span-2">
          {details ? (
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Details</h2>

              <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-2 px-4">Item Name</th>
                    <th className="py-2 px-4">Description</th>
                    <th className="py-2 px-4">Quantity</th>
                    <th className="py-2 px-4">Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  {details.items?.map((item) => (
                    <tr key={item._id} className="border-t hover:bg-gray-50">
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4">{item.description}</td>
                      <td className="py-2 px-4">{item.quantity}</td>
                      <td className="py-2 px-4">₱{item.price}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Select a procurement to see details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageProcurement;
