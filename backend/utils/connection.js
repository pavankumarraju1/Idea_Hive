import mongoose from "mongoose";

const connect =()=>{
    return mongoose.connect(process.env.mongo_url);  
}

export default connect; 