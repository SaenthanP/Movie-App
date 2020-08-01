const router=require('express').Router();
let User=require('../models/user.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

router.post('/register',async(req,res)=>{
   
    try{
        let {username,password,confirmPassword}=req.body;
        if(!username||!password||!confirmPassword){
            return res.status(400).json({Error:"Not all fields entered"});
        }
        if(username<3){
            return res.status(400).json({Error:"Username is not atleast 3 characters long"});
        }
        if(password<8){
            return res.status(400).json({Error:"Password is not atleast 8 characters long"});
        }
        if(password!==confirmPassword){
            return res.status(400).json({Error:"Passwords do not match"});
        }
        const isTaken=await User.findOne({username:username});
        if(isTaken){
            return res.status(400).json({Error:"Username is taken"});
        }
        const salt=await bcrypt.genSalt(12);
        const hashedPassword=await bcrypt.hash(password,salt);
        
        const newUser=new User({
            username,
            password:hashedPassword
        });
        
        newUser.save()
        .then(()=>res.json('User added!'))
        .catch(err=>res.status(400).json({Error: err}));
    }catch(err){
        return res.status(500).json({Error:err});
    }
});