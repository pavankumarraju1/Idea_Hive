import mongoose, { Schema,model } from "mongoose";
import validator from 'validator'

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
        maxlength:[50,"the length is exceeding"]
    },
    description: {
        type: String,
        required: true,
        maxlength: [50, "the length is exceeding"]
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://drive.google.com/file/d/1j43s-ZXtnyMs4jfFT72S-4D7KZhk13Mx/view?usp=sharing",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Not a valid url: "+value)
            }
        }

    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{
    timestamps:true
})


const blogModel = new model('blog',blogSchema)

export default blogModel