import jwt from "jsonwebtoken"

const userAuthentificationMiddleware = (req, res, next) => {
    const authHeaders = req.headers.authorization

    const token = authHeaders && authHeaders.split(' ')[1]

    if(!token) return res.status(403).json({success: false, message: "Couldn't find token"})
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = {
        userId : decoded.userId
    }

    next()
}

export default userAuthentificationMiddleware