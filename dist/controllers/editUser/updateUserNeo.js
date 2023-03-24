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
exports.updateUserInNeo = void 0;
const neo_1 = require("../../neo");
function updateUserInNeo(dataObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = neo_1.driver.session();
        yield session.executeWrite((tx) => tx.run(`MATCH (u:User)
        WHERE u.candidate_id = $candidateID
        SET u.user_first_name = $firstName,
        u.user_last_name = $lastName,
        u.user_email = $email,
        u.user_startdate = $startdate,
        u.user_designation = $designation
        `, dataObject));
        yield session.close();
    });
}
exports.updateUserInNeo = updateUserInNeo;
