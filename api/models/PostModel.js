import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;


const postSchema = new Schema({
 title: {
    type:String,
    required: true
 },
 summary: {
    type: String, 
    required: true
 },
 img: {
    type: String,
    required: true
 },
 content: {
    type: String,
    required: true
 },
 author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
 }
}, {
    timestamps: true
});
const Post = mongoose.model('Post', postSchema)
export default Post

