const mongoose=require('mongoose')
const vendorschema=new mongoose.Schema({
  //preparing schema
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
  type:String,
  required:true
  },
  firm:[
 {
   type : mongoose.Schema.Types.ObjectId,
      ref:'firm'
 }
  ]

});
const Vendor=mongoose.model('Vendor',vendorschema)
module.exports=Vendor