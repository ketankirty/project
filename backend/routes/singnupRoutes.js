const express = require('express');
const signupSchema = require('../models/signupSchema');
const router = express.Router();

router.post('/CreateAccount', async(req, res)=>{
    try {
        const {name,email,password,mobilenumber} = req.body;
        const newsignUp = new signupSchema({name,email,password,mobilenumber});
        await newsignUp.save();
        return res.json(newsignUp)

    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ Message: `${field} already exists.` })
        }
        return console.error(error);
    }
})


router.get('/CreateAccount',async( req, res)=>{
    try {
        const newsignUp =await signupSchema.find()
        res.json(newsignUp)
    } catch (error) {
        console.error(error);
        
    }
})

module.exports = router

