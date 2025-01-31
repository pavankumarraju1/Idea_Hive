import express from "express";
import { getAllProfilesData, getProfileController,updateProfileController } from "../controllers/userController.js";

import { userAuth } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();


userRouter.get('/profile', userAuth, getProfileController)
userRouter.get('/allProfiles',userAuth,getAllProfilesData)

userRouter.patch('/updateProfile/:id', userAuth, updateProfileController)

export default userRouter