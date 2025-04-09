//modules package imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const procurementListRoutes = require("./routes/procurementListRoutes");

//modules in backend server
const errorHandler = require("./utils/errorHandler");


dotenv.config();



const connectToDatabase = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Connected to MongoDB");
    }catch(error){
        console.error("Error connecting to MongoDB:", error);
    }
};
 connectToDatabase();
 const app = express();
 app.use(express.json());
 app.use(cors());
 app.use("/api/users", userRoutes);
 app.use("/api/procurement", procurementListRoutes);


 app.use(errorHandler);


 app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
 });