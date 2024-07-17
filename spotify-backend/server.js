import express from "express"
import cors from "cors"
import "dotenv/config"
import songRouter from "./src/routes/songRouter.js"
import connectDB from "./src/config/mongodb.js"
import connectCloudinary from "./src/config/cloudinary.js"
import bodyParser from "body-parser"
import albumRouter from "./src/routes/albumRouter.js"

const app = express()
const port = process.env.PORT || 5000

connectDB() // Connect to MongoDB
connectCloudinary() // Connect to Cloudinary

app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ limit: "10mb" })) // Adjust the limit as per your requirement
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" })) // Adjust the limit as per your requirement

app.use("/api/song", songRouter) // Apply songRouter
app.use("/api/album", albumRouter)

app.get("/", (req, res) => {
  res.send("API Working!")
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
