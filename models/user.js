import {model, Schema} from "mongoose"

const UserSchema = new Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        min: 4
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
        min: 8
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
    }
})

const User = model("User", UserSchema)
export default User