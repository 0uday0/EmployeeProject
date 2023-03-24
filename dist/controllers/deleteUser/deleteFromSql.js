"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deActivateFromDepartmentMapping = exports.deActivateFromLocationMapping = exports.deActivateFromUsers = void 0;
const db_1 = require("../../db");
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
function deActivateFromUsers(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let deactivateUserQuery = `UPDATE users
                               SET user_status = '0'
                               WHERE user_id = ?
                                `;
        yield db_1.pool.query(deactivateUserQuery, [userId]);
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
    });
}
exports.deActivateFromUsers = deActivateFromUsers;
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
function deActivateFromLocationMapping(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        let deactivateUserQuery = `UPDATE user_location_mapping
                               SET map_status = '0'
                               WHERE map_user_id = ?
                                `;
        yield db_1.pool.query(deactivateUserQuery, [userid]);
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
    });
}
exports.deActivateFromLocationMapping = deActivateFromLocationMapping;
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
function deActivateFromDepartmentMapping(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        let deactivateUserQuery = `UPDATE user_department_mapping
                               SET map_status = '0'
                               WHERE map_user_id = ?
                                `;
        return db_1.pool.query(deactivateUserQuery, [userid]);
        // return new Promise((resolve,reject)=>{
        //   connection.query<OkPacket>(deactivateUserQuery,[userid],(err,result)=>{
        //     if (err) {
        //      return reject(err)
        //     } else {
        //       console.log("the candidate is deactivated from department mapping")
        //       return resolve(result)
        //     }
        //   })
        // })
    });
}
exports.deActivateFromDepartmentMapping = deActivateFromDepartmentMapping;
