import { Router } from "express";
import AdminRoutes from './Admin.js'
import ticketRoutes from './query.js'
const router = Router()

router.use('/admin',AdminRoutes)
router.use('/ticket',ticketRoutes)



export default router