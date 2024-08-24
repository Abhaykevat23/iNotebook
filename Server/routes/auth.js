const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
var fetchuser=require('../middlewear/fetchuser');

const JWT_SECRET='abhaykevat';
let success=true;

// Route 1 : create a user ====================================
router.post('/createuser', [
    body('name', 'Enter Valid Name').isLength({ min: 3 }),
    body('email', 'Enter Valid email').isEmail().notEmpty(),
    body('password', 'Enter Valid password').isLength({ min: 5 })
], async (req, res) => {

    // if there are errors then send bad request error message
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
    }
    // check user with this email exist or not
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            success=false;
            return res.status(400).json({ success,error: "Sorry with this email user already exist..." });
        }

        const salt= await bcrypt.genSalt(10);
        const secPass= await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data={
            user:{
                id:user.id,
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authToken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


// Route 2 : authenticate a user =========================
router.post('/login', [
    body('email', 'Enter Valid email').isEmail().notEmpty(),
    body('password', 'Enter Valid password').notEmpty()
], async (req, res) => {

    // if there are errors then send bad request error message
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.send({ errors: result.array() });
    }

    const {email,password}=req.body;
    try {
        let user= await User.findOne({email});
        if(!user){
            success=false;
            return res.status(400).json({success,error:"Please try to login with correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success=false;
            return res.status(400).json({success,error:"Please try to login with correct credentials"})
        }

        const data={
            user:{
                id:user.id,
            }
        }
        success=true;
        const authToken=jwt.sign(data,JWT_SECRET);
        res.json({success,authToken});


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})


// Route 3 : Get Logged In User a user =========================
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId=req.user.id;
        const user= await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }

})

module.exports = router