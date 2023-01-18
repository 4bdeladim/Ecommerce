import { Router } from "express";
import owner from "../../middleware/owner";
import Product from "../../models/product.js"
const router = Router()


router.get("/products", owner, async(req, res) => {
    try {
        const products = await Product.find({})
    } catch (error) {
        
    }
})