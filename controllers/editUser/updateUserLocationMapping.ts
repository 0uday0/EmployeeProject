import { OkPacket } from "mysql2"
import { pool as connection } from "../../db"
import { driver } from "../../neo"
export async function makeStatusInActive (user_id:number) {
    let statusInActiveQuery = `UPDATE user_location_mapping
                                SET map_status = '0'
                                WHERE map_user_id = ?
                                AND map_status = '1'`
    await connection.query(statusInActiveQuery,[user_id])
   
  }

export  async function insertNewRow (arr:Array<number|Date>) {
    let insertLocationQuery = `INSERT INTO user_location_mapping 
                                (map_user_id,
                                map_location_id,
                                map_created_date)
                                VALUES (?,?,?)
                               `
    await connection.query(insertLocationQuery,arr)
    
  }

export  async function deletePreviousRelation (dataObject:{user_id:number}) {
    
    const session = driver.session()
    await session.executeWrite(
      (tx)=>tx.run(
        `MATCH (u:User)-[r:LOCATION_OF]->(l:Location)
         WHERE u.user_id = $user_id
         DELETE r
        `,
        dataObject
      )
    )
    console.log("the location relationship is deleted")
    await session.close()
  }

export async function createNewRelation (dataObject: {user_id:number, loc_id:number}) {
    
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