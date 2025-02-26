const errorHandler = require("./error")

const notFound = (req,res,next) => {
    res.status(400).json({message: "Resource not found on this server"})
}

module.exports = notFound;