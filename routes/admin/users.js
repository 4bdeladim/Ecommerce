import {Router} from "express"
import owner from "../../middleware/owner.js"
import User from "../../models/user.js"
import jwt from "jsonwebtoken"
import admin from "../../middleware/admin.js"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"

const router = Router()


router.post("/deleteUser", owner, async(req ,res) => {
    try {
        const { id } = req.body
        await User.findByIdAndDelete(id)
        res.status(200).json("User deleted")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.post("/makeuseradmin", owner, async(req, res) => {
    try {
        const { id } = req.body
        const user = await User.findById(id)
        user.role = "admin"
        await user.save()
        res.status(200).json("User is now an admin")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.delete("/deleteadmin", owner, async(req, res) => {
    try {
        const {id} = req.body
        const user = await User.findById(id)
        user.role = "user"
        await user.save()
        res.status(200).json("Admin is now a user")
    } catch (error) {
        res.status(500).json("Something went wrong")        
    }
})

router.get("/user/:id", admin, async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json('User not found')
    }
})
router.post("/updateUserInfo", admin, async(req, res) => {
    try {
        const {id, username, SBadress, email} = req.body
        await User.findByIdAndUpdate(id, {username, SBadress, email })
        res.status(200).json("User updated")  
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/deleteUser", admin, async(req, res) => {
    try {
        const { id } = req.body 
        const token = req.cookies[process.env.COOKIE_NAME]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const admin = await User.findById(decoded.id)
        const user = await User.findById(id)
        if((admin.role === "admin" && user.role === "user") || (admin.role === "owner" || user.role !== "owner")) {
            User.findByIdAndRemove(id, (err, res) => {
                if(err) {
                    res.status(401).json("User not found")
                    return;
                } 
                res.status(200).json("User deleted")
            })
        }
        else {
            res.status(401).json("Your role does not allow you to delete this user")
        }
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})


router.get("/users", admin, async(req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.delete("/ban/:id", async(req, res) => {
    try {
        const { id } = req.params
        await User.findByIdAndUpdate(id, {banned:true})
        res.status(200).json("User Banned")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})
router.post("/unban/:id", async(req, res) => {
    try {
        const { id } = req.params
        await User.findByIdAndUpdate(id, {banned:false})
        res.status(200).json("User Unbanned")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.post("/sendEmail", admin, async(req, res)=> {
    try {

        const { messageTitle, message, id} = req.body
        const user = await User.findById(id)
        const email = user.email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        const options = {
            from: process.env.EMAIL,
            to: email,
            subject: messageTitle,
            text: message
        }
        await transporter.sendMail(options)
        res.status(200).json("Email Sent")
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})
export default router