import { RequestHandler } from "express";

import * as jwt from "jsonwebtoken"

export let tokenVerification:RequestHandler = (req,res,next) => {
    const authHeader = req.headers.authorization
    
    if (typeof authHeader != "undefined") {
        let jwtToken = authHeader.split(" ")[1]
        jwt.verify(jwtToken,"MySecret",async (err,payload)=>{
            if (err) {
                res.status(401).send("Invalid JWT token")
            } else {
                next()
            }
        })
    } else {
        res.status(400).send("No jwt token")
    }
    
    
}