import jwt from 'jsonwebtoken';

export const authMiddleware = (req,res,next) => {
    const AuthHeaders = req.headers.authorization



    if(!AuthHeaders){
        return res.json({success: false, message: 'Failed to find headers'})
    }

    const token = AuthHeaders && AuthHeaders.split(' ')[1]

    if(!token){
        return res.json({success: false, message: "Couldn't find token"})
    }

    const decoded = jwt.verify(token,  process.env.JWT_SECRET )

    req.user = {
        userId : decoded.userId ,
        role: decoded.role
    }

    next()
}

