import { RowDataPacket } from "mysql2"

export interface User extends RowDataPacket {
    user_id: number
    user_first_name: string
    user_last_name: string
    user_email: string
    user_startdate: Date
    user_designation: string
    user_created_date: Date
    user_updated_date: Date|null
    user_status: "Active"|"InActive"
    candidate_id: number
}

export interface UserNeo  {
    user_id: number
    first_name: string
    last_name: string
    email: string
    start_date: Date
    designation: string
    cand_id: number
  }

export interface editUserInNeo {
    candidateID: number
    firstName:string
    lastName:string
    email:string
    startdate:Date
    designation:string
} 

export interface userID extends RowDataPacket {
    user_id:number
}