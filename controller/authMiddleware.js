exports.auth=(req, res, next)=>{
    if(req.method==="OPTIONS")
        next()

    try {
        const isLogIn=req.session.uid
        if(!isLogIn)
            return res.redirect('/auth/register')
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
            else
                return res.redirect('/login')
        }catch (err){
            console.log(err)
        }
    }
}