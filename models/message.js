import mongoose from './index.js'


const user_message = new mongoose.Schema({
    sender:{
        type:String,
        required:[true,"Name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
    },
    role:{
        type:String,
        
    },
    createdAt:{
        type:Date,

    },
    message:{
        type:String,
       default:""
    },

},
{
    collection:'message',
    versionKey:false
})

const MessageModel = mongoose.model('message',user_message)


export default MessageModel