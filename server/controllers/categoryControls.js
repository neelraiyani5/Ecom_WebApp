const categoryModel = require("../models/category.model")

const categoryControls = {
    getCategory : async (req, res) => {
        try {
            const category = await categoryModel.find({})
        if(!category) 
            return res.status(400).json({status : false, msg : "No category found"})
        res.status(200).json(category)
        } catch (err) {
            res.status(500).json({status : false, msg : err.message})
        }
    },
    createCategory : async (req, res) => {
        try {
            const {name} = req.body;
        const newCategory = new categoryModel({name})
        await newCategory.save()
        res.status(200).json({status: true, msg : "New category added"})
        } catch (err) {
        res.status(500).json({status: true, msg : err.message})           
        }
    },
    deleteCategory : async (req, res) => {
        try {
            const id = req.params.id;
        await categoryModel.findOneAndDelete({_id : id})
        res.status(200).json({status : true, msg : "Category deleted"})
        } catch (err) {
            res.status(500).json({status : false, msg : err.message})
        }
    },
    updateCategory : async (req, res) => {
        try {
            const {name} = req.body
            const id = req.params.id;
        await categoryModel.findOneAndUpdate({_id : id}, {name})
        res.status(200).json({status: true, msg : "Category updated"})
        } catch (err) {
            res.status(500).json({status : false, msg : err.message})
        }
    }
}

module.exports = categoryControls