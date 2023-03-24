import { OkPacket } from "mysql2"
import {pool as connection} from "../../db"
import { driver } from "../../neo"
import { departmentID,UserDepartment } from "../../types/departmentInterface"

export async function getDepartmentId (department:string):Promise<number> {
    let departmentFetch = `SELECT id FROM departments
                          WHERE department_status = "1" AND
                          department_name = ?`
    let resultArray = await connection.query<Array<departmentID>>(departmentFetch,[department])
    return resultArray[0][0].id
   
  }

export  async function userDepartmentMapping (arr:Array<number|Date>):Promise<number>{
    let userDepartmentQuery = `INSERT INTO user_department_mapping
                            (
                              map_user_id,
                              map_department_id,
                              map_created_date
                            )
                            VALUES (?,?,?)`
    let resultArray = await connection.query<OkPacket>(userDepartmentQuery,arr)
    return resultArray[0].insertId
    
  }

export async function createUserDepartment (dataObject:UserDepartment) {
    const session = driver.session()
    await session.executeWrite(
      (tx)=>tx.run(
        `MATCH (u:User {user_id:$user_id})
        MATCH (d:Department {department_id:$dep_id})
        CREATE (u)-[:DEPARTMENT_OF]->(d)`,
        dataObject
      )
    )
    console.log("dep relationship is created")
    await session.close()
  }