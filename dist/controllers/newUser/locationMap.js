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
exports.createUserLocation = exports.userLocationMapping = exports.getLocationId = void 0;
const db_1 = require("../../db");
const neo_1 = require("../../neo");
function getLocationId(location) {
    return __awaiter(this, void 0, void 0, function* () {
        let locationFetch = `SELECT location_id FROM locations
                          WHERE location_status = "1" AND
                          location_name = ?`;
        let resultArray = yield db_1.pool.query(locationFetch, [location]);
        return resultArray[0][0].location_id;
        // return new Promise ((resolve,reject)=>{
        //   connection.query<Array<locationID>>(locationFetch,[location],(err,result)=>{
        //     if (err) {
        //       return reject(err)
        //     } else {
        //       return resolve(result[0].location_id)
        //     }
        //   })
        // })
    });
}
exports.getLocationId = getLocationId;
function userLocationMapping(arr) {
    return __awaiter(this, void 0, void 0, function* () {
        let userLocationQuery = `INSERT INTO user_location_mapping
                            (
                              map_user_id,
                              map_location_id,
                              map_created_date
                            )
                            VALUES (?,?,?)`;
        let resultArray = yield db_1.pool.query(userLocationQuery, arr);
        return resultArray[0].insertId;
        // return new Promise((resolve,reject)=>{
        //   connection.query<OkPacket>(userLocationQuery,arr,(err,result)=>{
        //     if (err) {
        //       return reject(err)
        //     } else {
        //       return resolve(result.insertId)
        //     }
        //   })
        // })
    });
}
exports.userLocationMapping = userLocationMapping;
function createUserLocation(dataObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = neo_1.driver.session();
        yield session.executeWrite((tx) => tx.run(`MATCH (u:User {user_id:$user_id})
        MATCH (l:Location {location_id:$loc_id})
        CREATE (u)-[:LOCATION_OF]->(l)`, dataObject));
        console.log("relationship is created");
        yield session.close();
    });
}
exports.createUserLocation = createUserLocation;
