import express from "express"
import { getRelationship, addRelationship, deleteRelationship } from "../controllers/relationships.js"
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/:followedUserId', getRelationship)
router.post('/', auth, addRelationship)
router.delete('/', auth, deleteRelationship)

export default router