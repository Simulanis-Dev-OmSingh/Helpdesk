import { Router } from "express";
import { createNewQuery ,getAllQueries} from "../controller/query.js";
const router = Router()

router.post('/create',createNewQuery)
router.get('/get-all-tickets',getAllQueries)

export default router