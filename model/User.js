import mongoose from "mongoose";

const userSchema =mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please provide the username"],
        maxLength:50,
        minLength:3,
    },
    email:{
        type:String,
        required:[true, "Please provide a valid email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique: [true, "Email address already taken..."]
    },
    password:{
        type:String,
        required:[true, "Please provide a passowrd"],
    }, 
},
{
    timestamp:true,
},
);
export default mongoose.model('User', userSchema);