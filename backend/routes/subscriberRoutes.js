import express from "express";
import { userAuth } from "../middlewares/authMiddleware.js";
import { addSubscriber, getSubsribers } from "../controllers/subscriberController.js";

const subscriberRouter = express.Router()

subscriberRouter.post('/addSubscriber/:id',userAuth,addSubscriber)
subscriberRouter.get('/getSubscriber',userAuth,getSubsribers)


export default subscriberRouter