import cloudinary from "../utils/cloudinary.js";
import userModel from "../models/userModel.js";


const getProfileController = async (req, res) => {
    try {
        //const data = req.user;
        res.status(200).json(req.user);
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

const getAllProfilesData = async(req,res)=>{
    try {
        const data = await userModel.find({});
        if(data.length==0){
            throw new Error("no user found");      
        }
        const user = req.user
        const fData = data.filter((val)=>val._id.toString() !== user._id.toString())
        res.status(200).json(fData)
    } catch (error) {
        res.status(401).json({message:error.message})
    }
}

const updateProfileController = async (req, res) => {

    let cloudResponse = ""
    //const {image,name,age,gender,about} = req.body
    const allowUpdateFields = ["name", "age", "gender", "image", "about"]
    //console.log(data);
    let isUpdateAllowed = Object.keys(req.body).reduce((acc,key)=>{
        if(allowUpdateFields.includes(key) && req.body[key]!=undefined && req.body[key]!=""){
            acc[key] = req.body[key]
        }
        return acc;
    },{})
    //console.log(isUpdateAllowed);
    try {
        const id = req.params?.id
        if (Object.keys(isUpdateAllowed).length==0) { 
            throw new Error("update not allowed");
        }
        if (isUpdateAllowed.image) {
            try {
                cloudResponse = await cloudinary.uploader.upload(isUpdateAllowed.image, { folder: "userPictures" });
                isUpdateAllowed.photourl = cloudResponse?.secure_url;
                delete isUpdateAllowed.image
            } catch (error) {
                throw new Error("Failed in uploading image")
            }
        } 
        
        // const sendData = cloudResponse?.secure_url ? { ...isUpdateAllowed, photourl: cloudResponse?.secure_url } : isUpdateAllowed

        const updatedData = await userModel.findByIdAndUpdate(id, isUpdateAllowed, {
            //runValidators:true (if we have put the validators at schema level only if a new document got created then the validators be applied so to apply the validators to existing document we need to write this line)
            new: true,
            //runValidators: true
        })
        res.status(200).json(updatedData); 
    } catch (error) {
        res.status(401).json({ message: error.message })
    } 
}

export{
    getProfileController,
    getAllProfilesData,
    updateProfileController
}