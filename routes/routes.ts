import express, {Request,Response} from "express"

import expressValidations from "../controllers/expressValidations"
import { newUserHandler } from "../controllers/newUser/newUserHandler"
import { updateUserHandler } from "../controllers/editUser/updateUserHandler"
import { deleteUserHandler} from "../controllers/deleteUser/deleteUserHandler"
import { createAdminTable } from "../models/createAdmin"
import { superAdminHandler } from "../controllers/superAdminHandler/superAdmin"
import { loginHandler } from "../controllers/loginHandler/loginHandler"
import { tokenVerification } from "../controllers/authenticationMiddleware"
export const router = express.Router()

router.get("/",(req:Request,res:Response)=>{
    createAdminTable()
    res.send("Typescript is working")
})
router.post("/login",loginHandler)
router.post("/newuser",tokenVerification,expressValidations,newUserHandler)
router.put("/updateuser",tokenVerification,expressValidations,updateUserHandler)
router.post("/createSuperAdmins",superAdminHandler)
router.delete("/deleteuser",tokenVerification,deleteUserHandler)

