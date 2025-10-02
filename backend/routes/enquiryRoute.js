const express = require("express");
const Enquiry = require("../models/enquirySchema");
const router = express.Router();

// Create new enquiry
router.post("/enquiry", async (req, res) => {
  try {
    const { destination, startDate, endDate, guests, budget } = req.body;

    // Simple validation
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ error: "End date must be after start date" });
    }

    const newEnquiry = new Enquiry({
      destination,
      startDate,
      endDate,
      guests,
      budget
    });

    await newEnquiry.save();
    return res.status(201).json(newEnquiry);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Something went wrong.." });
  }
});

// Get all enquiries
router.get("/enquiry", async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.json(enquiries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch enquiries" });
  }
});

module.exports = router;
