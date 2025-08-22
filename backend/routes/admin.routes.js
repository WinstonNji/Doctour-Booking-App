import { addDoctor } from "../controllers/admin.controller.js";
import { adminLogin } from "../controllers/admin.controller.js";
import upload from "../middlewares/multer.js";
import express from "express"
// import { authentificateAdmin } from "../middlewares/admin.authentification.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/add-doctor', authMiddleware , upload.single('image'), addDoctor)
router.post('/admin-login', adminLogin)
router.get('/admin-verification', authMiddleware, (req,res) => {
        const {role} = req.user
        
        if(role !== 'admin') {
            return res.json({success: false, message: 'Access Denied'})
        }
        
        return res.status(200).json({success: true, message: 'Admin Verification Successful'})
    
})


export default router

