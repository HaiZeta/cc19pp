const express = require("express");
const authControllers = require("../controllers/auth-controller")

const {validateWithZod, loginSchema, registerSchema} = require("../middlewares/validate");
const { authCheck } = require("../middlewares/auth-middleware");

const router = express.Router();

router.post("/register", validateWithZod(registerSchema), authControllers.register);
router.post("/login", validateWithZod(loginSchema), authControllers.login);
router.get("/current-user", authCheck, authControllers.currentUser);


module.exports = router;