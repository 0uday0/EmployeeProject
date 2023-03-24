import { OkPacket } from "mysql2"
import { pool as connection } from "../../db"
// export async function deActivateFromUsers (userId:number) {
//     let deactivateUserQuery = `UPDATE users
//                                SET user_status = 'InActive'
//                                WHERE user_id = ?
//                                 `
//     return new Promise((resolve,reject)=>{
//       connection.query<OkPacket>(deactivateUserQuery,[userId],(err,result)=>{
//         if (err) {
//          return reject(err)
//         } else {
//           console.log("the candidate is deactivated from users")
//           return resolve(result)
//         }
//       })
//     })                             
//   }

export async function deActivateFromUsers (userId:number) {
    let deactivateUserQuery = `UPDATE users
                               SET user_status = '0'
                               WHERE user_id = ?
                                `
    await connection.query(deactivateUserQuery,[userId])
    // return new Promise((resolve,reject)=>{
    //   connection.query<OkPacket>(deactivateUserQuery,[userId],(err,result)=>{
    //     if (err) {
    //      return reject(err)
    //     } else {
    //       console.log("the candidate is deactivated from users")
    //       return resolve(result)
    //     }
    //   })
    // })                              
  }

// export  async function deActivateFromLocationMapping (userid:number) {
//     let deactivateUserQuery = `UPDATE user_location_mapping
//                                SET map_status = 'InActive'
//                                WHERE map_user_id = ?
//                                 `
    
//     return new Promise((resolve,reject)=>{
//       connection.query<OkPacket>(deactivateUserQuery,[userid],(err,result)=>{
//         if (err) {
//          return reject(err)
//         } else {
//           console.log("the candidate is deactivated from location mapping")
//           return resolve(result)
//         }
//       })
//     })
//   }

  export  async function deActivateFromLocationMapping (userid:number) {
    let deactivateUserQuery = `UPDATE user_location_mapping
                               SET map_status = '0'
                               WHERE map_user_id = ?
                                `
    await connection.query(deactivateUserQuery,[userid])
    // return new Promise((resolve,reject)=>{
    //   connection.query<OkPacket>(deactivateUserQuery,[userid],(err,result)=>{
    //     if (err) {
    //      return reject(err)
    //     } else {
    //       console.log("the candidate is deactivated from location mapping")
    //       return resolve(result)
    //     }
    //   })
    // })
  }

// export  async function deActivateFromDepartmentMapping(userid:number){
//     let deactivateUserQuery = `UPDATE user_department_mapping
//                                SET map_status = 'InActive'
//                                WHERE map_user_id = ?
//                                 `
//     return new Promise((resolve,reject)=>{
//       connection.query<OkPacket>(deactivateUserQuery,[userid],(err,result)=>{
//         if (err) {
//          return reject(err)
//         } else {
//           console.log("the candidate is deactivated from department mapping")
//           return resolve(result)
//         }
//       })
//     })
//   }

  export  async function deActivateFromDepartmentMapping(userid:number){
    let deactivateUserQuery = `UPDATE user_department_mapping
                               SET map_status = '0'
                               WHERE map_user_id = ?
                                `
    return connection.query(deactivateUserQuery,[userid])
    
  }