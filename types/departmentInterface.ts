import { RowDataPacket } from "mysql2"

export interface departmentID extends RowDataPacket {
    id:number
}

export interface UserDepartment {
    user_id:number
    dep_id:number}

export interface departmentRow extends RowDataPacket {
        id:number
        department_name:string
        department_status:"Active"|"InActive"
    }

export interface priorDepartment extends RowDataPacket {
    department_name:string
}