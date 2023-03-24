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
exports.confirmDepartment = exports.confirmLocation = exports.findAnyExistingUsers = exports.findCandidateID = void 0;
const db_1 = require("../../db");
let userCandidate = `SELECT * FROM users
                          WHERE user_status = "1" AND
                          candidate_id = ?`;
let checkUser = `SELECT * FROM users
                    WHERE user_status = "1" AND
                    users.user_email = ? `;
let checkLocation = `SELECT * FROM locations
                    WHERE location_status = "1" AND
                    location_name = ?`;
let checkDepartment = `SELECT * FROM departments
                    WHERE department_status = "1" AND
                    department_name = ?`;
// export let findCandidateID = (candidateId:number):Promise<Array<User>>=>{
//     return new Promise((resolve,reject)=>{
//       connection.query<Array<User>>(userCandidate,[candidateId],(err,result)=>{
//         if (err) {
//           return reject(err)
//         } else {
//           return resolve(result)
//         }
//       })
//     })
//   }
let findCandidateID = (candidateId) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield db_1.pool.query(userCandidate, [candidateId]);
    return result[0];
    // return new Promise((resolve,reject)=>{
    //   connection.query<Array<User>>(userCandidate,[candidateId],(err,result)=>{
    //     if (err) {
    //       return reject(err)
    //     } else {
    //       return resolve(result)
    //     }
    //   })
    // })
});
exports.findCandidateID = findCandidateID;
let findAnyExistingUsers = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield db_1.pool.query(checkUser, [email]);
    return result[0];
    // return new Promise ((resolve,reject)=>{
    //     connection.query<Array<User>>(checkUser,[email],(err,result)=>{
    //       if (err) {
    //         return reject(err)
    //       } else {
    //         return resolve(result)
    //       }
    //     })
    //   })
});
exports.findAnyExistingUsers = findAnyExistingUsers;
let confirmLocation = (location) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield db_1.pool.query(checkLocation, [location]);
    return result[0];
    // return new Promise ((resolve,reject)=>{
    //   connection.query<Array<locationRow>>(checkLocation,[location],(err,result)=>{
    //     if (err) {
    //       return reject(err)
    //     } else{
    //       resolve(result)
    //     }
    //   })
    // })
});
exports.confirmLocation = confirmLocation;
let confirmDepartment = (dept) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield db_1.pool.query(checkDepartment, [dept]);
    return result[0];
    // return new Promise((resolve,reject)=>{
    //     connection.query<Array<departmentRow>>(checkDepartment,[dept],(err,result)=>{
    //     if (err) {
    //       return reject(err)
    //     } else {
    //       return resolve(result)
    //     }
    //     })
    //   })
});
exports.confirmDepartment = confirmDepartment;
