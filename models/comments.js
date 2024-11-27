const { default: mongoose, Schema }=require('mongoose')

const comments=new mongoose.Schema({
    content:{
       type:String,
    },
    blogId:{
       type:Schema.Types.ObjectId,
       ref:"blog"
    },
    createdBy:{
      type:Schema.Types.ObjectId,
      ref:"user"
    }
},{timestamps:true})

const comment=mongoose.model("commentModel",comments);
module.exports=comment