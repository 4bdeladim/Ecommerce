import jwt from "jsonwebtoken"
import User from "../models/user.js";


const owner = async(req, res, next) => {
    try {
        const token = req.cookies[process.env.COOKIE_NAME]
        if(!token) {
            res.status(401).json("No token auth denied")
            return;
        }
        const decoded = await jwt.verify(token, process.env.JWT_KEY)
        User.findById(decoded.id, (err, user) => {
            if(!user) {
                res.status(404).json("No user found")
                return;
            }
            if(user.role !== "owner") {
                res.status(401).json("Auth denied")
                return;
            }
            next()
        })
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
    

}

export default owner