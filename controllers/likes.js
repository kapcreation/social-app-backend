import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getLikes = async (req, res) => {
  try {
    const q = 'SELECT userId FROM likes WHERE postId = ?'
    const values = [req.query.postId]

    const [data] = await db.query(q, values)
    return res.status(200).json(data.map(like => like.userId))
  } catch (err) {
    return res.status(500).json(err)
  }
}

export const like = async (req, res) => {
  try {
    const [likes] = await db.query('SELECT * FROM likes WHERE userId = ? AND postId = ?', [req.userInfo.id, req.body.postId])
    
    if(likes.length < 1) {
      const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?)"
      const values = [[req.userInfo.id, req.body.postId]]

      await db.query(q, values)
      return res.status(200).json('Post liked')
    } else {
      const q = "DELETE FROM likes WHERE userId = ? AND postId = ?"
      const values = [req.userInfo.id, req.body.postId]
      
      await db.query(q, values)
      return res.status(200).json('Post disliked')
    }
  } catch (err) {
    return res.status(500).json(err.message)
  }
}