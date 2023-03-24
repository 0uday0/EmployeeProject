import { validationResult } from "express-validator";
import { Request,Response } from "express";
import { findCandidateID, findAnyExistingUsers,confirmLocation,confirmDepartment} from "./advancedValidations"
import { createUser } from "./createUserSql";
import { UserNeo } from "../../types/userInterface";
import { createUserNode } from "./createUserNode";
import { getLocationId,userLocationMapping, createUserLocation} from "./locationMap";
import { getDepartmentId,userDepartmentMapping,createUserDepartment } from "./departmentMap";
import { createNewLocation, createNewLocationNode } from "../createLocation";
import { createNewDepartment, createNewDepartmentNode } from "../createDepartment";


export async function newUserHandler (req:Request,res:Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array())
    } else {
        let userEmailId:string= req.body.email
        let userLocation:string = req.body.location
        let userDepartment:string = req.body.department
        let userCandidateId:number = req.body.candidateId
        let userFirstName:string = req.body.firstName
        let userLastName:string = req.body.lastName
        let userStartDate:Date = req.body.startDate
        let userDesignation:string = req.body.designation
        try {
            let existingUsers = await findAnyExistingUsers(userEmailId)
            let existingLocation = await confirmLocation(userLocation)
            let existingDepartment = await confirmDepartment(userDepartment)
            let existingCandidateID = await findCandidateID(userCandidateId)
            if (existingLocation.length === 0) {
              let newLocationId = await createNewLocation(userLocation)
                await createNewLocationNode({loc_id:newLocationId,loc_name:userLocation,loc_status:1})
            }
            if (existingDepartment.length === 0) {
              let newDepartmentId = await createNewDepartment(userDepartment)
                await createNewDepartmentNode({dep_id:newDepartmentId,dep_name:userDepartment,dep_status:1})
            }
            if (existingUsers.length != 0) {
                res.status(400).json("This email id is already taken")
                
              } else if (existingCandidateID.length != 0) {
                res.status(400).json("This candidate ID is already registered")
              } else {
                const date = new Date()
                let userDetails: Array<string|Date|number> = [
                    userFirstName,
                    userLastName,
                    userEmailId,
                    userStartDate,
                    userDesignation,
                    date,
                    userCandidateId
                  ]
                  let insertId:number = await createUser(userDetails)
                  let data:UserNeo = {
                    user_id: insertId,
                    first_name: userFirstName,
                    last_name: userLastName,
                    email: userEmailId,
                    start_date: userStartDate,
                    designation: userDesignation,
                    cand_id: userCandidateId
                  }
                  try {
                    await createUserNode(data)
                    let locationID = await getLocationId(userLocation)
                    await userLocationMapping([insertId,locationID,date])
                    await createUserLocation ({user_id:insertId,loc_id:locationID})
                    let departmentID = await getDepartmentId(req.body.department)
                    await userDepartmentMapping([insertId,departmentID,date])
                    await createUserDepartment ({user_id:insertId,dep_id:departmentID})
                    res.status(200).json("User is successfully created")
                  }
                  catch (err) {
                    res.status(500).json(err)
                  }
                  
              }
        }
        catch (err) {
            res.status(500).json("Oops! Internal Server Error")
        }

        
    }
}