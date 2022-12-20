import { db } from '../connect.js'
import jwt from 'jsonwebtoken'
import moment from 'moment'

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json('Not logged in!')

  const context = req.query.context

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

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
        values = [userInfo.id, userInfo.id]
        break
      case 'profile':
        q = `SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        values = [req.query.userId]
        break
      default:
        break
    }

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err)
      
      return res.status(200).json(data)
    })
  })
}

export const createPosts = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json('Not logged in!')

  jwt.verify(token, 'secretkey', async (err, userInfo) => {
    if (err) return res.status(403).json(err)

    const q = "INSERT INTO posts (`desc`,`img`,`createdAt`,`userId`) VALUES (?)"

    const values = [
      req.body.desc,
      req.body.imgUrl,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      userInfo.id
    ]

    db.query(q, [values], (err, data) => {
      if (err) res.status(500).json(err)

      return res.status(200).json('Post has been created!')
    })
  })
}

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken
  if (!token) return res.status(401).json('Not logged in!')

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(403).json(err)

    const q = "DELETE FROM posts WHERE `id`=? AND `userId`=?"

    const values = [
      req.params.id,
      userInfo.id
    ]

    db.query(q, values, (err, data) => {
      if (err) res.status(500).json(err)

      if (data.affectedRows > 0) return res.status(200).json('Post has been created!')
      return res.status(403).json('Nothing deleted!')
    })
  })
}