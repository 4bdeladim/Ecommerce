import {model, Schema} from "mongoose"


const TypeSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    for: {
        type:String,
        enum: ["men", "women", "kids", "jewelery", "all"]
    }
});

const Type = model("Type", TypeSchema);

export default Type