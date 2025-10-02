const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const enquiryRoute = require('./routes/enquiryRoute');
const signupRoutes = require('./routes/singnupRoutes');
const contactRoute = require('./routes/contactRoute');
const bookingRoute = require('./routes/bookingRoute');

dotenv.config()

const app = express()

app.use(cors());
app.use(express.json());


//mongodb connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅  Mongodb Connected..");


    } catch (error) {
        console.error("❌  Mongodb not connected.", error);
        process.exit(1)

    }
}
connectDB();


//api endpoints
app.use('/api/enquiryform', enquiryRoute)
app.use('/api/signup', signupRoutes)
app.use('/api/ContactUs',contactRoute)
app.use('/api/checkout',bookingRoute)





app.use('/', (req, res) => {
    res.send("✈️  Api is running....");

})


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});








const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);

})