import mongoose, { Schema,model } from "mongoose";

const connectionSchema = new Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["subscribe"],
            message:"invalid type"
        }
    }
},{timestamps:true})


const connectionModel = new model("connection",connectionSchema);

export default connectionModel;