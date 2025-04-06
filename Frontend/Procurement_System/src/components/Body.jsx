import { Link } from "react-router-dom";

const Body = () => {
  return (
    <>
      <div className="container flex flex-col md:flex-row justify-center items-center py-16 px-10 gap-10">
        
        <Link to="/procurement">
          <div className="w-80 h-60 flex items-center justify-center rounded-xl bg-orange-400 p-8 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-red-500">
            <h2 className="text-3xl font-semibold text-white text-center transform transition duration-300 ease-in-out hover:scale-110">
              Procurement Request
            </h2>
          </div>
        </Link>

        <Link to="/procurementList">
          <div className="w-80 h-60 flex items-center justify-center rounded-xl bg-yellow-400 p-8 shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:bg-red-500">
            <h2 className="text-3xl font-semibold text-white text-center transform transition duration-300 ease-in-out hover:scale-110">
              Procurement List
            </h2>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Body;
