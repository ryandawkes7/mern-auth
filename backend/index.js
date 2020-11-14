const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Express Setup
const app = express();
app.use(express.json());
app.use(cors());

// Port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Server running on Port: ", PORT));

// Mongoose & MongoDB Setup
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if(err) throw err;
    console.log("MongoDB Connection Successful")
})

// Route Setup
app.use("/users", require("./routes/userRouter"));
