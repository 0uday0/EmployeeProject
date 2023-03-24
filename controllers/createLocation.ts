import { OkPacket } from "mysql2";
import { pool as connection } from "../db";
import { driver } from "../neo";

export async function createNewLocation(locationName:string) {
    let createNewLocationQuery = `INSERT INTO locations(location_name)
                                  VALUES (?)`
    let resultArray = await connection.query<OkPacket>(createNewLocationQuery,[locationName])
    return resultArray[0].insertId
}

export async function createNewLocationNode(dataObject:{loc_id:number,loc_name:string,loc_status:number}) {
    let session = driver.session()
    await session.executeWrite(
        (tx)=>tx.run(
            `CREATE (l:Location {
                location_id: $loc_id,
                location_name:$loc_name,
                location_status: $loc_status
            })`,
            dataObject
        )
    )
}