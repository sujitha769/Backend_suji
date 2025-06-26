const vendorController=require('../controllers/vendorController')
const express =require('express');
const router=express.Router();//this is used to creaet a api end point ante url lo name ivvadam
router.post('/register',vendorController.vendorRegister)
router.post('/login',vendorController.vendorLogin);
router.get('/all-vendors',vendorController.getAllVendors);
router.get('/single-vendor/:apple',vendorController.getvendorId);

module.exports=router;