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
    }],
    status:{
        type:String,
        required:true,
        default:"submitted",
        enum:["submitted","processed","RQ","awarded"]
    }
},
{
    timestamps:true
});

const procurementList = mongoose.model("ProcurementList", procurementListSchema);
module.exports = procurementList;