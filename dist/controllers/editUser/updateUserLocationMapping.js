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
exports.createNewRelation = exports.deletePreviousRelation = exports.insertNewRow = exports.makeStatusInActive = void 0;
const db_1 = require("../../db");
const neo_1 = require("../../neo");
function makeStatusInActive(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let statusInActiveQuery = `UPDATE user_location_mapping
                                SET map_status = '0'
                                WHERE map_user_id = ?
                                AND map_status = '1'`;
        yield db_1.pool.query(statusInActiveQuery, [user_id]);
        // return new Promise ((resolve,reject)=>{
        //   connection.query<OkPacket>(statusInActiveQuery,[user_id],(err,result)=>{
        //     if (err) {
        //       return reject(err)
        //     } else {
        //       return resolve(result)
        //     }
        //   })
        // })
    });
}
exports.makeStatusInActive = makeStatusInActive;
function insertNewRow(arr) {
    return __awaiter(this, void 0, void 0, function* () {
        let insertLocationQuery = `INSERT INTO user_location_mapping 
                                (map_user_id,
                                map_location_id,
                                map_created_date)
                                VALUES (?,?,?)
                               `;
        yield db_1.pool.query(insertLocationQuery, arr);
        // return new Promise ((resolve,reject)=>{
        //   connection.query<OkPacket>(insertLocationQuery,arr,(err,result)=>{
        //     if (err) {
        //       return reject(err)
        //     } else {
        //       return resolve(result)
        //     }
        //   })
        // })
    });
}
exports.insertNewRow = insertNewRow;
function deletePreviousRelation(dataObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = neo_1.driver.session();
        yield session.executeWrite((tx) => tx.run(`MATCH (u:User)-[r:LOCATION_OF]->(l:Location)
         WHERE u.user_id = $user_id
         DELETE r
        `, dataObject));
        console.log("the location relationship is deleted");
        yield session.close();
    });
}
exports.deletePreviousRelation = deletePreviousRelation;
function createNewRelation(dataObject) {
    return __awaiter(this, void 0, void 0, function* () {
        // let current_user_id = candidateToBeUpdated[0].user_id
        // let current_location_id = locationExists[0].location_id
        const session = neo_1.driver.session();
        yield session.executeWrite((tx) => tx.run(`MATCH (u:User {user_id:$user_id})
           MATCH (l:Location {location_id:$loc_id})
           CREATE (u)-[:LOCATION_OF]->(l)`, dataObject));
        console.log("relationship is created");
        yield session.close();
    });
}
exports.createNewRelation = createNewRelation;
