import  {pool as connection} from "../../db"
import { User } from "../../types/userInterface"
import { locationRow } from "../../types/locationInterface"
import { departmentRow } from "../../types/departmentInterface"
let userCandidate = `SELECT * FROM users
                          WHERE user_status = "1" AND
                          candidate_id = ?`

let checkUser = `SELECT * FROM users
                    WHERE user_status = "1" AND
                    users.user_email = ? `

let checkLocation = `SELECT * FROM locations
                    WHERE location_status = "1" AND
                    location_name = ?`
let checkDepartment = `SELECT * FROM departments
                    WHERE department_status = "1" AND
                    department_name = ?`





  export let findCandidateID = async(candidateId:number)=>{
    let result = await connection.query<Array<User>>(userCandidate,[candidateId])
    return result[0]
   
  }


export  let findAnyExistingUsers =async (email:string)=>{
  let result =await connection.query<Array<User>>(checkUser,[email])
  return result[0]
  }

export  let confirmLocation = async (location:string)=>{
    let result = await connection.query<Array<locationRow>>(checkLocation,[location])
    return result[0]
  }

export  let confirmDepartment =async (dept:string)=>{
   let result = await connection.query<Array<departmentRow>>(checkDepartment,[dept])
   return result[0]
  
  }                   