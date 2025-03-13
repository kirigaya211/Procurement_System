import {NavLink} from "react-router-dom";

const Body =()=>
{


    return(
        <>
        <div className="container flex justify-around">
            <NavLink to="/procurement"><div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-6 h-50">
            <h2 className="text-xl font-semibold text-gray-800">Procurement Request</h2>
            </div></NavLink>
            <NavLink to="/quatation"><div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-6 h-50">
            <h2 className="text-xl font-semibold text-gray-800">Request for Quotation</h2>
            </div></NavLink>
            
            
        </div>
        </>
    )
}

export default Body;