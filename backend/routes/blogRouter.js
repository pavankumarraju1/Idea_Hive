import express from "express";
import { createBlog, getAllBlogs, getBlog } from "../controllers/blogController.js";
import { userAuth } from "../middlewares/authMiddleware.js";

const blogRouter = express.Router()

blogRouter.post('/addblog',userAuth,createBlog)
blogRouter.get('/getallblogs',userAuth,getAllBlogs)
blogRouter.get('/getblog/view/:id',userAuth,getBlog)

export default blogRouter 