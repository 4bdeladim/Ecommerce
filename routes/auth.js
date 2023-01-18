import {Router} from "express"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import User from "../models/user.js"
import { v4 as uuidv4 } from 'uuid';

const router = Router()


router.get("/signin", (req, res) => {
    try {
        const token = req.cookies[process.env.COOKIE_NAME]
        if(!token) res.status(401).json('Invalid token')
        else { 
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            User.findById(decoded.id, (err, user) => {
                if(!user) {
                    res.status(500).json("No user found")
                    return;
                }
                res.status(200).json({username:user.username, role: user.role})
            })
        }
    } catch(error) {
        
        res.status(501).json('Something went wrong')
    }
})
router.post("/signup", async (req, res) => {
    
    try {
        const { email, username, password } = req.body ;
        if(!email || !username || !password) {
            res.status(501).json("Missing field!")
            return;
        }
        if(username.length < 4 || password.length < 8) {
            res.status(403).json("Username must be atleast 4 charaters and password atleast 8")
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
                                res.status(200).json({message: "Account created please check ur email for confirmation!", email: email}) 
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
                                res.cookie(process.env.COOKIE_NAME, token, {httpOnly: true, maxAge: (60 * 100 * 60 * 60 )}).json({username:user.username, role: user.role});
                            }
                        )
                    })

            })
        }
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})


router.post("/sendrecoverylink", async(req, res) => {
    try {
        const {email} = req.body
        if(!email) {
            res.status(404).json("Invalid email")
            return;
        }
        User.findOne({email}, async(err, user) => {
            if(!user) {
                res.status(404).json("No user with this email")
                return;
            }
            const RANDOM = uuidv4()
            const LINK = `${process.env.DOMAIN}/recover/${email}/${RANDOM}`
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
                subject: "Recover your account",
                html: `<a href="${LINK}">Recover your account</a>`
            }
            transporter.sendMail(options, (err) => {
                if(err) {
                    res.status(404).json("Something went wrong!")
                }
                return;
            })
            user.recoveryCode = RANDOM
            await user.save()
            res.status(200).json("Check your email for the link")
                
        })
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

router.post("/checklink", (req, res) => {
    const {code, email} = req.body
    if(!code || !email) {
        res.status(404).json("Missing informations")
        return;
    }
    User.findOne({email}, (err, user) => {
        if(!user) {
            res.status(404).json("User not found")
            return;
        }
        else if (user.recoveryCode !== code) {
            res.status(404).json("Invalid link")
            return;
        } 
        res.status(200).json("Valid link")
        
    })
})


router.post("/changepassword", (req, res) => {
    try {
        const {newPassword, email, recoveryCode} = req.body
        if(!newPassword || !email, !recoveryCode) {
            res.status(404).json("Missing informations")
            return;
        }
        User.findOne({email}, async(err, user) => {
            if(!user) {
                res.status(404).json("No user found")
                return;
            }
            else if (user.recoveryCode !== recoveryCode) {
                res.status(404).json("Invalid link")
                return; 
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashedPassword
            await user.save();
            res.status(200).json("Password changed")
        })
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
})

export default router