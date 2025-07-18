const { getCategory, createCategory, deleteCategory, updateCategory } = require("../controllers/categoryControls")
const auth = require("../middleware/auth")
const adminAuth = require("../middleware/authAdmin")

const router = require("express").Router()

// CRUD OPERATION
// router.get("/category", () => {})
// router.post("/category", () => {})
router.route("/category")
.get(getCategory)
.post(auth, adminAuth, createCategory)

router.route("/category/:id")
.delete(auth, adminAuth, deleteCategory)
.put(updateCategory)

module.exports = router