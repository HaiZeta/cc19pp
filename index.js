require("dotenv").config()

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const errorHandler = require("./middlewares/error")
const notFound = require("./middlewares/not-found")

//import Router

const authRoutes = require("./routes/auth-routes")
const userRoutes = require("./routes/user-routes")
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))


//Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)

// error
app.use(errorHandler)
app.use(notFound)

// port
app.listen("8000",()=> console.log("Server is running on port 8000"))
