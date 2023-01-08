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
        type:String,
        required: true
    },
    categoryID: {
        type:String,
        required:true
    },
    typeID: {
        type:String,
        required:true
    }
})

const Product = model("Product", ProductSchema);

export default Product