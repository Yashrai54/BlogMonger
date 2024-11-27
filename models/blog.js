const { Schema, default: mongoose }=require('mongoose')

const blogSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
       type:String,
       required:true
    },
    coverimageURL:{
        type:String,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"userModel"
    }
},{timestamps:true})

const blog=mongoose.model("blogModel",blogSchema)
module.exports=blog