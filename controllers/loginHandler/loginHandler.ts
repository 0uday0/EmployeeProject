import { Request,Response } from "express";
import { pool as connection } from "../../db";
import bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { admin } from "../../types/adminInterface";

export async function loginHandler(req:Request,res:Response) {
    let userName = req.body.userName
    let password = req.body.password
    async function checkCredentials () {
        let credentials = `SELECT username,password FROM superAdmins
                                WHERE username = ?`
        let result = await connection.query<Array<admin>>(credentials,[userName])
        let checkUserName = result[0]
        
        return checkUserName
    }
    try {
        let results = await checkCredentials()
    let validPassword = await bcrypt.compare(password,results[0].password)
    if (validPassword) {
        const jsonToken = jwt.sign({user_id: results[0].username,password:results[0].password},"MySecret")
        res.status(200).json(jsonToken)
    }
    }
    catch (err) {
        res.status(500).json(err)
    }
    
    
}