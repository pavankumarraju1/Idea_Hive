import express from 'express'
import { userAuth } from '../middlewares/authMiddleware.js';
import { sendConnection } from '../controllers/connectionController.js';

const conRouter = express.Router();

conRouter.post('/sendConnection',userAuth,sendConnection)

export default conRouter