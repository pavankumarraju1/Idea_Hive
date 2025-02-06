import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";
import { addSubscriber, getSubscriberBlog, getSubsribers, unsunscribeControlelr } from "../controllers/subscriberController.js";

const subscriberRouter = express.Router()

subscriberRouter.post('/addSubscriber/:id',userAuth,addSubscriber)

subscriberRouter.get('/getSubscriber',userAuth,getSubsribers)
subscriberRouter.get('/getBlog/:subscriberId', userAuth, getSubscriberBlog)

subscriberRouter.delete('/unsubscribe/:id',userAuth,unsunscribeControlelr)


export default subscriberRouter