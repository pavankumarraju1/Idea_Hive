import mongoose, { Schema,model } from "mongoose";

const commentSchema = new Schema({
    comment:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'blog'
    }
})

const commentModel = new model("comment",commentSchema)

export default commentModel