import { pool as connection } from "../../db"
import { departmentRow } from "../../types/departmentInterface"
import { locationRow } from "../../types/locationInterface"
import { User } from "../../types/userInterface"

export async function checkCandidateId (candidateId:number):Promise<Array<User>>{
    let candidateCheckQuery = `SELECT * FROM users
                              WHERE user_status = '1' AND
                              candidate_id = ?`
    let result = await connection.query<Array<User>>(candidateCheckQuery,[candidateId])
    return result[0]
    
  }

export async  function checkEmailUniqueness(arr:Array<string|number>):Promise<Array<User>> {
    let emailCheckQuery = `SELECT * FROM users
                          WHERE user_status = '1' AND
                          user_email = ? 
                          AND NOT candidate_id = ?`
    let result = await connection.query<Array<User>>(emailCheckQuery,arr)
    return result[0]
    
  }

export async  function checkLocation (location:string):Promise<Array<locationRow>> {
    let locationCheckQuery = `SELECT * FROM locations
                              WHERE location_status = "1" AND
                              location_name = ?`
    let result =await connection.query<Array<locationRow>>(locationCheckQuery,[location])
    return result[0]
    
  }

export async function checkDepartment (department:string):Promise<Array<departmentRow>> {
    let departmentCheckQuery = `SELECT * FROM departments
                                WHERE department_status = "1" AND
                                department_name = ?`
    let result = await connection.query<Array<departmentRow>>(departmentCheckQuery,[department])
    return result[0]
    
}