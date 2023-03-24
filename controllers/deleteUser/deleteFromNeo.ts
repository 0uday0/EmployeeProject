import { driver } from "../../neo"
export async function setUserToInActive (dataObject: {req_id:number}) {
  const session = driver.session()
  await session.executeWrite(
    (tx)=>tx.run(
      `MATCH (u:User)
        WHERE u.user_id = $req_id
        SET u.user_status = 0`,
        dataObject
    )
  )
}
export async function deleteUserLocationRelation (dataObject: {req_id:number}) {
    const session = driver.session()
    await session.executeWrite(
      (tx)=>tx.run(
        `MATCH (u:User)-[lr:LOCATION_OF]->(l:Location)
        WHERE u.user_id = $req_id
        AND u.user_status =0
         DELETE lr`,
        dataObject
      )
    )
    console.log("The node location relationship  is deleted")
    await session.close()
  }

export async function deleteUserDepartmentRelation (dataObject: {req_id:number}) {
    const session = driver.session()
    await session.executeWrite(
      (tx)=>tx.run(
        `MATCH (u:User)-[dr:DEPARTMENT_OF]->(d:Department)
        WHERE u.user_id = $req_id
        AND u.user_status =0
        DELETE dr`,
        dataObject
      )
    )
    console.log("The node department relation is deleted")
    await session.close()
  }