import { db } from '../connect.js'
import jwt from 'jsonwebtoken'

export const getRelationship = async (req, res) => {
  try {
    const q = 'SELECT followerUserId FROM relationships WHERE followedUserId = ?'

    const [data] = await db.query(q, [req.params.followedUserId])
    return res.status(200).json(data.map(relationShip=>relationShip.followerUserId))
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const addRelationship = async (req, res) => {
  try {
    const q = "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)"
    const values = [[
      req.userInfo.id,
      req.body.userId
    ]]

    await db.query(q, values)
    return res.status(200).json('User Followed')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const deleteRelationship = async (req, res) => {
  try {
    const q = "DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = ?"
    const values = [
      req.userInfo.id,
      req.query.userId
    ]

    await db.query(q, values)
    return res.status(200).json('User Unfollowed')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}