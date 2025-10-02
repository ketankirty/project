const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  destination: {
    type: String,
    enum: [
      "andhra-pradesh",
      "arunachal-pradesh",
      "assam",
      "bihar",
      "chhattisgarh",
      "goa",
      "gujarat",
      "haryana",
      "himachal-pradesh",
      "jharkhand",
      "karnataka",
      "kerala",
      "madhya-pradesh",
      "maharashtra",
      "manipur",
      "meghalaya",
      "mizoram",
      "nagaland",
      "odisha",
      "punjab",
      "rajasthan",
      "sikkim",
      "tamil-nadu",
      "telangana",
      "tripura",
      "uttar-pradesh",
      "uttarakhand",
      "west-bengal",

      // Union Territories
      "andaman-nicobar",
      "chandigarh",
      "dadra-nagar-haveli-daman-diu",
      "delhi",
      "jammu-kashmir",
      "ladakh",
      "lakshadweep",
      "puducherry"
    ],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  budget: {
    type: String,
    enum: ["any", "economy", "standard", "premium", "luxury"],
    default: "any",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Enquiry", enquirySchema);
