import { db } from '../connect.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    // Check if user already exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE username = ?', [req.body.username])
    if (existingUser.length) return res.status(409).json('User already exists!')

    // Hash password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(req.body.password, salt)

    // Insert new user into database
    const values = [req.body.username, req.body.email, hashedPassword, req.body.name]
    await db.query('INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)', [values])

    return res.status(200).json('User has been created.')
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const login = async (req, res) => {
  try {
    // Check if user exists
    const [user] = await db.query('SELECT * FROM users WHERE username = ?', [req.body.username])
    if (user.length === 0) return res.status(404).json("User not found!")

    // Check password
    const checkPassword = bcrypt.compareSync(req.body.password, user[0].password)
    if (!checkPassword) return res.status(400).json("Wrong password or username!")

    // Generate and return JWT
    const token = jwt.sign({ id: user[0].id }, "secretkey")
    const { password, ...others } = user[0]
    res.status(200).json({ ...others, token })
  } catch (error) {
    return res.status(500).json(error)
  }
}