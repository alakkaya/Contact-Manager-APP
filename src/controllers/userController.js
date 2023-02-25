const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const register = async (req, res) => {
    const { email, username, password } = req.body
    if (!email || !username || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are mandatory!"
        })
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        return res.status(400).json({
            success: false,
            message: "The User already registered with same email."
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    if (user) {
        return res.status(201).json({
            message: "Succesfully User Created.",
            username: user.username,
            _id: user.id,
            email: user.email
        })
    } else {
        return res.status(400).json({
            message: "user data is not valid"
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are mandatory!"
        })
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" })
        res.status(200).json({
            success: true,
            message: "Succesfully Logged In.",
            accessToken
        })
    } else {
        return res.status(401).json({
            success: false,
            message: "Email or password is not valid."
        })
    }
}

//@access private
const currentUser = async (req, res) => {
    return res.status(200).json({
        message: "Succesfully entered the page",
        data: req.user
    })
}

const logout = async (req, res) => {
    //Instead of the destroy session I'll clear JWT from client-side

    res.clearCookie("accessToken");
    return res.status(200).json({
        success: true,
        message: "Succesfully logged out."
    })
}


module.exports = {
    register,
    login,
    currentUser,
    logout
}