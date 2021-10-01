const jwt=require('jsonwebtoken')
const {key}=require('../config.json').app

exports.auth=(req, res, next)=>{
    if(req.method==="OPTIONS")
        next()

    try {
        const token=req.headers.authorization
        console.log(token)
        if(!token)
            return res.status(400).json({message:"First log in"})
        const decoded=jwt.verify(token, key)
        console.log(decoded)
        next()
    }catch (err){
        console.log("First log in")
    }
}

exports.getRole=(roles)=>{
    return function (req, res, next){
        try {
            const token=req.headers.authorization
            console.log(token)
            if(!token)
                return res.status(400).json({message:"First log in"})
            const decoded=jwt.verify(token, key)
            console.log(decoded.roles)
            if(roles===decoded.roles)
                next()
            else
                return res.status(400).json("You have not access")
        }catch (err){
            console.log(err)
        }
    }
}