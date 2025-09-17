import mongoose from "mongoose";


const postSchema= new mongoose.Schema({
    title:String,
    author:String,
    description:String,

},{
    timestamps:true
});

export const Post=mongoose.models.Post || mongoose.model('Post',postSchema);