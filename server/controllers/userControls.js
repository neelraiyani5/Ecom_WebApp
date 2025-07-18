const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const cookieParser = require("cookie-parser");



const userControls = {
    register : async(req, res) => {
        try {
            const {name, email, password} = req.body;
            const user = await userModel.findOne({email})
            if(user) 
                return res.status(400).json({status : false, msg : "Email already exist"})
            
            if(password.length < 6) 
                return res.status(400).json({status : false, msg : "Password must be greater than 6 characters"})

            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = new userModel({name, email, password : hashedPassword})
            await newUser.save()

            const accessToken = createAccessToken({id : newUser._id})
            const refreshToken = createRefreshToken({id : newUser._id})

            // const accessToken = jwt.sign({id: newUser._id}, process.env.ACCESS_SECRET_KEY, {expiresIn : '1d'})
            res.cookie("refreshtoken", refreshToken, {
                httpOnly : true,
                path : "/user/refreshtoken"
            })
            

            res.status(200).json({status : true, msg : "Registration successful", accessToken})
        } catch (err) {
            res.status(500).json({status: false, msg : err.message})
        }
    },
    refreshtoken : async(req, res) => {
        try {
            const refToken = req.cookies.refreshtoken;
            if(!refToken)
                return res.status(400).json({status : false, msg : "Please login or register"})
            jwt.verify(refToken, process.env.REFRESH_SECRET_KEY, (err, user) => {
                if(err)
                    return res.status(400).json({status : false, msg : "Please login or register"})
                const accessToken = createAccessToken({id : user.id})
                res.json({accessToken, user})
            })
        } catch (err) {
            res.status(500).json({status : false, msg : err.message})
        }
        
    },
    login : async(req, res) => {
        try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})
        if(!user)
            return res.status(400).json({status : false, msg : "User not found"})
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({status : false, msg : "Password doesn't match"})
        const accessToken = createAccessToken({id : user._id})
        const refreshToken = createRefreshToken({id : user._id})
        res.cookie("refreshtoken", refreshToken, {
                httpOnly : true,
                path : "/user/refreshtoken"
        })
        res.status(200).json({status : true, msg : "Login successful", accessToken})   
        } catch (err) {
            res.status(500).json({status : false, msg : err.message})
        }

    },
    logout : async(req, res) => {
        try {
           res.clearCookie("refreshtoken", {
            path : "/user/refreshtoken"
        }) 
        res.status(200).json({status : true, msg : "Logout successful"})
        } catch (err) {
            res.status(500).json({status : false, msg : err.message})
        }     
    },
    getUser : async(req, res) => {
        const thisUser = await userModel.findById(req.user.id).select("-password")
        if(!thisUser)
            return res.status(400).json({status : false, msg : "User not found"})
        res.status(200).json({status: true, user : thisUser})
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn : '1d'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn : '7d'})
}

module.exports = userControls;