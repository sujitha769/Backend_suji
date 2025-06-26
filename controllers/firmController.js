const Firm=require('../models/Firm');
const Vendor=require('../models/Vendor');
const multer=require('multer');
  const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});
const upload = multer({ storage:storage });



const addFirm=async(req,res)=>{
try {
const { firmName, area, category, region, offer } = req.body;


  const image=req.file?req.file.filename:undefined;





  const vendor=await Vendor.findById(req.vendorId);
  if(!vendor){
    res.status(404).json({message:"vendor not found"})
  }

  const firm = new Firm({firmName,area,category,region,offer,image,vendor:vendor._id

  })
 const savedFirm= await firm.save();
 vendor.firm.push(savedFirm)
 await vendor.save()

  return res.status(200).json({message:"firm added successfully"})
} catch (error) {
  console.error(error)
  res.status(500).json("internal server error")
  
}


}

const deleteFirmById=async(req,res)=>{
  try {
    const firmId=req.params.firmId;
    const deletedProduct=await Firm.findByIdAndDelete(firmId)
    if(!deletedProduct){
      return res.status(404).json({error:"no product found"})
    }
  } catch (error) {

         console.error(error);
    res.status(500).json({error:"internal server error"})
  }
}
module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}//exporting process with image