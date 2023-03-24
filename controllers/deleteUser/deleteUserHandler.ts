import { Request,Response } from "express";
import { fetchUserIdFromUsers } from "./deleteValidation";
import { deActivateFromUsers,deActivateFromLocationMapping,deActivateFromDepartmentMapping } from "./deleteFromSql";
import { deleteUserLocationRelation ,deleteUserDepartmentRelation, setUserToInActive} from "./deleteFromNeo";

export async function deleteUserHandler(req:Request,res:Response) {
    let candidateId:number = req.body.candidateId
    let result_array= await fetchUserIdFromUsers(candidateId)
    if (result_array.length === 0 ){
        res.status(400).json("Recheck the candidate ID submitted")
    } 
    else {
        let user_id = result_array[0].user_id
        await deActivateFromUsers(user_id)
        await deActivateFromLocationMapping(user_id)
        await deActivateFromDepartmentMapping(user_id)
        await setUserToInActive({req_id:user_id})
        await deleteUserLocationRelation({req_id:user_id})
        await deleteUserDepartmentRelation({req_id:user_id})
        res.status(200).send("User is successfully deleted")
    }
}