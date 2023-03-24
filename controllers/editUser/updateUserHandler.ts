import { Request,Response } from "express";
import { validationResult } from "express-validator";
import { checkCandidateId,checkEmailUniqueness,checkDepartment,checkLocation } from "./editValidations";
import { updateUsers } from "./updateUserTable";
import { updateUserInNeo } from "./updateUserNeo";
import { locationPriorUpdate,departmentPriorUpdate } from "./findPriorValues";
import { makeStatusInActive,insertNewRow,deletePreviousRelation,createNewRelation } from "./updateUserLocationMapping";
import { dep_makeStatusInActive,dep_insertNewRow,dep_deletePreviousRelation,dep_createNewRelation } from "./updateDepartmentMapping";
import { createNewLocation, createNewLocationNode } from "../createLocation";
import { createNewDepartment, createNewDepartmentNode } from "../createDepartment";
export async function updateUserHandler(req:Request,res:Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array())
    } else {
        let firstName:string = req.body.firstName
        let lastName:string = req.body.lastName
        let email:string = req.body.email
        let startDate:Date = req.body.startDate
        let location:string =req.body.location
        let department:string = req.body.department
        let designation:string = req.body.designation
        let candidateId:number= req.body.candidateId
        let date = new Date()
        let candidateToBeUpdated = await checkCandidateId(candidateId)
        let usersWithEmail = await checkEmailUniqueness([email,candidateId])
        let locationExists = await checkLocation(location)
        let departmentExists = await checkDepartment(department)
        if (locationExists.length === 0){
            let newLocationId = await createNewLocation(location)
            await createNewLocationNode({loc_id:newLocationId,loc_name:location,loc_status:1})
        }
        if (departmentExists.length === 0) {
           let departmentId = await createNewDepartment(department)
           await createNewDepartmentNode({dep_id:departmentId,dep_name:department,dep_status:1})
        }
        if (candidateToBeUpdated.length === 0) {
            res.status(400).json("There is no candidate with this id")
        } 
        else if (usersWithEmail.length != 0) {
            res.status(400).json("The email id is already registered")
        } 
        
        else {
            try {
                await updateUsers([
                    firstName,lastName,email,startDate,designation,date,candidateId
                  ])
                await updateUserInNeo({
                    candidateID: candidateId,
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    startdate:startDate,
                    designation:designation})
                let locationBeforeUpdation = await locationPriorUpdate(candidateId)
                let departmentBeforeUpdation = await departmentPriorUpdate(candidateId)
                    
                if (locationBeforeUpdation != location) {
                    async function updateUserLocation () {
                        let user_id = candidateToBeUpdated[0].user_id
                        let current_location_id = locationExists[0].location_id
                        await makeStatusInActive(user_id)
                        await insertNewRow([user_id,current_location_id,date])
                        await deletePreviousRelation({user_id:user_id})
                        await createNewRelation({user_id:user_id,loc_id:current_location_id})
                      }
                    await updateUserLocation()
                    }
                if (departmentBeforeUpdation != department) {
                    async function updateUserDepartment () {
                        let current_user_id = candidateToBeUpdated[0].user_id
                        let current_department_id = departmentExists[0].id
                        await dep_makeStatusInActive(current_user_id)
                        await dep_insertNewRow([current_user_id,current_department_id,date])
                        await dep_deletePreviousRelation({user_id:current_user_id})
                        await dep_createNewRelation({user_id:current_user_id,dep_id:current_department_id})
                        }
                        await updateUserDepartment()
                      }
                res.status(200).send("User updation is successful")
            }
            catch (err) {
                res.status(500).json(err)
                // res.status(500).json("Internal server error User could not be updated")
            }
            
        } 
    }
}