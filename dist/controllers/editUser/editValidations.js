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
exports.checkDepartment = exports.checkLocation = exports.checkEmailUniqueness = exports.checkCandidateId = void 0;
const db_1 = require("../../db");
function checkCandidateId(candidateId) {
    return __awaiter(this, void 0, void 0, function* () {
        let candidateCheckQuery = `SELECT * FROM users
                              WHERE user_status = '1' AND
                              candidate_id = ?`;
        let result = yield db_1.pool.query(candidateCheckQuery, [candidateId]);
        return result[0];
        // return new Promise ((resolve,reject)=>{
        //   connection.query<Array<User>>(candidateCheckQuery,[candidateId],(err,result)=>{
        //     if (err) {
        //       return reject(err)
        //     } else {
        //       return resolve(result)
        //     }
        //   })
        // })
    });
}
exports.checkCandidateId = checkCandidateId;
function checkEmailUniqueness(arr) {
    return __awaiter(this, void 0, void 0, function* () {
        let emailCheckQuery = `SELECT * FROM users
                          WHERE user_status = '1' AND
                          user_email = ? 
                          AND NOT candidate_id = ?`;
        let result = yield db_1.pool.query(emailCheckQuery, arr);
        return result[0];
        // return new Promise((resolve,reject)=>{
        //   connection.query<Array<User>>(emailCheckQuery,arr,(err,result)=>{
        //     if(err) {
        //       return reject(err)
        //     } else {
        //       return resolve(result)
        //     }
        //   })
        // })
    });
}
exports.checkEmailUniqueness = checkEmailUniqueness;
function checkLocation(location) {
    return __awaiter(this, void 0, void 0, function* () {
        let locationCheckQuery = `SELECT * FROM locations
                              WHERE location_status = "1" AND
                              location_name = ?`;
        let result = yield db_1.pool.query(locationCheckQuery, [location]);
        return result[0];
        // return new Promise ((resolve,reject)=>{
        //   connection.query<Array<locationRow>>(locationCheckQuery,[location],(err,result)=>{
        //     if (err) {
        //       return reject(err)
        //     } else {
        //       return resolve(result)
        //     }
        //   })
        // })
    });
}
exports.checkLocation = checkLocation;
function checkDepartment(department) {
    return __awaiter(this, void 0, void 0, function* () {
        let departmentCheckQuery = `SELECT * FROM departments
                                WHERE department_status = "1" AND
                                department_name = ?`;
        let result = yield db_1.pool.query(departmentCheckQuery, [department]);
        return result[0];
        // return new Promise((resolve,reject)=>{
        //   connection.query<Array<departmentRow>>(departmentCheckQuery,[department],(err,result)=>{
        //     if (err) {
        //       return reject(err)
        //     } else {
        //       return resolve(result)
        //     }
        //   })
        // })
    });
}
exports.checkDepartment = checkDepartment;
