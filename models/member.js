import mongoose from './index.js'


const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

const memberSchema = new mongoose.Schema({
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
        required:[true,"password number is required"]
    },
    address:{
        type:String
        
    },
    role:{
        type:String,
        default:"user"
        
    },
   
    organisation:{
        type:String,
        default:""
    },
   
    dealing:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    image:{
        type:String,
        // required:[true,"image is required"]
    },
    web:{
        type:String,
        // required:[true,"image is required"]
    }

},
{
    collection:'member',
    versionKey:false
})

const MemberModel = mongoose.model('member',memberSchema)


export default MemberModel