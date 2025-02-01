import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";
import { addCommentController, getComments } from "../controllers/commentController.js";

const commentRouter = express.Router();


commentRouter.post('/addComment/:blogId',userAuth,addCommentController)
commentRouter.get('/getComments/:blogId',userAuth,getComments)

export default commentRouter