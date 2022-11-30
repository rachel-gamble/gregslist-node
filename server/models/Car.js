import { Schema } from "mongoose";



export const CarSchema = new Schema({
    make: { type: String, required: true }, //required: means it has to have a value to be stored
    model: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String },
    imgUrl: { type: String, required: true, maxLength: 255 }, //maxLength is a way to verify data
    color: { type: String },
    price: { type: Number, required: true, default: 1 }//default sets a value if one isn't given
}, { timestamps: true, toJSON: { virtuals: true } })//second object is the options object