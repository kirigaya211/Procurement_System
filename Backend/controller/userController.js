const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const register = async(req, res,next)=>{
    try{
        const {name, email, password, role}= req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({name, email, password:hashedPassword, role})
        await user.save();
        return res.status(201).json({message:"User registered successfully"});
    }catch(error){
        next(error);
    }
};

const login = async(req, res)=>{
    try{
        const {email, password}= req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Invalid credentials"})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({error:"Invalid credentials"})
        }
        const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );
        res.status(200).json({token});
    }catch(error){
        next(error);
    }
}

const getUserProfile = async(req, res)=>{
    try{
        console.log(req.user.userId);
        const user = await User.findById(req.user.userId).select("-password")
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json(user);
    }catch(error){
        next(error);
    }
}




module.exports ={
    register,
    login,
    getUserProfile
}