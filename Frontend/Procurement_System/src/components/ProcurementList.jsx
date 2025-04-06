import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProcurementList = () => {
    const { id } = useParams();
    const [procurementList, setProcurementList] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProcurementList = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("You must be logged in to view your procurement list");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `http://localhost:3001/api/procurement/get-all-procurement-list-user`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    setMessage("An error occurred while fetching procurement list details");
                    setLoading(false);
                    return;
                }

                const data = await response.json();
                setProcurementList(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching procurement list:", error);
                setMessage("Failed to fetch procurement list. Please try again.");
                setLoading(false);
            }
        };

        fetchProcurementList();
    }, [id]);

    const cancelProcurement = async (procurementId) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(
                `http://localhost:3001/api/procurement/cancel/${procurementId}`,  
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (response.ok) {
                setMessage("Procurement cancelled successfully");
                setProcurementList((prev) =>
                    prev.filter((item) => item._id !== procurementId)
                );
                setTimeout(() => navigate("/body"), 2000);
            } else {
                const error = await response.json();
                setMessage(error.error || "Cancellation failed. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred while cancelling procurement. Please try again later.");
            console.error("Error cancelling procurement:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (!procurementList || procurementList.length === 0) {
        return (
            <div className="text-center text-gray-600 mt-10">
                {message || "No procurement records found"}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Procurement List</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {procurementList.map((procurement) => (
                    <div
                        key={procurement._id}
                        className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
                    >
                        <h2 className="truncate w-full text-xl font-semibold text-gray-700 mb-4">{procurement.procure}</h2>
                        <p> Date submitted: {new Date(procurement.createdAt).toISOString().split('T')[0]}</p>
                        <p className={`text-sm ${procurement.status === "Cancelled" ? "text-red-500" : "text-green-500"} mb-4`}>
                            Status: {procurement.status}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcurementList;
