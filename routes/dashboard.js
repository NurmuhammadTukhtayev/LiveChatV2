const express=require('express')
const {auth, getRole}=require('../controller/authMiddleware')
const router=express.Router()

//dashboard page
router.get('/', getRole('Admin'), (req, res)=>{
    res.send("Hello world")
})

module.exports=router