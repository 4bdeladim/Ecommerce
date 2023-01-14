import User from "../models/user.js"
import jwt from "jsonwebtoken"
import {Router} from "express"
import login from "../middleware/login.js"

const router = Router()



router.get("/cart", login, async(req, res) => {
    try {
        
        const token = req.cookies[process.env.COOKIE_NAME]
        if(!token) res.status(401).json('Invalid token')
        else { 
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            User.findById(decoded.id, async(err, user) => {
                if(!user) res.status(500)
                res.status(200).json(user.cart)
            })
        }
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})
router.post("/cart", login, async(req, res) => {
    try {
        const {productId, quantity, productImg} = req.body
        const token = req.cookies[process.env.COOKIE_NAME]
        if(!token) res.status(401).json('Invalid token')
        else { 
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            User.findById(decoded.id, async(err, user) => {
                if(!user) res.status(404).json("Invalid user")
                const checkIfItsInCart = user.cart.find(e => e.productId === productId)
                if(!checkIfItsInCart){
                    user.cart = [...user.cart, {productId, quantity: parseInt(quantity), productImg}]
                }else {
                    const newCart = user.cart.map(e => {
                        if(e.productId === productId){
                            return {productId, productImg, quantity: e.quantity+1}
                        } 
                        return e
                    })
                    user.cart = newCart
                }
                await user.save()
                res.status(200).json(user.cart)
            })
        }
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.delete("/cart", login, (req, res) => {
    try {
        const {productId} = req.body
        if(!productId) {
            res.status(404).json("Invalid id")
            return;
        }
        const token = req.cookies[process.env.COOKIE_NAME]
        if(!token) {
            res.status(401).json('Invalid token')
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        User.findById(decoded.id, async(err, user) => {
            if(!user) res.status(500)
            user.cart = user.cart.filter(e => e.productId !== productId)
            await user.save()
            res.status(200).json(user.cart)
        })
        
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.put("/cart", login, (req, res) => {
    try {
        const {products} = req.body
        if(!productId) {
            res.status(404).json("Invalid id")
            return;
        }
        const token = req.cookies[process.env.COOKIE_NAME]
        if(!token) {
            res.status(401).json('Invalid token')
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        User.findById(decoded.id, async(err, user) => {
            if(!user) res.status(404).json("User not found")
            user.cart = user.cart.map(e => {
                let newItem = products.find(newEL => newEL.productId === e.productId)
                if(newItem) {
                    return {...e, quantity: newItem.quantity}
                }
                return e 
            })
            await user.save()
            res.status(200).json(user.cart)
        })
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})


export default router