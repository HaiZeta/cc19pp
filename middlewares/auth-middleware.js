const creatError = require("../utils/createError")

const jwt = require("jsonwebtoken")

exports.authCheck = (req, res, next) => {
    try {
        
        const {} = req.headers.authCheck

        if(!authorization) {
            return creatError(400, "Missing Token!")
        }

        const token = authorization.split(".")[1]

        jwt.verify(token, process.env.SECRET_KEY,(err, decode) => {
            if(err) {
                return creatError(401, "Unauthorized!")
            }
            req.user = decode

            next()
        })
    } catch (error){
        next(error)
    }
};