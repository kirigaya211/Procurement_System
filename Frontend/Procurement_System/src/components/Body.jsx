import { Link, useNavigate } from "react-router-dom";

const Body =()=>
{


    return(
        <>
     <div className="container flex flex-col md:flex-row justify-center items-center py-16 px-10 gap-10">
    <Link to="/procurement">
        <div className="w-80 h-60 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg bg-white p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Procurement Request</h2>
        </div>
    </Link>
    <Link to="/procurementList">
        <div className="w-80 h-60 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg bg-white p-8 transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Procurement List</h2>
        </div>
    </Link>
</div>



        </>
    )
}

export default Body;