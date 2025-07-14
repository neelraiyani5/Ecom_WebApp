const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT_NUM || 5000;
const app = express()
const URL = process.env.MONGO_URI
const userRoutes = require("./routes/userRoutes")

app.use("/user", userRoutes)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

// DB Connection
mongoose.connect(URL)
.then(() => console.log("DB connection successful"))
.catch((err) => console.log("DB connection failed", err.message))