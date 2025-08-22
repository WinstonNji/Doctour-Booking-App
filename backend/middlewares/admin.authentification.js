import jwt from "jsonwebtoken"

export const authentificateAdmin = (req,res, next) => {
    const authHeaders = req.headers.authorization
    const token = authHeaders.split(' ')[1]

    if(!token){
        return res.json({success: false, message: "Couldn't authenticate. No token found"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)


    if(decoded.role !== 'admin'){
        return res.json({success:false, message: 'Access Denied. Admins Only.'})
    }
    
    req.user = {
        role : decoded.role
    }
    
    next()
        
}
