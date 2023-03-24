import { RowDataPacket } from "mysql2"

export interface locationID extends RowDataPacket {
    location_id:number
}

export interface userIdLocationId {
    user_id:number
    loc_id:number
}

export interface locationRow extends RowDataPacket {
    location_id:number
    location_name:string
    location_status:"Active"|"InActive"
}

export interface priorLocation extends RowDataPacket {
    location_name:string
}