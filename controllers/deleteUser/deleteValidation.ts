import { userID } from "../../types/userInterface"
import { pool as connection } from "../../db"


  export async function fetchUserIdFromUsers (candidateId:number){
    let userIdQuery = `SELECT user_id FROM users
                       WHERE users.user_status = '1' AND
                       candidate_id = ?`
    console.log(candidateId)
    let result =await connection.query<Array<userID>>(userIdQuery,[candidateId])
    return result[0]
    
  }