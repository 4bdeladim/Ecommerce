import { Router } from "express";
import Category from "../models/category.js";

const router = Router()



router.post("/category", async(req, res) => {
    try {
        const {name} = req.body
        const newCategory = new Category({name})
        await newCategory.save();
        res.status(200).json("Category added")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})