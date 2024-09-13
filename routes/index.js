import express from 'express'
import UserRoutes from './user.js'
import MemberRoutes from './member.js'
const router = express.Router()
//for home page
router.get('/',(req,res)=>{
    res.json({ message: 'Hello DBCC from Express Back End!' });
})

//other routes
router.use('/user',UserRoutes)
router.use('/member',MemberRoutes)


export default router