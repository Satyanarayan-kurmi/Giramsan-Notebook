const express=require('express');
const router=express.Router();
const User=require('../models/User');
const {body , validationResult}=require('express-validator')
const bcrypt =require('bcryptjs')
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'satyaisagoodboy';
// Route 1 : create user
router.post('/createuser',[
    body('name',"Name should have atleast 3 character").isLength({min:3}),
    body('email',"enter valid email id").isEmail(),
    body('password',"password should have atleast 4 character").isLength({min:4}),
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        success=false;
        return res.status(400).json({success,errors:errors.array()});
    }
    try{
        let user=await User.findOne({email:req.body.email});
        if(user){
            success=false;
            return res.status(400).json({success,error:"user already exists"})
        }
        const  salt=await bcrypt.genSalt(10);
        const secPass=await bcrypt.hash(req.body.password,salt);

        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass,
        })
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.status(200).json({success,authtoken});
        console.log(authtoken)
    }catch(error){
        console.log(error.message);
        success=false;
        res.status(400).json({success,error:"some error occured"});
    }  
})

//Route 2 : authenticate a user
router.post('/login',[
    body('email','Invalid email id').isEmail(),
    body('password','Password should have atleast 4 character').isLength(4)
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors:errors.array});
    
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user)
            return res.status(400).json({error:"Invalid email id or password...!"});

        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success,error:"Invalid email id or password...!"});

        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true;
        // console.log("you are correct user")
        res.json({success,authtoken});
        
    }catch(error){
        console.log('some error occured')
        res.status(400).json({message:error.message});
    }
})

//Route 3 : get user details
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        let user_id=req.user.id;
        let user=await User.findById(user_id).select('-password');
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
    }
    
})
module.exports=router;