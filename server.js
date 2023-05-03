import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from 'path';
//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express()

//middelwares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
//static files
app.use(express.static(path.join(__dirname,"./client/build")))
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));
})
//rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>")
})

//PORT
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})