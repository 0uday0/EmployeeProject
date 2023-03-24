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
exports.createUserNode = void 0;
const neo_1 = require("../../neo");
function createUserNode(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = neo_1.driver.session();
        try {
            yield session.executeWrite((tx) => {
                return tx.run(`CREATE (u:User {
                  user_id: $user_id,
                  user_first_name: $first_name,
                  user_last_name: $last_name,
                  user_email: $email,
                  user_start_date: $start_date,
                  user_designation: $designation,
                  user_status: 1,
                  candidate_id: $cand_id
                })
                `, data);
            });
            yield session.close();
        }
        catch (e) {
            throw new Error("Creating node in  neo has failed");
        }
    });
}
exports.createUserNode = createUserNode;
