import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import connect from './utils/connection.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRouter.js';
import conRouter from './routes/connectionRouter.js';
import blogRouter from './routes/blogRouter.js';
import commentRouter from './routes/commentRouter.js';
import subscriberRouter from './routes/subscriberRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;


app.use(express.json({ 
    limit: '50mb'
})); 
app.use(cors({
    methods:['GET','POST','PATCH','PUT','DELETE'],
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser());

 
app.use('/auth',authRouter) 
app.use('/user',userRouter)  
app.use('/connection',conRouter)
app.use('/blog',blogRouter)
app.use('/comment',commentRouter)   
app.use('/subscriber',subscriberRouter)         

 
connect().then(()=>{ 
    console.log("db success");
    app.listen(PORT, () => {
        console.log(`server running in ${PORT}`);
    })  
}).catch((err)=>{
    console.log(err); 
})
 