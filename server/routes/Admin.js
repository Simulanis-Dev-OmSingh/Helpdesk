import { Router } from "express";
import { createAdmin ,forgetPassword ,login , getAdmin , getAllAdmin} from "../controller/admin.js";
const router = Router()

router.post('/create',createAdmin)
router.post('/resetpassword',forgetPassword)
router.post('/login',login)
router.get('/get-admin',getAdmin)
router.get('/get-allAdmin',getAllAdmin)
export default router