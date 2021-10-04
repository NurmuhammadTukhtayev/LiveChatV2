const jwt=require('jsonwebtoken')
const {key}=require('../config.json').app

exports.auth=(req, res, next)=>{
    if(req.method==="OPTIONS")
        next()

    try {
        const token=req.header('authorization')
        if(!token)
            return res.redirect('/auth/register')
        const decoded=jwt.verify(token, key)
        console.log(decoded)
        next()
    }catch (err){
        console.log(err)
    }
}

exports.getRole=(roles)=>{
    return function (req, res, next){
        try {
            const token=req.header.authorization
            console.log(token)
            if(!token)
                return res.redirect('/')
            const decoded=jwt.verify(token, key)
            if(roles===decoded.roles)
                next()
            else
                return res.redirect('/login')
        }catch (err){
            console.log(err)
        }
    }
}