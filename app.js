/*=============================================
=               IMPORT MODULES               =
=============================================*/
// 3rd party modules
import express from "express"
// Local modules
import apiRoute from "./routes/jewel-route.js"
// Core modules
import path from "path"
import { fileURLToPath } from "url"

/*=============================================
=                  VARIABLES                  =
=============================================*/
const PORT = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

/*=============================================
=         MIDDLEWARE & APP SETTINGS           =
=============================================*/
app.use(express.static(path.join(__dirname, "public")))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/*=============================================
=                   ROUTES                    =
=============================================*/
app.use("/api", apiRoute)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
