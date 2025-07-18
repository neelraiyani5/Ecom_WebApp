const multer = require("multer");
const { imageUpload } = require("../controllers/uploadControls");


const router = require("express").Router()
const upload = multer()

router.post("/uploads",upload.single('image'), imageUpload)

module.exports = router;