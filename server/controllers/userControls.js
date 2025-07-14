const userControls = {
    register : (req, res) => {
        res.json({status : true, msg : "Test msg coming from controllers"})
    }
}

module.exports = userControls;