import {Router} from "express"
import admin from "../../middleware/admin.js"
import Category from "../../models/category.js"
import Product from "../../models/product.js"


const router = Router()



router.post("/categories", admin, async(req, res) => {
    try {
        const {name} = req.body
        const newCategory = new Category({name})
        await newCategory.save();
        res.status(200).json("Category added")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.delete("/categories", admin, async(req, res) => {
    try {
        const {id} = req.body
        Category.findOneAndDelete(id, (err, res) => {
            if(err){
                res.status(404).json("Category not found")
                return;
            }
            res.status(200).json("Category deleted")
        })
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.put("/categories", admin, (req, res) => {
    try {
        const {id, name} = req.body
        Category.findOneAndUpdate(id, {name}, (err, res) => {
            if(err) {
                res.status(404).json("Category not found")
                return;
            }
            res.status(200).json("Category updated")
        })
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.post("/products", admin, async(req, res) => {
    try {
        const {name, description, price, category, image} = req.body
        const newProduct = new Product({name, description, price, category, img:image})
        await newProduct.save()
        res.status(200).json("item added")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.post("/deleteproduct", admin, async(req, res) => {
    try {
        const {id} = req.body
        await  Product.findByIdAndDelete(id)
        res.status(200).json("Product deleted")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.put("/products", admin, (req, res) => {
    try {
        const {id, name, descreption, price, category} = req.body
        Product.updateOne({id}, {name, descreption, price, category}, (err, res) => {
            if(err){
                res.status(404).json(err)
            }
            res.status(200).json("Product updated")
        })
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})


export default router