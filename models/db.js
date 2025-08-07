const mongoose = require('mongoose');
const mongourl=process.env.MONGO_URL;
mongoose.connect(mongourl).then(() => console.log("Connected to DB")).catch((err) => console.log("Error in DB connection",err));