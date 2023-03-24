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
exports.createNewLocationNode = exports.createNewLocation = void 0;
const db_1 = require("../db");
const neo_1 = require("../neo");
function createNewLocation(locationName) {
    return __awaiter(this, void 0, void 0, function* () {
        let createNewLocationQuery = `INSERT INTO locations(location_name)
                                  VALUES (?)`;
        let resultArray = yield db_1.pool.query(createNewLocationQuery, [locationName]);
        return resultArray[0].insertId;
    });
}
exports.createNewLocation = createNewLocation;
function createNewLocationNode(dataObject) {
    return __awaiter(this, void 0, void 0, function* () {
        let session = neo_1.driver.session();
        yield session.executeWrite((tx) => tx.run(`CREATE (l:Location {
                location_id: $loc_id,
                location_name:$loc_name,
                location_status: $loc_status
            })`, dataObject));
    });
}
exports.createNewLocationNode = createNewLocationNode;
