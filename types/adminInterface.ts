import { RowDataPacket } from "mysql2"

export interface admin  extends RowDataPacket{
    username:string
    password:string
}