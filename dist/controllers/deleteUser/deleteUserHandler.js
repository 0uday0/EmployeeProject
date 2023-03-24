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
exports.deleteUserHandler = void 0;
const deleteValidation_1 = require("./deleteValidation");
const deleteFromSql_1 = require("./deleteFromSql");
const deleteFromNeo_1 = require("./deleteFromNeo");
function deleteUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let candidateId = req.body.candidateId;
        let result_array = yield (0, deleteValidation_1.fetchUserIdFromUsers)(candidateId);
        if (result_array.length === 0) {
            res.status(400).json("Recheck the candidate ID submitted");
        }
        else {
            let user_id = result_array[0].user_id;
            yield (0, deleteFromSql_1.deActivateFromUsers)(user_id);
            yield (0, deleteFromSql_1.deActivateFromLocationMapping)(user_id);
            yield (0, deleteFromSql_1.deActivateFromDepartmentMapping)(user_id);
            yield (0, deleteFromNeo_1.setUserToInActive)({ req_id: user_id });
            yield (0, deleteFromNeo_1.deleteUserLocationRelation)({ req_id: user_id });
            yield (0, deleteFromNeo_1.deleteUserDepartmentRelation)({ req_id: user_id });
            res.status(200).send("User is successfully deleted");
        }
    });
}
exports.deleteUserHandler = deleteUserHandler;
