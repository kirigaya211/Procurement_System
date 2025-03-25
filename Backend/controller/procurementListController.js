const ProcurementList = require("../models/procurementList");
const dotenv = require("dotenv");
dotenv.config();

const addProcurement = async(req,res,next)=>{
    try{
        const{items}=req.body;
        const procurement = new ProcurementList({
            items,
            procure,
            user: req.user.userId
        });
        await procurement.save();
        res.status(201).json({message:"Procurement Request Submitted"})
    }catch(error){
        next(error);
    }
};

const getProcurement = async(req,res,next)=>{
    try{
        const{id}= req.params;
        const procurement = await ProcurementList.findById(id);
        if(!procurement) {
            return res.status(404).json({message:"Procurement not existing"});
        }
        return res.status(200).json(procurement);
    }catch(error){
        next(error)
    }
}

const getAllProcurement = async(req,res,next)=>{
    try{
        const procurementList = await ProcurementList.find();
        if(!procurementList){
            return res.status(404).json({message:"No procurement request found"});
        } 
        return res.status(200).json(procurementList);
    }catch(error){
        next(error);
    }
}

const getAllProcurementUser = async(req,res,next) =>{
    try{
        const procurementList = await ProcurementList.find({user:req.user.userId}).populate("user");
        if(!procurementList || procurementList.length===0){
            return res.status(404).json({message:"No procurement request found"});
        }
        return res.status(200).json(procurementList);
    }catch(error){
        next(error);
    }
}

module.exports ={
    addProcurement,
    getProcurement,
    getAllProcurement,
    getAllProcurementUser,
}