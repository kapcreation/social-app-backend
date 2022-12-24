import express from "express"
import { getComments, createComment } from "../controllers/comments.js"
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getComments)
router.post('/', auth, createComment)

export default router