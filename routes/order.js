import { Router} from "express"
import jwt from "jsonwebtoken"
import Order from "../models/order.js"
import Product from "../models/product.js"
import User from "../models/user.js"

const router = Router()


router.get("/orders", async(req, res) => {
    try {
        const token = req.cookies[process.env.COOKIE_NAME]
        if(!token) {
            res.status(401).json('Invalid token')
            return;
        }
        const decoded = await jwt.verify(token, process.env.JWT_KEY)
        const orders = await Order.find({userID: decoded.id})
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.post("/orders", async(req, res) => {
    try {
        const token = req.cookies[process.env.COOKIE_NAME]
        if(!token) {
            res.status(401).json('Invalid token')
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findById(decoded.id)
        user.cart.map(async(e) => {
            const product = await Product.findById(e.productId)
            const newOder = new Order({productID:product.id, quantity:e.quantity, productPrice: product.price, totalPrice: product.price * e.quantity, userID: decoded.id, status: "Pending" })
            await newOder.save();
        })
        user.cart = []
        await user.save()
        res.status(200).json("Order")
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong")
    }
})


router.delete("/orders", async(req, res) => {
    try {
        const {orderId} = req.body
        if(!orderId) {
            res.status(401).json("No order id found")
        }
        const token = req.cookies[process.env.COOKIE_NAME]
        if(!token) {
            res.status(401).json('Invalid token')
            return;
        }
        const decoded = await jwt.verify(token, process.env.COOKIE_NAME)
        const order = await Order.findById(orderId)
        if(order.userID !== decoded.id) {
            res.status(401).json("You are not authorized to delete this order")
            return;
        }
        if(order.status !== "Pending"){
            res.status(401).json("You cannot delete an order in this status")
            return;
        }
        res.status(200).json("Order canceled")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})


export default router