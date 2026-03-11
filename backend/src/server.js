import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]); 

import express from "express"
import dotenv from "dotenv"
import dbConnect from "./db/dbConnect.js"
import roomRoutes from "./routes/room.routes.js"

dotenv.config()

const app = express()

app.use(express.json())

dbConnect()

app.use("/api/rooms", roomRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})