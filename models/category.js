import {model, Schema} from "mongoose"


const CategorySchema = new Schema({
    name: {
        type:String,
        required: true
    }
});

const Category = model("Category", CategorySchema);

export default Category