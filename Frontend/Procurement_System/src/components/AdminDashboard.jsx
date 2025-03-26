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
  
      // ✅ Format the data for export
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
  
      // ✅ Create Excel Workbook and Worksheet
      const wb = XLSX.utils.book_new();
      
      // ✅ Template Layout (Header + Metadata + Data)
      const template = [
        ["Procurement Export Report"],                            // Title
        [`Export Date: ${new Date().toLocaleString()}`],          // Metadata
        [`Prepared By: Procurement Team`],                        // Metadata
        [],                                                       // Empty row for spacing
        ["No.", "Item Name", "Description", "Quantity", "Unit Price", "Total Price", "Requested By", "Date Requested"] // Column Headers
      ];
  
      // ✅ Add the main data below the template
      const jsonSheet = XLSX.utils.json_to_sheet(formattedData, { origin: "A6" });
  
      // ✅ Add the template to the worksheet
      const headerSheet = XLSX.utils.aoa_to_sheet(template);
  
      // ✅ Combine the template and data into one sheet
      const ws = { ...headerSheet, ...jsonSheet };
  
      // ✅ Add custom column widths
      ws["!cols"] = [
        { wch: 5 },   // No.
        { wch: 20 },  // Item Name
        { wch: 30 },  // Description
        { wch: 10 },  // Quantity
        { wch: 15 },  // Unit Price
        { wch: 15 },  // Total Price
        { wch: 20 },  // Requested By
        { wch: 15 },  // Date Requested
      ];
  
      // ✅ Apply Merged Cells for Title and Metadata
      ws["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 7 } },  // Merge title row
        { s: { r: 1, c: 0 }, e: { r: 1, c: 7 } },  // Merge export date
        { s: { r: 2, c: 0 }, e: { r: 2, c: 7 } },  // Merge author row
      ];
  
      // ✅ Apply styles to the header row
      const range = XLSX.utils.decode_range(ws["!ref"]);
      for (let C = 0; C < 8; ++C) {
        const headerCell = ws[XLSX.utils.encode_cell({ r: 4, c: C })];  // Header row (index 4)
        if (headerCell) {
          headerCell.s = {
            font: { bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "4F81BD" } },  // Blue background
            alignment: { horizontal: "center", vertical: "center" },
          };
        }
      }
  
      // ✅ Append worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, "Procurement Report");
  
      // ✅ Save the Excel file
      XLSX.writeFile(wb, "Procurement_Report.xlsx");
      console.log("Exported successfully!");
  
    } catch (error) {
      console.error("Error exporting:", error);
    }
  };

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
