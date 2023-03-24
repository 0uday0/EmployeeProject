import { OkPacket } from "mysql2";
import { pool as connection } from "../../db";

let insertUser = `INSERT INTO users
(
  user_first_name,
  user_last_name,
  user_email,
  user_startdate,
  user_designation,
  user_created_date,
  candidate_id)
VALUES (?,?,?,?,?,?,?)
`
export let createUser =async (userDetails:Array<string|Date|number>):Promise<number> =>{
  let resultArray = await connection.query<OkPacket>(insertUser,userDetails)
  return resultArray[0].insertId
  
  }