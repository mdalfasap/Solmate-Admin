import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    liked:{
        type:Boolean,
        required: true
    }
});
     
export default mongoose.model('likeModel', likeSchema);