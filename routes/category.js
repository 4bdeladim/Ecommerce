import { Router } from "express";
import Category from "../models/category.js";
import admin from "../middleware/admin.js"

const router = Router()


router.get("/categories", async(req, res) => {
    try {
        const categories = await Category.find({})
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})




export default router