const dbFunc=require('../database/dbFunc')
const bcrypt=require('bcrypt')
const {validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const {key}=require('../config.json').app

const generateAccessToken=(id, roles)=>{
    const payload={
        id,
        roles
    }
    return jwt.sign(payload, key)
}

exports.registerPostController=async (req, res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
        return res.status(400).json(errors)
    const {username, email, password}=req.body
    const hashedPassword=await bcrypt.hash(password, 7)
    const ip=req.ip
    const last_seen=new Date()
    const result=await dbFunc.query('INSERT INTO Users (username, email, password, last_seen, ip_address) VALUES (?,?,?,?,?)',[username, email, hashedPassword, last_seen, ip])
    res.send(result)
}

exports.loginPostController=async (req, res)=>{
    const {username, email, password}=req.body
    const login=username || email
    const user=await dbFunc.query("SELECT * FROM Users WHERE username=? OR email=?", [login, login])
    if(user.length<1)
        return res.send("Password or email incorrect")

    const pwd=await bcrypt.compare(password, user[0].password)

    if(!pwd)
        return res.send("Password or email incorrect")

    const token=generateAccessToken(user[0].id, user[0].role)
    res.json(token)
}