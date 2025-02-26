const {z} = require("zod");

exports.registerSchema = z.object({
    email: z.string().email("Email is incorrect"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    firstname: z.string().min(3, "Firstname must be at least 3 characters"),
    lastname: z.string().min(3, "Lastname must be at least 3 characters"),
    confirmPassword: z.string().min(3, "ConfirmPassword must be at least 3 characters")
}).refine((data) => data.password === data.confirmPassword,{
    message: "Password is not Matched",
    path: "confirmPassword"
})

exports.loginSchema = z.object({
    email: z.string().email("Email is incorrect"),
    password: z.string().min(6, "Password must be at least 6 characters")
})

exports.validateWithZod = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        const errMsg = error.errors.map((item) => item.message)
        const errTxt = errMsg.join(",")
        const mergeError = new Error(errTxt)
        next(error);
    }
}