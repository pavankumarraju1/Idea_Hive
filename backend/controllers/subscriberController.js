import { Types } from "mongoose";
import subscriberModel from "../models/subscriberModel.js";
import userModel from "../models/userModel.js";

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

export{ 
    addSubscriber,
    getSubsribers
}