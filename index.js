const {PORT}=require('./config.json').app
const express=require('express')
const dashboard=require('./routes/dashboard')
const authRoute=require('./routes/authRote')
const pnf=require('./controller/error')
const {auth}=require('./controller/authMiddleware')
const app=express()

// dependencies
const cookieParser=require('cookie-parser')
const session=require('express-session')
const fileStorage=require('session-file-store')(session)

// use the cookies
app.use(cookieParser('the secret key is secret'))
app.use(session({
    secret:'the secret key is secret',
    resave:false,
    saveUninitialized:false,
    store:new fileStorage({path:__dirname+'./session-storage'}),
    cookie: { maxAge: 60*1000, secure: false, httpOnly: false }
}))

app.get('/info', (req, res)=>{
    res.send("Hello, your id is "+(req.session.uid || "not find"))
})

app.set('view engine', 'ejs')
app.set('views', 'view')

app.use(express.json())
app.use(express.urlencoded({extended: false }))
app.use(express.static('public'))

app.use('/', dashboard)
app.use('/auth', authRoute)
app.use(pnf)

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:"+PORT)
})