import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]); 

import express from "express"
import dotenv from "dotenv"
import dbConnect from "./db/dbConnect.js"
import roomRoutes from "./routes/room.routes.js"
import { PORT } from "./constants.js"
import cors from "cors"

dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL
}))
app.use(express.json())

dbConnect()

app.use("/api", roomRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})