const { getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/productControls")

const router = require("express").Router()

// CRUD OPERATION

router.route("/products")
.get(getProduct)
.post(createProduct)

router.route("/products/:id")
.put(updateProduct)
.delete(deleteProduct)

module.exports = router