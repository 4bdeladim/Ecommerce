import {model, Schema} from "mongoose"


const ProductSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required: true
    },
    price: {
        type:Number,
        required: true
    },
    category: {
        type:String,
        required:true
    },
    sales: {
        type:Number,
        default: 0
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    img: {
        type:String
    },
    amountInInventory: {
        type:Number,
        required: true
    }
})

const Product = model("Product", ProductSchema);

export default Product