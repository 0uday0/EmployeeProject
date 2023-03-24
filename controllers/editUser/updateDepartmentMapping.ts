import { OkPacket } from "mysql2"
import { InsertResult } from "typeorm"
import { pool as connection } from "../../db"
import { driver } from "../../neo"
export async function dep_makeStatusInActive (current_user_id:number) {
    let statusInActiveQuery = `UPDATE user_department_mapping
                                SET map_status = '0'
                                WHERE map_user_id = ?
                                AND map_status = '1'`
     await connection.query(statusInActiveQuery,[current_user_id])
    
    // return new Promise ((resolve,reject)=>{
    //   connection.query<OkPacket>(statusInActiveQuery,[current_user_id],(err,result)=>{
    //     if (err) {
    //       return reject(err)
    //     } else {
    //       return resolve(result)
    //     }
    //   })
    // })
  }

export  async function dep_insertNewRow (arr:Array<number|Date>) {
    let insertDepartmentQuery = `INSERT INTO user_department_mapping 
                                (map_user_id,
                                map_department_id,
                                map_created_date)
                                VALUES (?,?,?)
                               `
    await connection.query(insertDepartmentQuery,arr)
    
  }

    
export  async function dep_deletePreviousRelation (dataObject:{user_id:number}) {
            
    const session = driver.session()
    await session.executeWrite(
      (tx)=>tx.run(
        `MATCH (u:User)-[r:DEPARTMENT_OF]->(d:Department)
         WHERE u.user_id = $user_id
         DELETE r
        `,
        dataObject
        
      )
    )
    console.log("the department relationship is deleted")
    await session.close()
  }

export  async function dep_createNewRelation (dataObject:{user_id:number,dep_id:number}) {
            
    const session = driver.session()
    await session.executeWrite(
        (tx)=>tx.run(
          `MATCH (u:User {user_id:$user_id})
           MATCH (d:Department {department_id:$dep_id})
           CREATE (u)-[:DEPARTMENT_OF]->(d)`,
           dataObject
           
)
)
console.log("New department relationship is created")
await session.close()
  }