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
exports.createAdminTable = void 0;
const db_1 = require("../db");
function createAdminTable() {
    return __awaiter(this, void 0, void 0, function* () {
        let creatingTableQuery = `CREATE TABLE if not exists superAdmins(
                                id int primary key auto_increment,
                                username varchar(255)not null,
                                password varchar(255) not null
                            )`;
        yield db_1.pool.query(creatingTableQuery);
        // connection.query(creatingTableQuery,(err,result)=>{
        //     if (err) {
        //         console.log(err)
        //     }
        // })
    });
}
exports.createAdminTable = createAdminTable;
