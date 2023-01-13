import {Router} from "express"
import admin from "../middleware/auth.js";
import Product from "../models/product.js";
import User from "../models/user.js";




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
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})
router.get("/products/popular", async(req, res) => {
    try {
        const products = await Product.find({}).sort({sales: "desc"})
        res.status(200).json(products.slice(0, 16))
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})


router.post("/products", async(req, res) => {
    try {
        const {name, description, price, category, image} = req.body
        const newProduct = new Product({name, description, price, category, img:image})
        await newProduct.save()
        res.status(200).json("item added")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.delete("/products", async(req, res) => {
    try {
        const {id} = req.body
        Product.deleteOne({id})
            .then(res => {
                res.status(200).json("Product deleted")
            }).catch(err => {
                res.status(404).json(err)
            })
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.put("/products", (req, res) => {
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
