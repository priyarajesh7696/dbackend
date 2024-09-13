import mongoose from './index.js'


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        validate:{
            validator:validateEmail,
            message: props => `${props.value} is not a valid email!`
        }
    },
    mobile:{
        type:Number,
        required:[true,"mobile number is required"]
    },
    password:{
        type:String,
        required:[true,"possword is required"]
    },
    
    role:{
        type:String,
        default:"user"
    },
   
    createdAt:{
        type:Date,
        default:Date.now()
    },
    

},
{
    collection:'user',
    versionKey:false
})

const UserModel = mongoose.model('user',userSchema)


export default UserModel