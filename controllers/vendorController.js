// const vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const Vendor = require('../models/Vendor');
const dotenv=require('dotenv')

dotenv.config();
const secretkey=process.env.WhatIsYourName


const vendorRegister=async(req,res)=>{
  const {username,email,password}=req.body;//data coming from Vendor we already import that Vendor data
  try{
    const vendorEmail=await Vendor.findOne({email})
    if(vendorEmail){//already db lo ee email untey
      return res.status(400).json("email all ready taken")
    }
    const hashedPasword=await bcrypt.hash(password,10)//hashing the password

    const newVendor=new Vendor({
      username,email,password:hashedPasword
    });
    await newVendor.save();
    res.status(200).json({message:"vendor registered succesfully"})
    console.log("vendor registered successfully")


  }catch(error){
    console.log(error);
    res.status(401).json({error:"internal server error"})
    

  }

}

const vendorLogin=async(req,res)=>{
  const{email,password}=req.body;
  try{
    const vendor=await Vendor.findOne({email});
    if(!vendor || !(await bcrypt.compare(password,vendor.password))){
      return res.status(401).json({error:"invalid username or password"})
    }

    const token =jwt.sign({vendorId:vendor._id},secretkey,{expiresIn:"1h"})
    res.status(200).json({success:"login successfull",token});
    console.log("token value",token);
  }catch(error){
 console.log(error);
 res.status(500).json({error:"internal error"})

  }
}

const getAllVendors=async(req,res)=>{
  try {
    const vendors=await Vendor.find().populate('firm');
    res.status(200).json({ vendors }); 
  } catch (error) {
    console.log(error);
 res.status(500).json({error:"internal error"})
    
  }
}

const getvendorId=async(req,res)=>{

  const vendorId=req.params.apple;
  try {
    const vendor=await Vendor.findById(vendorId).populate('firm');
    if(!vendor){
      return res.status(404).json({error:"vendor not found"})
    }
    res.status(200).json({vendor})
  } catch (error) {
        console.log(error);
 res.status(500).json({error:"internal error"})
    
  }
}
module.exports={vendorRegister,vendorLogin,getAllVendors,getvendorId}