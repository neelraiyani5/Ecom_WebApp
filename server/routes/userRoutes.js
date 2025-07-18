const { register, refreshtoken, login, logout, getUser } = require("../controllers/userControls");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/register", register)
router.post("/refreshtoken", refreshtoken)
router.post("/login", login)
router.get("/logout", logout)
router.get("/getUser", auth, getUser)

module.exports = router;