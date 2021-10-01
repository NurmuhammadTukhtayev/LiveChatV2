const db=require('../database/db').promise()
const chalk=require('chalk')

let query=async (sql, data)=>{
    try{
        let d=await db.query(sql, data)
        return d[0]
    }catch (err){
        console.log(chalk.red("ErrorDB: dbFunc \n#####################\n\n\n"), err)
        return {err:1, errdata:err}
    }
}

module.exports={
    query:query
}