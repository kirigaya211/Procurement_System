const mongoose = require("mongoose");

const procurementListSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[{
        itemId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Item",
            required:true
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