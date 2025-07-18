const productModel = require("../models/products.model");
const qs = require("qs")

// Filter, sort, pagenation
class apiFeatures{
  constructor(query, queryString){
    this.query = query;
    this.queryString = queryString;
  }
  filtering(){
    // const queryObj = {...this.queryString};
    const queryObj = qs.parse(this.queryString)
    const excludedField = ['page', 'sort', 'limit']
    excludedField.forEach((item) => delete(queryObj[item]))
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt|regex)\b/g, match => "$" + match)
    this.query.find(JSON.parse(queryStr))
    return this;
  }
  sorting(){
    if(this.queryString.sort){
      const sortBy = this.queryString.sort.split(",").join("");
      this.query = this.query.sort(sortBy)
    }else{
      this.query = this.query.sort("-createdAt")
    }
    return this
  }
  pagenation(){
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit)
    return this
  }

}

const productControls = {
  getProduct: async (req, res) => {
    try {
      const features = new apiFeatures(productModel.find(), req.query).filtering().sorting().pagenation()
      const products = await features.query
      if (!products)
        return res.status(400).json({ status: false, msg: "No product found" });
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ status: false, msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        productId,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images)
        return res
          .status(400)
          .json({ status: false, msg: "No image uploaded" });
      const newProduct = new productModel({
        productId,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });
      await newProduct.save();
      res.status(200).json({ status: true, msg: "Product added successfully" });
    } catch (err) {
      res.status(500).json({ status: false, msg: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      await productModel.findByIdAndDelete(id);
      res
        .status(200)
        .json({ status: true, msg: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ status: false, msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;
      if (!images)
        return res
          .status(400)
          .json({ status: false, msg: "No image uploaded" });
      const id = req.params.id;
      await productModel.findOneAndUpdate(
        { _id: id },
        { title, price, description, content, images, category }
      );
      res.status(200).json({ status: true, msg: "Product updated" });
    } catch (err) {
      res.status(500).json({ status: false, msg: err.message });
    }
  },
};

module.exports = productControls;