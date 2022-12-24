import express from "express"
import { getUser, updateUser } from "../controllers/users.js"
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/:userId', getUser)
router.put('/', auth, updateUser)

export default router