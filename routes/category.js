import { Router } from "express";
import Category from "../models/category.js";

const router = Router()



router.post("/categories", async(req, res) => {
    try {
        const {name} = req.body
        const newCategory = new Category({name})
        await newCategory.save();
        res.status(200).json("Category added")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.get("/categories", async(req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.delete("/categories", async(req, res) => {
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

router.put("/categories", (req, res) => {
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



export default router