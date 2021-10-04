const {PORT}=require('./config.json').app
const express=require('express')
const authRote=require('./routes/authRote')
const dashboard=require('./routes/dashboard')
const pnf=require('./controller/error')
const app=express()

app.set('view engine', 'ejs')
app.set('views', 'view')

app.use(express.json())
app.use(express.urlencoded({extended: false }))
app.use(express.static('public'))

app.use('/', dashboard)
app.use('/auth', authRote)

app.use(pnf)

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:"+PORT)
})