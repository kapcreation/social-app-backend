import express from 'express'
const app = express()
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'
import likeRoutes from './routes/likes.js'
import relationshipRoutes from './routes/relationships.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

app.use(express.json())
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)
app.use('/likes', likeRoutes)
app.use('/relationships', relationshipRoutes)

app.listen(5000, () => {
  console.log('Server listening on port 5000')
})