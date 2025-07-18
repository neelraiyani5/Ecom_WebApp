const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
require("dotenv").config()
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token)
            return res.status(400).json({status : false, msg : "User not found"})
        const payload = jwt.verify(token, process.env.ACCESS_SECRET_KEY)
        req.user = payload;
        next();
    } catch (err) {
        res.status(500).json({status : false, msg : err.message})
    }
}

module.exports = auth