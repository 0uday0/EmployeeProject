import { OkPacket } from "mysql2"
import { pool as connection } from "../../db"


export async function deActivateFromUsers (userId:number) {
    let deactivateUserQuery = `UPDATE users
                               SET user_status = '0'
                               WHERE user_id = ?
                                `
    await connection.query(deactivateUserQuery,[userId])
                            
  }



  export  async function deActivateFromLocationMapping (userid:number) {
    let deactivateUserQuery = `UPDATE user_location_mapping
                               SET map_status = '0'
                               WHERE map_user_id = ?
                                `
    await connection.query(deactivateUserQuery,[userid])
  
  }



  export  async function deActivateFromDepartmentMapping(userid:number){
    let deactivateUserQuery = `UPDATE user_department_mapping
                               SET map_status = '0'
                               WHERE map_user_id = ?
                                `
    return connection.query(deactivateUserQuery,[userid])
    
  }
