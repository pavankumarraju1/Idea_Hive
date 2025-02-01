import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";
import { addCommentController } from "../controllers/commentController.js";

const commentRouter = express.Router();


commentRouter.post('/addcomment/:blogId',userAuth,addCommentController)

export default commentRouter