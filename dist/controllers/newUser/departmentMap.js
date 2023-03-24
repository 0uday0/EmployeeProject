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
exports.createUserDepartment = exports.userDepartmentMapping = exports.getDepartmentId = void 0;
const db_1 = require("../../db");
const neo_1 = require("../../neo");
function getDepartmentId(department) {
    return __awaiter(this, void 0, void 0, function* () {
        let departmentFetch = `SELECT id FROM departments
                          WHERE department_status = "1" AND
                          department_name = ?`;
        let resultArray = yield db_1.pool.query(departmentFetch, [department]);
        return resultArray[0][0].id;
        // return new Promise ((resolve,reject)=>{
        //   connection.query<Array<departmentID>>(departmentFetch,[department],(err,result)=>{
        //     if (err) {
        //       return reject(err)
        //     } else {
        //       return resolve(result[0].id)
        //     }
        //   })
        // })
    });
}
exports.getDepartmentId = getDepartmentId;
function userDepartmentMapping(arr) {
    return __awaiter(this, void 0, void 0, function* () {
        let userDepartmentQuery = `INSERT INTO user_department_mapping
                            (
                              map_user_id,
                              map_department_id,
                              map_created_date
                            )
                            VALUES (?,?,?)`;
        let resultArray = yield db_1.pool.query(userDepartmentQuery, arr);
        return resultArray[0].insertId;
        // return new Promise((resolve,reject)=>{
        //   connection.query<OkPacket>(userDepartmentQuery,arr,(err,result)=>{
        //     if (err) {
        //       return reject(err)
        //     } else {
        //       return resolve(result.insertId)
        //     }
        //   })
        // })
    });
}
exports.userDepartmentMapping = userDepartmentMapping;
function createUserDepartment(dataObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = neo_1.driver.session();
        yield session.executeWrite((tx) => tx.run(`MATCH (u:User {user_id:$user_id})
        MATCH (d:Department {department_id:$dep_id})
        CREATE (u)-[:DEPARTMENT_OF]->(d)`, dataObject));
        console.log("dep relationship is created");
        yield session.close();
    });
}
exports.createUserDepartment = createUserDepartment;
