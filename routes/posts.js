import express from "express"
import { getPosts, createPosts, deletePost } from "../controllers/posts.js"
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, getPosts)
router.post('/', auth, createPosts)
router.delete('/:id', auth, deletePost)

export default router