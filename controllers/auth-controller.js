const createError = require("../utils/createError");

const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const profile = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!profile) {
      return createError(400, "Email is invalid");
    }

    const isMatch = await bcrypt.compare(password, profile.password);

    if (!isMatch) {
      return createError(400, "Password is invalid");
    }

    const payload = {
      id: profile.id,
      email: profile.email,
      firstname: profile.firstname,
      lastname: profile.lastname,
      role: profile.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    res.json({ message: "login successful", token: token, payload: payload });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      firstname,
      lastname,
      dateOfBirth,
      address,
      gender,
    } = req.body;

    const checkEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (checkEmail) {
      return createError(400, "Email is already taken");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const profile = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        firstname: firstname,
        lastname: lastname,
        dateOfBirth: dateOfBirth,
        gender: gender,
        address: address,
      },
    });

    res.json({ message: "Register Successful" });
  } catch (error) {
    next(error);
  }
};

exports.currentUser = async (req, res, next) => {
  try {
    const { email } = req.user;
    const profile = await prisma.user.findFirst({
      where: { email: email },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    console.log(profile);

    res.json({ result: profile });
  } catch (error) {
    next(error);
  }
};
