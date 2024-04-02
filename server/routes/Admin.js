import { Router } from "express";
import { createAdmin ,forgetPassword ,loginUser} from "../controller/admin.js";
const router = Router()

router.post('/create',createAdmin)
router.post('/resetpassword',forgetPassword)
router.post('/login',loginUser)
export default router