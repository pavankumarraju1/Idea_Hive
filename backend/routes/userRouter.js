import express from "express";
import { getAllProfilesData, getProfileController,getUserDataById,updateProfileController } from "../controllers/userController.js";

import { userAuth } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();


userRouter.get('/profile', userAuth, getProfileController)
userRouter.get('/allProfiles',userAuth,getAllProfilesData)
userRouter.get('/getUser/:id',userAuth,getUserDataById)

userRouter.patch('/updateProfile/:id', userAuth, updateProfileController)

export default userRouter