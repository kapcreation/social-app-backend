import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: 'Not logged in!' })
  }

  try {
    req.userInfo = jwt.verify(token, 'secretkey')
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Token is not valid!' })
  }
}

export default auth