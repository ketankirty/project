const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  destinationId: {
    type: String,
    enum: [
      "kerala",
      "rajasthan",
      "goa",
      "himachal",
      "kashmir",
      "andaman-island",
      "varanasi",
      "northeast",
      "ladakh",
      "golden-triangle",
      "mysore",
      "rishikesh"
    ],
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
    default: 1,
  },
}, { timestamps: true });

module.exports = mongoose.model("Booking Info", bookingSchema);
