const mongoose=require('mongoose');
const Product = require('./Product');
const firmSchema=new mongoose.Schema({
  firmName:{
    type:String,
    required:true,
    unique:true
  },
  area:{
    type:String,
    required:true,
  },
    category:{
      type:[
        {
          type:String,
          enum:['veg','nonveg']
        }
      ]
    },
    region:{
      type:[
        {
          type:String,
          enum:['south-indian','north-indian','chinese','bakery']
        }
      ]
    },
 offer:{
  type:String,
  
 },
 image:{
  type:String
 },
 vendor:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'vendor'
    
  }
 ],
   products:[
  {
    type : mongoose.Schema.Types.ObjectId,
       ref:'Product'
  }
   ]

  
})
const Firm=mongoose.model('firm',firmSchema);
module.exports=Firm;