import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'


const generateToken = (id)=>{
    return jwt.sign({id},process.env.tokenkey,{
        expiresIn: '1h'
    });
}

const signupController =async(req,res)=>{
    const {name,email,password,age,gender} = req.body;
    try {
        const data = await userModel.findOne({email});
        if(data){
            throw new Error("try another email");     
        }
    
        const hashedPassword = await userModel.hashPassword(password);

        const user = new userModel({name,email,password:hashedPassword,age,gender});
        await user.save();

        const token = generateToken(user._id)
        res.cookie('token',token)

        res.status(201).json({message:"user created",user:user})
    } catch (error) {
        res.status(401).json({message:error.message})
    }
}

const loginController = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const data = await userModel.findOne({email});
        if(!data){
            throw new Error("invalid credentials");
        }
        const passwordCheck = await data.comparePassword(password)
        if(!passwordCheck){
            throw new Error("invalid credentials");   
        }

        const token = generateToken(data._id);
        res.cookie("token",token);

        res.status(200).json({ message:"login successful",user:data})
    } catch (error) {
        res.status(401).json({ message:error.message})
    }
}

const logoutController = (req,res)=>{
    try {
        //res.clearCookie('token')
        res.cookie('token',null,{
            maxAge:0
        })
        res.status(200).json({ message:"logout success"})
    } catch (error) {
        res.status(401).json({message:error.message})
    }
}
 

export {
    signupController,
    loginController,
    logoutController,
}