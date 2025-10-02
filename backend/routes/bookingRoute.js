const express = require('express')
const bookingSchema = require('../models/bookingSchema');
const router = express.Router();



router.post('/booking', async (req, res) => {
    try {
        const { destinationId, startDate, endDate, guests } = req.body;
        const newBooking = new bookingSchema(
            { destinationId, startDate, endDate, guests }

        )
        await newBooking.save();
        return res.json(newBooking)


    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Error in data sending." })
    }

})

module.exports = router