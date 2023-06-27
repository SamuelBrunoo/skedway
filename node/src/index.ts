import express from "express"
import { configDotenv } from "dotenv"
import cors from "cors"
import routes from "./routes"

configDotenv()
const app = express()

app.use(cors())

app.use("/", routes)



app.listen(process.env.PORT, () => { console.log(`Server runnning on PORT ${process.env.PORT}`) })