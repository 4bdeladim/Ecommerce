import {Router} from "express"
import admin from "../middleware/admin.js";
import Product from "../models/product.js";





const router = Router();



router.get("/products", async(req, res) => {
    try {
        const { page, sort, category, min, max } = req.query
        const s = sort === "A-Z" ? {name: "asc"} : (sort === "Z-A" ? {name: "desc"} : (sort === "H-L" ? {price: "desc"}: (sort === "L-H" ? {price:"asc"} : (sort === "popular" ? {sales: "desc"} : {name: "desc"}))) )
        const cat = ["men", "women", "electronics", "jewelery"].indexOf(category) !== -1 ? category : null
        const products = await Product.find(cat ? {category: cat} : {}).where("price").gt(parseInt(min)).lt(parseInt(max)).sort(s)
        if(products.length < 15){
            if(products.length === 0) {
                res.status(200).json({products, pages:0})
                return;
            }
            res.status(200).json({products, pages: 1})
            return;
        }
        res.status(200).json({products: products.slice((15 * (page - 1)),(15 * page) ), pages: Math.ceil(products.length / 15)})
    } catch (error) {
        res.status(404).json("Something went wrong")
    }
})
router.get("/singleproduct/:id", async (req, res) => {
    try {
        const {id} = req.params 
        const product = await Product.findById(id)
        res.status(200).json({name: product.name, description: product.description, price: product.price, category: product.category, img: product.img})
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})
router.get("/products/popular", async(req, res) => {
    try {
        const products = await Product.find({}).sort({sales: "desc"})
        const newProducts = products.map(product => {return {name: product.name, description: product.description, price: product.price, category: product.category, img: product.img}})
        res.status(200).json(newProducts.slice(0, 16))
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})





export default router
