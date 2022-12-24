import { db } from '../connect.js' 
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
  const q = "SELECT * FROM users WHERE id = ?"

  const [data] = await db.query(q, [req.params.userId])
  const { password, ...info } = data[0]
  return res.status(200).json(info)
}

export const updateUser = async (req, res) => {
  try {
    const q = "UPDATE users SET `name`=?,`city`=?,`website`=?,`coverPic`=?,`profilePic`=? WHERE id=?"
  
    const values = [
      req.body.name,
      req.body.city,
      req.body.website,
      req.body.coverPic,
      req.body.profilePic,
      req.userInfo.id
    ]

    const [data] = await db.query(q, values)
    if (data.affectedRows > 0) return res.json('User updated!')
    return res.status(403).json('Nothing updated!')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}