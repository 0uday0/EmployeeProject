import { Request,Response } from "express";
import bcrypt from "bcrypt"
import { pool as connection } from "../../db";
import { OkPacket } from "mysql2";
export async  function superAdminHandler (req:Request,res:Response) {
    let userName:string= req.body.userName
    let password:string= req.body.password
    const hashPassword = async (pswd:string,saltRounds=10) =>{
        try {
            let salt = await bcrypt.genSalt(saltRounds)
            return await bcrypt.hash(pswd,salt)
        }
        catch (err) {
            console.log(err)
            return null
        }
        
    }
    
    
    
    try {
        let hashedPassword = await hashPassword(password)
        const updateAdmin = async ():Promise<void>=>{
            let query = `INSERT INTO superAdmins(username,password)
                        VALUES(?,?)`
            await connection.query(query,[userName,hashedPassword])
            
        }
        await updateAdmin()
        
        res.status(200).send("Yahoo you're a super admin")
    }
    catch (err) {
        res.status(400).send(err)
    }
}
