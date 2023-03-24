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
exports.deleteUserDepartmentRelation = exports.deleteUserLocationRelation = exports.setUserToInActive = void 0;
const neo_1 = require("../../neo");
function setUserToInActive(dataObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = neo_1.driver.session();
        yield session.executeWrite((tx) => tx.run(`MATCH (u:User)
        WHERE u.user_id = $req_id
        SET u.user_status = 0`, dataObject));
    });
}
exports.setUserToInActive = setUserToInActive;
function deleteUserLocationRelation(dataObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = neo_1.driver.session();
        yield session.executeWrite((tx) => tx.run(`MATCH (u:User)-[lr:LOCATION_OF]->(l:Location)
        WHERE u.user_id = $req_id
        AND u.user_status =0
         DELETE lr`, dataObject));
        console.log("The node location relationship  is deleted");
        yield session.close();
    });
}
exports.deleteUserLocationRelation = deleteUserLocationRelation;
function deleteUserDepartmentRelation(dataObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = neo_1.driver.session();
        yield session.executeWrite((tx) => tx.run(`MATCH (u:User)-[dr:DEPARTMENT_OF]->(d:Department)
        WHERE u.user_id = $req_id
        AND u.user_status =0
        DELETE dr`, dataObject));
        console.log("The node department relation is deleted");
        yield session.close();
    });
}
exports.deleteUserDepartmentRelation = deleteUserDepartmentRelation;
