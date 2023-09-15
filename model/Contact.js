import mongoose from "mongoose";

const contactSchema =mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required:[true, "Please provide the contact name"],
    },
    email:{
        type:String,
        required:[true, "Please provide a valid email"],
    },
    contact:{
        type:Number,
        required:[true, "Please provide the contact name"],
    }, 
},
{
    timestamp:true,
},
);
export default mongoose.model('Contact', contactSchema);