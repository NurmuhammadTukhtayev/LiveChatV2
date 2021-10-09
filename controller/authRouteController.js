const dbFunc=require('../database/dbFunc')
const bcrypt=require('bcrypt')
const {validationResult}=require('express-validator')

const uid=Math.random() * (100 - 1) + 1

exports.registerGetController=async (req, res)=>{
    res.render('sign', {
        pageTitle:"register"
    })
}

exports.registerPostController=async (req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json(errors)
    const {username, email, password}=req.body
    //check is username or email is available
    const isCorrect=await dbFunc.query("SELECT * FROM Users WHERE username=? OR email=?", [username, email])
    if(isCorrect.length) {
        console.log(isCorrect)
        return res.json("This email is not available")
    }

    const hashedPassword=await bcrypt.hash(password, 7)
    const ip=req.ip
    const last_seen=new Date()
    const result=await dbFunc.query('INSERT INTO Users (username, email, password, last_seen, ip_address) VALUES (?,?,?,?,?)',[username, email, hashedPassword, last_seen, ip])
    req.session.uid= uid;

    res.redirect('/')
}

exports.loginGetController=async (req, res)=>{
    res.render('login', {
        pageTitle:'login'
    })
}

exports.loginPostController=async (req, res)=>{
    // const errors=validationResult(req)
    // if(!errors.isEmpty())
    //     return res.status(400).json(errors)
    const {login, password}=req.body
    const user=await dbFunc.query("SELECT * FROM Users WHERE username=? OR email=?", [login, login])
    if(user.length<1)
        return res.send("Password or email incorrect")

    const pwd=await bcrypt.compare(password, user[0].password)

    if(!pwd)
        return res.send("Password or email incorrect")


    req.session.uid= uid;
    res.redirect('/')
}