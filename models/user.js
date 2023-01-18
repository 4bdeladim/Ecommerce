import {model, Schema} from "mongoose"

const UserSchema = new Schema({
    username: {
        type:String,
        minLength: 4,
        required: true,
        unique: true,
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        minLength: 8,
        required: true,
    },
    role: {
        type:String,
        default:"user",
        enum: ["owner","admin","user"]
    },
    sessionId: {
        type:String,
        default: null
    },
    orders: {
        type: Array,
        default: []
    },
    cart: {
        type:Array,
        default: []
    },
    confirmationCode: {
        type:String,
        required: true
    },
    confirmed: {
        type:Boolean,
        default:false
    },
    recoveryCode: {
        type: String,
        default: null
    },
    SBadress: {
        type:String, 
        default: null
    },
    date: {
        type:Date,
        default: new Date()
    }
})

const User = model("User", UserSchema)
export default User