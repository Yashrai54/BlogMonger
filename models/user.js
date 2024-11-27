const {Hmac,randomBytes, createHmac}=require('crypto')
const {Schema, default: mongoose}=require('mongoose');
const { createTokenUser } = require('../services/auth');

const UserSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,

    },
    profileImageURL:{
        type:String,
        default:'/images/ok.png'
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }
},{timestamps:true})

UserSchema.pre("save",function(next){
    const user=this;

    if(!user.isModified("password")) return;
    const salt=randomBytes(16).toString();
    const hashPassword=createHmac('sha256',salt).update(user.password).digest("hex");
    
    this.salt=salt;
    this.password=hashPassword;
    next();
})
UserSchema.static("matchPassword",async function(email,password){
    const user=await this.findOne({email})
    if(!user) {
        throw new Error("email or password did not matched")
    }

    const salt=user.salt;
    const hashPassword=user.password;

    const userprovidedpass=createHmac('sha256',salt).update(password).digest("hex");

    if(hashPassword!=userprovidedpass){
        throw new Error('Email or password did not matched')
    }
    
    const token=createTokenUser(user)
    return token
})

const user=mongoose.model('userModel',UserSchema)

module.exports=user;