const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT_NUM || 5000;
const app = express()
const URL = process.env.MONGO_URI
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(cookieParser())
app.use("/user", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", uploadRoutes)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})

// DB Connection
mongoose.connect(URL)
.then(() => console.log("DB connection successful"))
.catch((err) => console.log("DB connection failed", err.message))


// {
// "productId" : "p01",
// "title" : "product 01",
// "price" : 100,
// "description" : "desc",
// "content" : "Content",
// "images" : {
//     "publicId": "uploads/ojyr7h3qrtj4jll6gruu",
//     "url":""
// },
// "category" : "apple"
// }