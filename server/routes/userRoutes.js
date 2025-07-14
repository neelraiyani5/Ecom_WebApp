const { register } = require("../controllers/userControls");

const router = require("express").Router();

router.get("/register", register)

module.exports = router;