const express=require('express');
const user=require("../models/user")


const router=express.Router();

router.get('/signin',(req,res)=>{
     return res.render("signin")
})
router.get('/signup',(req,res)=>{
    return res.render("signup")
})
router.get("/logout",(req,res)=>{
    return res.clearCookie("token").redirect("/")
})

router.post('/signin',async(req,res)=>{
    const{email,password}=req.body;
    try{
    const token=await user.matchPassword(email,password);
    res.cookie('token', token).redirect("/")
}
    catch(error){
        res.render("signin",{
            error:"incorrect email or password"
        })
    }
})

router.post("/signup",async(req,res)=>{
    const {fullName,email,password}=req.body;
    await user.create({
        fullName,
        email,
        password
    })
    return res.redirect("/")
})

module.exports=router;