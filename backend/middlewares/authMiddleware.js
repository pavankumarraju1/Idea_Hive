import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';


const userAuth = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"please login!!"})   
        }
        const {id} = jwt.verify(token, process.env.tokenkey)
        const userData = await userModel.findById(id);
        if(!userData){
            throw new Error("user not found");
        }

        req.user = userData;
        next()
    } catch (error) {
        res.status(401).json({message:error.message})
    }
}

export {
    userAuth
}