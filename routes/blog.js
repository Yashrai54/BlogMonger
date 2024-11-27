const express=require('express');
const Router=express.Router();
const blog=require('../models/blog')
const Multer=require('multer')
const path=require('path');
const comment=require('../models/comments');
const Storage=Multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.resolve("./public/uploads"))
    },
    filename:function(req,file,cb){
        const filename=`${Date.now()}-${file.originalname}`
        cb(null,filename)
    }
})
const upload=Multer({storage:Storage})
Router.get("/add-new-blog",(req,res)=>{
    return res.render("addblog",{
        user:req.user
    })
})
Router.get("/:id",async(req,res)=>{
    const blogContent=await blog.findById(req.params.id)
    const comments=await comment.find({blogId:req.params.id})
    return res.render("blog",{
        user:req.user,
        blog:blogContent,
        comments:comments
    })
})
Router.post("/",upload.single("imageUpload"),async(req,res)=>{
    const {title,body}=req.body
    const blogs=await blog.create({
         title:title,
         body:body,
         createdBy:req.user._id,
         coverimageURL:`/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blogs._id}`)
})
Router.post("/comments/:blogId",async(req,res)=>{
   const comments=await comment.create({
         content:req.body.content,
         blogId:req.params.blogId,
         createdBy:req.user._id
   }) 
   console.log(comments)
   return res.redirect(`/blog/${req.params.blogId}`)
})


module.exports=Router