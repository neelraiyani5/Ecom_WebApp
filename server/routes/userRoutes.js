const { register, refreshtoken } = require("../controllers/userControls");

const router = require("express").Router();

router.post("/register", register)
router.post("/refreshtoken", refreshtoken)

module.exports = router;