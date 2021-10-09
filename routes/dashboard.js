const express=require('express')
const {auth, getRole}=require('../controller/authMiddleware')
const router=express.Router()

//dashboard page
router.get('/',(req, res)=>{
    res.render('index.ejs', {
        pageTitle:'dashboard'
    })
})

router.get('/users',  (req, res)=>{
    res.json("Users")
})

module.exports=router