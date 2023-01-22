import { Router } from "express";
import Product from "../../models/product.js";
import admin from "../../middleware/admin.js";
import Order from "../../models/order.js"
import User from "../../models/user.js";
const router = Router()

const checkDay = (d1, d2) =>  {
    return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();
}
router.get("/users", admin, async(req, res) => {
    try {
        const users = await User.find({})
        const dialyUsers = users.filter(e => checkDay(e.date, new Date())).length
        const monthes = new Array(12).fill({}).map((e, index) => {return {month: index+1, year: new Date().getFullYear()}})
        const finalList = monthes.map((monthObj) => {
            const usersIneMonth = users.filter(e => e.date.getMonth() + 1 === monthObj.month && e.date.getFullYear() === monthObj.year)
            return {...monthObj, users: usersIneMonth.length}
        })
        res.status(200).json({dialyUsers, finalList})
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong")
    }
})

router.get("/orders", admin, async(req, res) => {
    try {
        const orders = await Order.find({})
        const dialyorders = orders.filter(e => checkDay(e.date, new Date()))
        const monthes = new Array(12).fill({}).map((e, index) => {return {month: index+1, year: new Date().getFullYear()}})
        const finalList = monthes.map((monthObj) => {
            const ordersIneMonth = orders.filter(e => e.date.getMonth() + 1 === monthObj.month && e.date.getFullYear() === monthObj.year)
            return {...monthObj, orders: ordersIneMonth.length}
        })
        res.status(200).json({dialyorders, finalList})
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong")
    }
})


router.get("/topProduct", admin, async(req, res) => {
    try {
        const products = await Product.find({}).sort({sales: "desc"})
        const product = products[0]
        res.status(200).json(product.id)
    } catch (error) {
        console.log(error)
        res.status(500).json("Something went wrong!")
    }
})

router.get("/topUser", admin, async(req, res) => {
    try {
        const orders = await Order.find({})
        const count = orders.reduce((acc, obj) => {
            acc[obj.userID] = (acc[obj.userID] || 0) + 1
            return acc
        }, {})
        const sorted = Object.entries(count).sort((a, b) => b[1] - a[1])
        const mostCommonUserID = sorted[0][0]
        const topUser = await User.findById(mostCommonUserID)
        let price = 0
        orders.map(e => {
            if(e.userID === mostCommonUserID){
                price += e.totalPrice
            }
        })
        res.status(200).json({topUser:topUser.username, price})
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})
router.get("/productSales/:id", admin, async(req, res) => {
    try {
        const {id}  = req.params
        const orders = await Order.find({productID: id})
        const product = await Product.findById(id)
        const dialyorders = orders.filter(e => checkDay(e.date, new Date()))
        const monthes = new Array(12).fill({}).map((e, index) => {return {month: index+1, year: new Date().getFullYear()}})
        const finalList = monthes.map((monthObj) => {
            const ordersIneMonth = orders.filter(e => e.date.getMonth() + 1 === monthObj.month && e.date.getFullYear() === monthObj.year)
            return {...monthObj, orders: ordersIneMonth.length}
        })
        res.status(200).json({dialyorders, finalList, productName: product.name, id})
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

export default router