const mongoose = require("mongoose");

const procurementListSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[{
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:false
        },
        quantity:{
            type:Number,
            required:true,
        }
    }]
},
{
    timestamps:true
});

const procurementList = mongoose.model("ProcurementList", procurementListSchema);
module.exports = procurementList;