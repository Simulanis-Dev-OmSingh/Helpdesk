import { Router } from "express";
import { createQuery ,getAllQueries , getAllUsers , getQuery , getUserDetails , updateQuery , filterQuery , markAsSolved} from "../controller/query.js";
import { authorization } from "../middlewares/authorization.js";
const router = Router()

router.post('/create',createQuery)
router.get('/get-all-tickets',authorization,getAllQueries)
router.get('/get-all-users',authorization,getAllUsers)
router.get('/get-user',authorization,getUserDetails)
router.get('/get-query',authorization,getQuery)
router.post('/update-ticket',authorization,updateQuery)
router.get('/filter',authorization,filterQuery)
router.post('/mark-as-solved',authorization,markAsSolved)

export default router