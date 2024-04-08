import { Router } from "express";
import { createQuery ,getAllQueries , getAllUsers , getQuery , getUserDetails , updateQuery} from "../controller/query.js";
const router = Router()

router.post('/create',createQuery)
router.get('/get-all-tickets',getAllQueries)
router.get('/get-all-users',getAllUsers)
router.get('/get-user',getUserDetails)
router.get('/get-query',getQuery)
router.post('/update-ticket',updateQuery)

export default router