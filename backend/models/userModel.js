import {Schema,model} from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:[20,"name length exceeding"]
    },
    email:{
        type:String,
        unique:true,
        required: true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address:"+value);    
            }
        }
    },
    password:{
        type:String,
        required: true,
        trim: true,
    },
    photourl:{
        type:String,
        default: "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?ga=GA1.1.1724609248.1723135287&semt=ais_hybrid",
        validate(value){
            if (!validator.isURL(value)){
                throw new Error("invalid url :" + value);    
            }
        }
    },
    about:{
        type:String,
        default:"..."
    },
    age:{
        type:Number,
        min:[10,"you should be atleast 10 years old"],
        require:true
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","others"],
            message:"invalid gender"
        },
        required:true
    }
},{
    timestamps:true
})

userSchema.statics.hashPassword = function(password){
    return bcrypt.hash(password,10);
}

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password,this.password);
}
 
const userModel = model('user',userSchema);
 
export default userModel;