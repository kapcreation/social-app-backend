import { db } from '../connect.js' 

export const getUser = (req, res) => {
  const q = "SELECT * FROM users WHERE id = ?"

  db.query(q, [req.params.userId], (err, data) => {
    if (err) return res.status(500).json(err)

    const { password, ...info } = data[0]
    return res.status(200).json(info)
  })
}