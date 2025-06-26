const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const bodyparser=require('body-parser')
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes=require('./routes/firmRoutes');
const productRoutes=require('./routes/productRoutes')
const path=require('path')
const port=4000;
dotenv.config()


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("successfully connected to mongo db")
})
.catch((error)=>{
  console.log("failed to connect",error)
})

app.use(bodyparser.json());

app.use('/vendor',vendorRoutes);

app.use('/firm',firmRoutes);
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'));
app.listen(port,()=>{
  console.log(`server started and running at ${port}`)
});