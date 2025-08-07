const UserModel = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const signup = async (req,res)=>{
  try{
    const {name, email,password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await UserModel.findOne({email})
    if(user){
      return res.status(409).json({message:"User already exist"})
    }
    const userModel = new UserModel({name, email, password: hashedPassword})
    await userModel.save()
    res.status(201).json({message:"User created successfully", success:true})
  }
  catch(err){
    res.status(500).json({message:err.message, success:false})
  }
}

const login = async (req,res)=>{
  try{
    const {email,password} = req.body
    const user = await UserModel.findOne({email})
    if(!user){
      return res.status(403).json({message:"Email or Password is wrong"})
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(403).json({message:"Email or Password is wrong"})
    }

    jwtToken = jwt.sign({email:user.email,_id:user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})
    return res.status(200).json({message:"Signin Success", success:true,email:user.email,name:user.name, token:jwtToken})
  }
  catch(err){
    res.status(500).json({message:err.message, success:false})
  }
}

module.exports = {signup,login}