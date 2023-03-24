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
exports.dep_createNewRelation = exports.dep_deletePreviousRelation = exports.dep_insertNewRow = exports.dep_makeStatusInActive = void 0;
const db_1 = require("../../db");
const neo_1 = require("../../neo");
function dep_makeStatusInActive(current_user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let statusInActiveQuery = `UPDATE user_department_mapping
                                SET map_status = '0'
                                WHERE map_user_id = ?
                                AND map_status = '1'`;
        yield db_1.pool.query(statusInActiveQuery, [current_user_id]);
        // return new Promise ((resolve,reject)=>{
        //   connection.query<OkPacket>(statusInActiveQuery,[current_user_id],(err,result)=>{
        //     if (err) {
        //       return reject(err)
        //     } else {
        //       return resolve(result)
        //     }
        //   })
        // })
    });
}
exports.dep_makeStatusInActive = dep_makeStatusInActive;
function dep_insertNewRow(arr) {
    return __awaiter(this, void 0, void 0, function* () {
        let insertDepartmentQuery = `INSERT INTO user_department_mapping 
                                (map_user_id,
                                map_department_id,
                                map_created_date)
                                VALUES (?,?,?)
                               `;
        yield db_1.pool.query(insertDepartmentQuery, arr);
        // return new Promise ((resolve,reject)=>{
        //   connection.query<OkPacket>(insertDepartmentQuery,arr,(err,result)=>{
        //     if (err) {
        //       return reject(err)
        //     } else {
        //       return resolve(result)
        //     }
        //   })
        // })
    });
}
exports.dep_insertNewRow = dep_insertNewRow;
function dep_deletePreviousRelation(dataObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = neo_1.driver.session();
        yield session.executeWrite((tx) => tx.run(`MATCH (u:User)-[r:DEPARTMENT_OF]->(d:Department)
         WHERE u.user_id = $user_id
         DELETE r
        `, dataObject));
        console.log("the department relationship is deleted");
        yield session.close();
    });
}
exports.dep_deletePreviousRelation = dep_deletePreviousRelation;
function dep_createNewRelation(dataObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = neo_1.driver.session();
        yield session.executeWrite((tx) => tx.run(`MATCH (u:User {user_id:$user_id})
           MATCH (d:Department {department_id:$dep_id})
           CREATE (u)-[:DEPARTMENT_OF]->(d)`, dataObject));
        console.log("New department relationship is created");
        yield session.close();
    });
}
exports.dep_createNewRelation = dep_createNewRelation;
