import mysql from "mysql2/promise"
import * as dotenv from "dotenv"
dotenv.config()

export const pool = mysql.createPool( {
    connectionLimit:4,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PSWD,
    database: process.env.DB_NAME
})

// pool.getConnection((err,connection)=>{
//     if (err) {
//         throw err
//     } else {
//         console.log("Database got succesfully connected")
//         connection.release()
//     }
// })
async function getConectionFromPool () {
    try {
        await pool.getConnection()
        console.log("Database got successfully connected")
    }
    catch (err) {
        throw err
    }
    
}
getConectionFromPool()