import { OkPacket } from "mysql2"
import { pool as connection } from "../../db"
export async function updateUsers (arr:Array<string|Date|number>) {
    let updateUsersQuery = `UPDATE users
                            SET 
                            user_first_name = ?,
                            user_last_name = ?,
                            user_email = ?,
                            user_startdate = ?,
                            user_designation = ?,
                            user_updated_date = ?
                            WHERE candidate_id = ?
                            `
    await connection.query(updateUsersQuery,arr)
    
  }