import {Router} from "express"
import Stripe from "stripe"
import login from "../middleware/login.js"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import Product from "../models/product.js"
import Order from "../models/order.js"


const router = Router()



router.post("/checkout", login, async(req, res) => {
    try {
        const token = req.cookies[process.env.COOKIE_NAME] 
        if(!token) {
            res.status(404).json("No token provided")
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const user = await User.findById(decoded.id)
        const productPromises = user.cart.map(async(product) => {
            const p = await Product.findById(product.productId)
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: p.name
                    },
                    unit_amount: p.price * 100
                },
                quantity: product.quantity
            }
        })
        const products = await Promise.all(productPromises)
        const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: products,
            success_url: `${process.env.DOMAIN}/checkPayment`,
            cancel_url: `${process.env.DOMAIN}/account?status=ErrorPayment`,
        })
        user.sessionId = session.id
        await user.save()
        res.status(200).json({url: session.url})
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong")
    }
})

export default router