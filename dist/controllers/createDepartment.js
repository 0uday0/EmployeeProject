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
exports.createNewDepartmentNode = exports.createNewDepartment = void 0;
const db_1 = require("../db");
const neo_1 = require("../neo");
function createNewDepartment(departmentName) {
    return __awaiter(this, void 0, void 0, function* () {
        let createNewDepartmentQuery = `INSERT INTO departments(department_name)
                                  VALUES (?)`;
        let resultArray = yield db_1.pool.query(createNewDepartmentQuery, [departmentName]);
        return resultArray[0].insertId;
    });
}
exports.createNewDepartment = createNewDepartment;
function createNewDepartmentNode(dataObject) {
    return __awaiter(this, void 0, void 0, function* () {
        let session = neo_1.driver.session();
        yield session.executeWrite((tx) => tx.run(`CREATE (d:Department {
                department_id: $dep_id,
                department_name:$dep_name,
                department_status: $dep_status
            })`, dataObject));
        yield session.close();
    });
}
exports.createNewDepartmentNode = createNewDepartmentNode;
