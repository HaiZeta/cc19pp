const express = require("express");
const prisma = require("../config/prisma")
const router = express.Router();

// router.post("")

router.get("/list-user", async(req, res, next) => {
    try {
        const users = await prisma.profile.findMany({
            omit: {
                password: true
            }
        })

        res.json({message: "Get all user", users: users})
    } catch (error) {
        next(error)
    }

})

module.exports = router