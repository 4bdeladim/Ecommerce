import {model, Schema} from "mongoose"


const OrderSchema = new Schema({
    productID:{
        type:String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    productPrice: {
        type:Number,
        required: true
    },
    totalPrice: {
        type:Number,
        required: true
    },
    date: {
        type: Date,
    },
    userID: {
        type:String,
        required: true
    },
    status: {
        type:String,
        required: true
    }
});

const Order = model("Order", OrderSchema);

export default Order