const express=require('express')
const router=express.Router()
//import check for validation
const {check}=require('express-validator')
const authRouteController=require('../controller/authRouteController')

router.post('/register',[
    check('username', "Username must be not empty").notEmpty(),
    check('username', "Username must be minimum 4 characters").isLength({min:4, max:15}),
    check('password', "").isLength({min:4, max:15})
],authRouteController.registerPostController)

router.post('/login', authRouteController.loginPostController)

module.exports=router