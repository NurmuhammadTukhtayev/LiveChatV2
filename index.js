const {PORT}=require('./config.json').app
const express=require('express')
const authRote=require('./routes/authRote')
const dashboard=require('./routes/dashboard')
const app=express()

app.use(express.json())


app.use('/', dashboard)
app.use('/auth', authRote)

app.listen(PORT, ()=>{
    console.log("Server started at http://localhost:"+PORT)
})