import express from 'express' 
import cors from 'cors'
import connectDB from './db/conn.js'
import dotenv  from 'dotenv'
import router from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors())

const newPath = path.join( __dirname, '../uploads')
app.use('/uploads', express.static(path.join(newPath)));

app.use('/api/user', router)
app.use('/api/post', postRouter )

app.listen(process.env.PORT || 5000 , () => {
    connectDB()
})
