import jwt from "jsonwebtoken"

export const authentificateAdmin = (req,res, next) => {
    const authHeaders = req.headers.authorization
    const token = authHeaders.split(' ')[1]

    if(!token){
        return res.status(401).json({success: false, message: "Couldn't authenticate. No token found"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = {
        role : "admin"
    }

    if(decoded){
        next()
    }
    
}
