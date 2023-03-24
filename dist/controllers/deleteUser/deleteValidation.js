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
exports.fetchUserIdFromUsers = void 0;
const db_1 = require("../../db");
// export async function fetchUserIdFromUsers (candidateId:number):Promise<Array<userID>> {
//     let userIdQuery = `SELECT user_id FROM users
//                        WHERE users.user_status = 'Active' AND
//                        candidate_id = ?`
//     return new Promise ((resolve,reject)=>{
//       connection.query<Array<userID>>(userIdQuery,[candidateId],(err,result)=>{
//         if (err) {
//           reject(err)
//         } else {
//           resolve(result)
//         }
//       })
//     })
//   }
function fetchUserIdFromUsers(candidateId) {
    return __awaiter(this, void 0, void 0, function* () {
        let userIdQuery = `SELECT user_id FROM users
                       WHERE users.user_status = '1' AND
                       candidate_id = ?`;
        console.log(candidateId);
        let result = yield db_1.pool.query(userIdQuery, [candidateId]);
        return result[0];
        // return new Promise ((resolve,reject)=>{
        //   connection.query<Array<userID>>(userIdQuery,[candidateId],(err,result)=>{
        //     if (err) {
        //       reject(err)
        //     } else {
        //       resolve(result)
        //     }
        //   })
        // })
    });
}
exports.fetchUserIdFromUsers = fetchUserIdFromUsers;
