import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ProcurementInput = () => {
  const { id } = useParams();
  
  const [procurementName, setProcurementName] = useState("");  // New procurement name state
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const addItem = () => {
    if (itemName.trim() && description.trim() && price && quantity) {
      const newItem = {
        name: itemName,
        description,
        price: parseFloat(price).toFixed(2),
        quantity: parseInt(quantity),
      };

      setItemList([...itemList, newItem]);
      
      setItemName("");
      setDescription("");
      setPrice("");
      setQuantity("");
    }
  };

  const deleteItem = (index) => {
    const updatedList = itemList.filter((_, i) => i !== index);
    setItemList(updatedList);
  };

  const submitList = async () => {
    const token = localStorage.getItem("token");

    if (!procurementName.trim()) {
      setMessage("Error: Procurement name is required.");
      return;
    }

    if (itemList.length === 0) {
      alert("No items to submit!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/procurement/add-procurement-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user: id,  
          procure: procurementName,    
          items: itemList,
        }),
      });

      if (response.ok) {
        setProcurementName("");   
        setItemList([]);
        setMessage("List submitted successfully!");
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message || "Failed to submit list"}`);
      }
    } catch (error) {
      console.error("Error submitting list:", error);
      setMessage("Failed to submit list.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Procurement Input
        </h1>

       
        <div className="space-y-4">
          <input
            type="text"
            value={procurementName}
            onChange={(e) => setProcurementName(e.target.value)}
            placeholder="Procurement Name (e.g., Office Supplies)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

     
        <div className="space-y-4 mt-6">
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex space-x-4">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
    
          <button
            onClick={addItem}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Item
          </button>
        </div>

    
        <ul className="mt-6 space-y-4">
          {itemList.map((item, index) => (
            <li
              key={index}
              className="bg-gray-50 p-4 rounded-md shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm">
                    💰 Price: <span className="font-bold">₱{item.price}</span>
                  </p>
                  <p className="text-sm">
                    📦 Quantity:{" "}
                    <span className="font-bold">{item.quantity}</span>
                  </p>
                </div>
                <button
                  onClick={() => deleteItem(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>

        {itemList.length === 0 && (
          <p className="text-gray-400 mt-4 text-center">No items added yet.</p>
        )}

  
        <div className="mt-6">
          <button
            onClick={submitList}
            disabled={loading}
            className={`w-full px-4 py-2 text-white rounded-md ${
              loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } transition`}
          >
            {loading ? "Submitting..." : "Submit List"}
          </button>

          {message && (
            <p
              className={`text-center mt-4 ${
                message.includes("Error") ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcurementInput;
