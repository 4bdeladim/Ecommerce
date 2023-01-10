import {model, Schema} from "mongoose"


const ProductSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    descreption: {
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
})

const Product = model("Product", ProductSchema);

export default Product