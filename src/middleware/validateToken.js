const jwt = require("jsonwebtoken")

const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]  //boşluğu ve ilk index"bearer"at
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "User is not authorized" + err
                })
            }
            req.user = decoded.user;
            next()
        })
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User is not authorized or token is missing in the request "
            })
        }
    }
}
module.exports = validateToken