const express = require("express")
const contactSchema = require('../models/contactSchema');
const router = express.Router();


router.post('/Contact', async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;
        const newContact = new contactSchema({ name, email, phone, subject, message });
        await newContact.save();
        return res.json(newContact);


    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Error in data sending." })


    }
})


module.exports = router