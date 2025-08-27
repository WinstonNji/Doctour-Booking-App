import { addDoctor } from "../controllers/admin.controller.js";
import { adminLogin } from "../controllers/admin.controller.js";
import { updateDoctorByAdmin } from "../controllers/admin.controller.js";
import upload from "../middlewares/multer.js";
import express from "express"
// import { authentificateAdmin } from "../middlewares/admin.authentification.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/add-doctor', authMiddleware , upload.single('image'), (req,res,next)=>{
    if(req.user?.role === 'demo_admin'){
        return res.status(200).json({ success:true, message: 'Demo Mode: simulated success. Changes not saved.' })
    }
    next()
}, addDoctor)
router.post('/admin-login', adminLogin)
router.get('/admin-verification', authMiddleware, (req,res) => {
        const {role} = req.user
        
        if(role !== 'admin' && role !== 'demo_admin') {
            return res.json({success: false, message: 'Access Denied'})
        }
        
        return res.status(200).json({success: true, message: 'Admin Verification Successful'})
    
})

// update doctor (admin only)
router.patch('/update-doctor/:id', authMiddleware, upload.single('image'), (req,res,next)=>{
    if(req.user?.role === 'demo_admin'){
        return res.status(200).json({ success:true, message: 'Demo Mode: simulated success. Changes not saved.' })
    }
    next()
}, updateDoctorByAdmin)


export default router

