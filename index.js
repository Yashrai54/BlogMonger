const express=require('express');
const path=require('path')
const app=express();
const blog=require('./models/blog')
const cookieParser=require('cookie-parser')
const mongoose=require('mongoose')
const userRouter=require('./routes/user');
const { checkforcookie } = require('./middlewares/auth');
const blogRouter=require('./routes/blog')
require('dotenv').config();


const PORT=process.env.PORT;

mongoose.connect(process.env.MONGO_URI).then(e=>console.log('mongo connected'))
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkforcookie("token"))
app.use(express.static(path.resolve("./public")))

app.get('/',async(req,res)=>{
    const blogs=await blog.find({}).sort("createdAt")
    res.render("home",{
        user:req.user,
        blogs:blogs
    })
})

app.use("/user",userRouter)
app.use("/blog",blogRouter)
app.listen(PORT,()=>{console.log("server started")})