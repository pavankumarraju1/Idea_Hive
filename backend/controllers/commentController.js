import blogModel from "../models/blogModel.js";
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
        const bData = await blogModel.findById(blogId);
        if(!bData){
            throw new Error("No blog found");
        }

        const commentData = new commentModel({comment,userId,blogId });
        const data = await commentData.save();
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


const getComments = async(req,res)=>{
    try {
        const blogId = req.params.blogId
        const data = await commentModel.find({blogId}).populate("userId","photourl name")
        if(!data){
            throw new Error("No comments found")
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export{
    addCommentController,
    getComments
}