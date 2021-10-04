const express=require('express')
const {auth, getRole}=require('../controller/authMiddleware')
const router=express.Router()

//dashboard page
router.get('/', auth,(req, res)=>{
    res.render('index.ejs', {
        pageTitle:'dashboard'
    })
})

router.get('/users', getRole('Admin'), (req, res)=>{
    res.json("Users")
})

module.exports=router