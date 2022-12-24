import { db } from '../connect.js'
import jwt from 'jsonwebtoken'
import moment from 'moment'

export const getPosts = async (req, res) => {
  try {
    const context = req.query.context

    let q = ``
    let values = []

    switch(context) {
      case 'feed':
        q = `
          SELECT p.*, u.id AS userId, name, profilePic 
          FROM posts AS p 
          JOIN users AS u ON (u.id = p.userId) 
          ORDER BY p.createdAt DESC      
        `
        values = [req.userInfo.id, req.userInfo.id]
        break
      case 'profile':
        q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        values = [req.query.userId]
        break
      default:
        break
    }

    const [data] = await db.query(q, values)
    
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const createPosts = async (req, res) => {
  try {
    const q = "INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) VALUES (?)"

    const values = [
      req.body.desc,
      req.body.imgUrl,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      req.userInfo.id
    ]

    await db.query(q, [values])
    return res.status(200).json('Post has been created!')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const deletePost = async (req, res) => {
  try {
    const q = "DELETE FROM posts WHERE `id`=? AND `userId`=?"

    const values = [
      req.params.id,
      req.userInfo.id
    ]

    const [data] = await db.query(q, values)
    if (data.affectedRows > 0) return res.status(200).json('Post has been created!')
    return res.status(403).json('Nothing deleted!')
  } catch (error) {
    return res.status(500).json(err.message)
  }
}