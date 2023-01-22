import express from 'express'
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import auth from "./routes/auth.js"
import products from "./routes/products.js"
import categories from "./routes/category.js"
import rateLimit from 'express-rate-limit'
import cart from "./routes/cart.js"
import order from "./routes/order.js"
import checkout from "./routes/checkout.js"
import cors from "cors"
import path from "path"
import adminStats from "./routes/admin/stats.js"
import adminUsers from "./routes/admin/users.js"
import adminProducts from "./routes/admin/products.js"


dotenv.config();
const app = express();  
const PORT = process.env.PORT || 8888;
const DATABASE_URL = process.env.DATABASE_URL
const limiter = rateLimit({
	windowMs: 60 * 1000, 
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false, 
})
app.use(express.static(path.resolve(process.cwd(), "client", "build")));
app.use(limiter)
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(cookieParser());
app.use("/api/", products)
app.use("/api/products/", categories)
app.use("/api/",auth)
app.use("/api/", cart)
app.use("/api/", order)
app.use("/api/", checkout)
app.use("/api/admin/", adminUsers)
app.use("/api/admin/", adminProducts)
app.use("/api/admin/stats", adminStats)



app.get("*", (_, res) => {
	res.sendFile(
		path.join(process.cwd(), "./client/build/index.html"),
		(err) => {
			if(err) {
				res.status(500).send(err)
			}
		}
	)
})
mongoose.set('strictQuery', false)
mongoose.connect(DATABASE_URL, () => {
    console.log("Mogoose connected")
})
app.listen(PORT, () => console.log("Server is running"))