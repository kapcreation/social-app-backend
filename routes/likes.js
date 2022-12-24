import express from "express"
import { getLikes, like } from "../controllers/likes.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.get('/', getLikes)
router.post('/', auth, like)

export default router