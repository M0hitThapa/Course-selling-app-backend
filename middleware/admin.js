const jwt = require("jsonwebtoken")
const jwtAdminPassword = require("../config")

function adminMiddleware(req,res,next) {
    const token = req.headers.token
    const decode = jwt.verify(token,jwtAdminPassword)

    if(decode) {
        req.userId = decode.id
        next()
    } else {
        res.status(403).json({
            message:"You are not signed in"
        })
    }

}

module.exports = {
    adminMiddleware:adminMiddleware
}