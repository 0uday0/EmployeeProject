
import { OkPacket } from "mysql2"
import {pool as connection} from "../../db"
import { driver } from "../../neo"
import { locationID,userIdLocationId } from "../../types/locationInterface"

export async function getLocationId (location:string):Promise<number> {
    let locationFetch = `SELECT location_id FROM locations
                          WHERE location_status = "1" AND
                          location_name = ?`
    let resultArray = await connection.query<Array<locationID>>(locationFetch,[location])
    return resultArray[0][0].location_id
    
  }

export  async function userLocationMapping (arr: Array<number|Date>):Promise<number>{
    let userLocationQuery = `INSERT INTO user_location_mapping
                            (
                              map_user_id,
                              map_location_id,
                              map_created_date
                            )
                            VALUES (?,?,?)`
    let resultArray = await connection.query<OkPacket>(userLocationQuery,arr)
    return resultArray[0].insertId
    
  }

export  async function createUserLocation (dataObject:userIdLocationId) {
    const session = driver.session()
    await session.executeWrite(
      (tx)=>tx.run(
        `MATCH (u:User {user_id:$user_id})
        MATCH (l:Location {location_id:$loc_id})
        CREATE (u)-[:LOCATION_OF]->(l)`,
        dataObject
      )
    )
    console.log("relationship is created")
    await session.close()
  }