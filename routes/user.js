import express from 'express'
import UserController from '../controller/user.js'
import CommonController from '../controller/index.js'
import MessageController from '../controller/message.js' 
const router = express.Router()

router.get('/',UserController.getAllUsers)
// router.get('/:id',UserController.getUserById)
router.post('/createuser',UserController.createUser)
router.post('/login',UserController.login)
router.get('/get_message',MessageController.getMessage)
router.post('/post_message',MessageController.creatMessage)
router.post('/email-send',CommonController.emailSend)
router.post('/verify',CommonController.verifyCode)

router.post('/reset-password',CommonController.resetPassword)
// router.put('/:id',UserController.editUserById)
// router.delete('/:id',UserController.deleteUserById)

export default router