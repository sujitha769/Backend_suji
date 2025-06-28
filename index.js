const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const bodyparser=require('body-parser')
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes=require('./routes/firmRoutes');
const productRoutes=require('./routes/productRoutes')
const cors=require('cors');
const path=require('path')


const port= process.env.port||4000;
dotenv.config()
app.use(cors())


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

app.use('/',(req,res)=>{
  res.send("<h1>welcome")
})