import {Router} from "express"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import User from "../models/user.js"

const router = Router()
router.post("/signup", async (req, res) => {
    
    try {
        const { email, username, password } = req.body ;
        if(!email || !username || !password) {
            res.status(501).json("Missing field!")
            return;
        }
        User.findOne({username}, async (err, user) => {
            if(user) {
                res.status(404).json("Username already used.")
                return;
            }
            else {
                User.findOne({email}, async(err, user) => {
                    if(user) {
                        res.status(404).json("Email already used")
                        return;
                    }
                    else {
                        const t = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        const checkEmail = t.test(email)
                        if(!checkEmail) {
                            res.status(404).json("Invalid email")
                            return;
                        }
                        const RANDOM = Math.floor(100000 + Math.random() * 900000)
                        const hashedPassword = await bcrypt.hash(password, 10)
                        const newUser = new User({email, username, password:hashedPassword, confirmationCode:RANDOM.toString()});
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
                            subject: "Account verification",
                            text: `${RANDOM}`
                        }
                        transporter.sendMail(options, (err) => {
                            if(err) {
                                res.status(404).json("Something went wrong!")
                            }
                            return;
                        })
                        newUser.save()
                            .then((user) => {
                                res.status(200).json("Account created please check ur email for confirmation!") 
                                return;
                            }).catch((err) => {
                                res.status(500).json("Something went wrong!")
                                return;
                            })
                    }  
                })
            }
            
        })
    } catch (error) {
        res.status(500).json("Something went wrong!");
        return;
    }
})

router.post("/verify/:email", (req, res) => {
    try {
        const email = req.params.email;
        const {code} = req.body;
        if(!email || !code) {
            res.status(404).json("Invalid info")
            return;
        }
        User.findOne({email: email}, async(err, user) => {
            if(!user) res.status(401).json("Invalid code")
            else {
                if(user.confirmationCode !== code) res.status(401).json("Invalid code")
                else {
                    user.confirmed = true;
                    await user.save();
                    res.status(200).json("Verification succeded!")
                }
            }
        })
    } catch (error) {
        res.status(501).json("Something went wrong")
    }
    

})
router.post("/signin", (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) res.status(404).json("Missing information")
        else {
            User.findOne({email: email}, (err, user) => {
                if(!user) return res.status(401).json("Invalid email")
                bcrypt.compare(password, user.password)
                    .then((isMatch) => {
                        if(!isMatch) return res.status(401).json("Incorrect password")
                        jwt.sign(
                            {id: user.id},
                            process.env.JWT_KEY,
                            (err, token) => {
                                res.cookie(process.env.COOKIE_NAME, token, {httpOnly: true, maxAge: (60 * 100 * 60 * 60 )}).json(user.username);
                            }
                        )
                    })

            })
        }
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})



export default router