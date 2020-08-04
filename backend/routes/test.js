const router=require('express').Router();
let User=require('../models/user.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.post('/protected',async(req,res)=>{
  res.status(200).json("SUCESS BOI"+req.user);
   
});



module.exports=router;