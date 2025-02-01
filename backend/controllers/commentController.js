import commentModel from "../models/commentModel.js";
import {Types} from "mongoose";

const addCommentController = async(req,res)=>{
    const {comment} = req.body;
    try {
        const userId = req.user._id;
        let {blogId} = req.params
        blogId = new Types.ObjectId(blogId)
        if(!userId){
            throw new Error("invalid user");  
        }
        const commentData = new commentModel({comment,userId,blogId });
        const data = await commentData.save();
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export{
    addCommentController
}