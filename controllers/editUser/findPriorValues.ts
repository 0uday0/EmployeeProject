
import { pool as connection  } from "../../db"
import { priorDepartment } from "../../types/departmentInterface"
import { priorLocation } from "../../types/locationInterface"

export async function locationPriorUpdate (candidateId:number):Promise<string> {
    let mapLocationQuery = `SELECT location_name FROM locations
                             INNER JOIN user_location_mapping
                            ON locations.location_id = user_location_mapping.map_location_id
                             INNER JOIN users
                            ON users.user_id = user_location_mapping.map_user_id
                            WHERE users.user_status = "1" AND
                            users.candidate_id = ?
                            `
    let result = await connection.query<Array<priorLocation>>(mapLocationQuery,[candidateId])
    return result[0][0].location_name
    
  }

export  async function departmentPriorUpdate (candidateId:number):Promise<string> {
    let mapDepartmentQuery = `SELECT department_name FROM departments
                             INNER JOIN user_department_mapping
                            ON departments.id = user_department_mapping.map_department_id
                             INNER JOIN users
                            ON users.user_id = user_department_mapping.map_user_id
                            WHERE users.user_status = "1" AND
                            users.candidate_id = ?
                            `
    let result = await connection.query<Array<priorDepartment>>(mapDepartmentQuery,[candidateId])
    return result[0][0].department_name
    
  }