import jwt from "jsonwebtoken"

const userAuthentificationMiddleware = (req, res, next) => {
    const authHeaders = req.headers.authorization
    
    if (!authHeaders){
        return res.json({success: false, message: "No token found"})
    }

    const token = authHeaders && authHeaders.split(" ")[1]

    if(!token){
        return res.json({success: false, message: "Couldn't find token"})
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== 'user'){
            return res.json({success:false})
        }

        req.user = {
            role: "user",
            userId : decoded.userId
        }
    } catch (error) {
        console.error("Token verification failed:", error)
        return res.json({success: false, message: "Invalid token"})
    }
    

    next()
}

export default userAuthentificationMiddleware