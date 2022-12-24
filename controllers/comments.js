import { db } from "../connect.js"
import jwt from 'jsonwebtoken'
import moment from 'moment'

export const getComments = async (req, res) => {
  try {
    const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC`

    const [data] = await db.query(q, [req.query.postId])
    return res.status(200).json(data) 
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const createComment = async (req, res) => {
  try {
    const q = "INSERT INTO comments (`comment`,`createdAt`,`userId`,`postId`) VALUES (?)"

    const values = [
      req.body.comment,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      req.userInfo.id,
      req.body.postId
    ]

    await db.query(q, [values])
    return res.status(200).json('Comment has been created!')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}