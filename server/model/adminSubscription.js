import mongoose from "mongoose";

export const userSchema=new mongoose.Schema({
    userId: {
      type:String
    },
    Period:{
        type:String,
        required:true,
    },
    Price:{
        type:Number,
        required:true,
    },
    NoOfBoost:{
        type:Number
    },
    Features: [
        {
          title: String,
          icon: String,
          limit: String,
        }],
    Type:{
        type:String,
        required:true,
    }

})
export default mongoose.model.adminSubscription || mongoose.model('adminSubscriptions',userSchema) 