const userModel = require("../models/user.model")

const adminAuth = async(req, res, next) => {
    try {
        const id = req.user.id;
    const getUser = await userModel.findById(id)
    if(getUser.role === 0)
        return res.status(400).json({status : false, msg : "Admin access denied"})
    next();
    } catch (err) {
        res.status(500).json({status : false, msg : err.message})
    }
}

module.exports = adminAuth