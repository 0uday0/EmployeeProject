import * as dotenv from "dotenv"

import express from "express"
import { router } from "./routes/routes.js"

const app = express()

dotenv.config()

app.use(express.json())
app.use("/",router)

app.listen(process.env.PORT,()=>{
    console.log("server is running on port 4500")
})