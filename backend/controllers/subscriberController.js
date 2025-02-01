import { Types,mongoose } from "mongoose";
import subscriberModel from "../models/subscriberModel.js";
import userModel from "../models/userModel.js";
import blogModel from "../models/blogModel.js";

const safeDetails = "-email -password"

const addSubscriber = async(req,res)=>{
    try {
        let subscriberId = req.params.id
        subscriberId = new Types.ObjectId(subscriberId)
        const userId = req.user._id;
        const subscriberDoExists = await userModel.findById(subscriberId)

        if(!subscriberDoExists){
            throw new Error("user not exists")
        }

        if(userId.toString() == subscriberId){
            throw new Error("you cant subscribe to yourself")
        }


        
        const subscriber = await subscriberModel.findOne({userId,subscriberId})
        if(subscriber){
            throw new Error("already subscribed")
        }

        const subData = new subscriberModel({subscriberId,userId})
        await subData.save()
        res.status(201).send("subscribed")
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getSubsribers = async (req,res)=>{
    try {
        const user = req.user;
        const data = await subscriberModel.find({userId:user._id}).populate("subscriberId",safeDetails)
        if(!data){
            throw new Error("No subscribers");
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const getSubscriberBlog = async(req,res)=>{
    try {
        let subId = req.params.subscriberId
        const userId = req.user._id
        subId = new mongoose.Types.ObjectId(subId)

        // checking if the subscriber do present or not
        const subscriberDoExists = await userModel.findById(subId)
        if (!subscriberDoExists) {
            throw new Error("user not exists")
        }

        if (userId.toString() == subId) {
            throw new Error("try for other users")
        }
       
        const subscriber = await subscriberModel.findOne({ userId, subscriberId:subId })
        if (!subscriber) {
            throw new Error("Not a subscriber!please subscribe to view content")
        }
        
        const data = await blogModel.find({author:subId})
        if(!data){ 
            throw new Error("No blogs");
        }
        res.status(200).json(data)

    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

export{ 
    addSubscriber,
    getSubsribers,
    getSubscriberBlog
}