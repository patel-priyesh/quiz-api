let CATEGORY = require('../model/category')

exports.create = async (req, res, next) => {
    try {
        let { name, description } = req.body;
        let category = await CATEGORY.create({
            name,
            description
        })

        res.status(201).json({
            status: "Success",
            message: "Category created successfully",
            data: category
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Failed",
            message: "Category create failed",
            data: error.message
        })
    }
}

exports.read = async (req, res, next) => {
    try {
        let category;

        if(req.query.search) {
            category = await CATEGORY.find({
                name: { $regex: req.query.search, $options: 'i' }
            })
        }else{

            category = await CATEGORY.find()
        }


        res.status(201).json({
            status: "Success",
            message: "Category read successfully",
            data: category
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Failed",
            message: "Category read failed",
            data: error.message
            })
    }
} 

exports.update = async (req, res, next) => {
    try {

        let categoryId = req.params.id

        let category = await CATEGORY.findById(categoryId)
        if (!category) throw new Error("Category not found")

        let data = await CATEGORY.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(201).json({
            status: "Success",
            message: "Category update successfully",
            data
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Failed",
            message: "Category update failed",
            data: error.message
        })
    }
}

exports.delete = async (req, res, next) => {
    try {

        let category = await CATEGORY.findById(req.params.id)
        if (!category) throw new Error("Category not found")

        await CATEGORY.findByIdAndDelete(req.params.id)

        res.status(201).json({
            status: "Success",
            message: "Category delete successfully",
        })
    }
    catch (error) {
        res.status(404).json({
            status: "Failed",
            message: "Category delete failed",
            data: error.message
        })
    }
}
