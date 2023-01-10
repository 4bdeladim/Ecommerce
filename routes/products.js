import {Router} from "express"
import admin from "../middleware/auth.js";
import Product from "../models/product.js";
import User from "../models/user.js";




const router = Router();



router.get("/products", async(req, res) => {
    try {
        const { page, sort, category, min, max } = req.query
        const s = sort === "A-Z" ? {name: "asc"} : (sort === "Z-A" ? {name: "desc"} : (sort === "H-L" ? {price: "desc"}: (sort === "L-H" ? {price:"asc"} : (sort === "popular" ? {sales: "desc"} : {name: "desc"}))) )
        const products = await Product.find({category}).where("price").gt(parseInt(max)).lt(parseInt(min)).sort(s)
        if(products.length < 15){
            res.status(200).json({products, pages: 1})
            return;
        }
        res.status(200).json({products, pages: Math.ceil(products.length / 15)})
    } catch (error) {
        res.status(404).json("Something went wrong")
    }
})

router.get("/products/popular", (req, res) => {
    try {
        Product.find({}).sort({sales: "desc"}, (err, products) => {
            if(!products){
                res.status(404).json("No products found")
                return;
            }
            res.status(200).json(products.slice(0, 16))
        })
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})


router.post("/products", async(req, res) => {
    try {
        const {name, descreption, price, category} = req.body
        const newProduct = new Product({name, descreption, price, category})
        await newProduct.save()
        res.status()
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
