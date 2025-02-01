import { Schema,model } from "mongoose"

const subscriberSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    subscriberId:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},{timestamps:true})

const subscriberModel = new model('subcriber',subscriberSchema)

export default subscriberModel;