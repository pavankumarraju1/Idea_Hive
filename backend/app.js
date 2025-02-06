import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from "path";

import connect from './utils/connection.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRouter.js';
import conRouter from './routes/connectionRouter.js';
import blogRouter from './routes/blogRouter.js';
import commentRouter from './routes/commentRouter.js';
import subscriberRouter from './routes/subscriberRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3002; 

const __dirname = path.resolve();
 
app.use(express.json({ 
    limit: '50mb'
})); 
app.use(cors({
    methods:['GET','POST','PATCH','PUT','DELETE'],
    origin: ['http://localhost:5173'],
    credentials: true
}))
app.use(cookieParser());

 
app.use('/api/auth',authRouter) 
app.use('/api/user',userRouter)  
app.use('/api/connection',conRouter)
app.use('/api/blog',blogRouter)
app.use('/api/comment',commentRouter)   
app.use('/api/subscriber',subscriberRouter)    

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}
 
 
connect().then(()=>{ 
    console.log("db success");
    app.listen(PORT, () => {
        console.log(`server running in ${PORT}`);
    })  
}).catch((err)=>{
    console.log(err); 
})
 