import express from "express"
import { getRelationship, addRelationship, deleteRelationship } from "../controllers/relationships.js"

const router = express.Router()

router.get('/:followedUserId', getRelationship)
router.post('/', addRelationship)
router.delete('/', deleteRelationship)

export default router