import { Router } from "express";
import { createAdmin ,forgetPassword ,login , getAdmin , getAllAdmin ,isAuthorized, userDetails} from "../controller/admin.js";
import { authorization } from "../middlewares/authorization.js";
const router = Router()

router.post('/create',authorization,createAdmin)
router.post('/resetpassword',authorization,forgetPassword)
router.post('/login',login)
router.get('/get-admin',authorization,getAdmin)
router.get('/get-allAdmin',authorization,getAllAdmin)
router.get('/isAuthorized',authorization,isAuthorized)
router.get('/details',authorization,userDetails)
export default router