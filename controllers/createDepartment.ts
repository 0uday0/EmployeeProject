import { OkPacket } from "mysql2";
import { pool as connection } from "../db";
import { driver } from "../neo";

export async function createNewDepartment(departmentName:string) {
    let createNewDepartmentQuery = `INSERT INTO departments(department_name)
                                  VALUES (?)`
    let resultArray = await connection.query<OkPacket>(createNewDepartmentQuery,[departmentName])
    return resultArray[0].insertId
}

export async function createNewDepartmentNode(dataObject:{dep_id:number,dep_name:string,dep_status:number}) {
    let session = driver.session()
    await session.executeWrite(
        (tx)=>tx.run(
            `CREATE (d:Department {
                department_id: $dep_id,
                department_name:$dep_name,
                department_status: $dep_status
            })`,
            dataObject
        )
    )
    await session.close()
}