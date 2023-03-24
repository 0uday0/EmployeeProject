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
exports.departmentPriorUpdate = exports.locationPriorUpdate = void 0;
const db_1 = require("../../db");
function locationPriorUpdate(candidateId) {
    return __awaiter(this, void 0, void 0, function* () {
        let mapLocationQuery = `SELECT location_name FROM locations
                             INNER JOIN user_location_mapping
                            ON locations.location_id = user_location_mapping.map_location_id
                             INNER JOIN users
                            ON users.user_id = user_location_mapping.map_user_id
                            WHERE users.user_status = "1" AND
                            users.candidate_id = ?
                            `;
        let result = yield db_1.pool.query(mapLocationQuery, [candidateId]);
        return result[0][0].location_name;
        // return new Promise((resolve,reject)=>{
        //   connection.query<Array<priorLocation>>(mapLocationQuery,[candidateId],(err,result)=>{
        //     if (err) {
        //       return reject(err)
        //     } else {
        //       return resolve(result[0].location_name)
        //     }
        //   })
        // })
    });
}
exports.locationPriorUpdate = locationPriorUpdate;
function departmentPriorUpdate(candidateId) {
    return __awaiter(this, void 0, void 0, function* () {
        let mapDepartmentQuery = `SELECT department_name FROM departments
                             INNER JOIN user_department_mapping
                            ON departments.id = user_department_mapping.map_department_id
                             INNER JOIN users
                            ON users.user_id = user_department_mapping.map_user_id
                            WHERE users.user_status = "1" AND
                            users.candidate_id = ?
                            `;
        let result = yield db_1.pool.query(mapDepartmentQuery, [candidateId]);
        return result[0][0].department_name;
        // return new Promise((resolve,reject)=>{
        //   connection.query<Array<priorDepartment>>(mapDepartmentQuery,[candidateId],(err,result)=>{
        //     if (err) {
        //       return reject(err)
        //     } else {
        //       if (result.length != 0 ){
        //         return resolve(result[0].department_name)
        //       }
        //     }
        //   })
        // })
    });
}
exports.departmentPriorUpdate = departmentPriorUpdate;
