import express from 'express'
import UserController from '../controllers/userController.js'
import authorizeBearerToken from '../middleware/auth.js'
const router = express.Router()

router.get('/', authorizeBearerToken, UserController.getAllUsers)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/update/:id', authorizeBearerToken, UserController.updateUser)
router.get('/profile', authorizeBearerToken, UserController.getUser)
router.get('/logout', authorizeBearerToken, UserController.logout)

export default router


