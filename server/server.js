import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
import userRouter from './routes/userRoutes.js'


//API config
const PORT = process.env.PORT || 4000
const app = express()
await connectDB()

//Middleware

app.use(express.json())
app.use(cors())


//API routes

app.get('/', (req, res) =>res.send('API working'))
app.use('/api/user',userRouter)

app.listen(PORT, () => console.log("Server is running on port " + PORT))