"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const expressValidations_1 = __importDefault(require("../controllers/expressValidations"));
const newUserHandler_1 = require("../controllers/newUser/newUserHandler");
const updateUserHandler_1 = require("../controllers/editUser/updateUserHandler");
const deleteUserHandler_1 = require("../controllers/deleteUser/deleteUserHandler");
const createAdmin_1 = require("../models/createAdmin");
const superAdmin_1 = require("../controllers/superAdminHandler/superAdmin");
const loginHandler_1 = require("../controllers/loginHandler/loginHandler");
const authenticationMiddleware_1 = require("../controllers/authenticationMiddleware");
exports.router = express_1.default.Router();
exports.router.get("/", (req, res) => {
    (0, createAdmin_1.createAdminTable)();
    res.send("Typescript is working");
});
exports.router.post("/login", loginHandler_1.loginHandler);
exports.router.post("/newuser", authenticationMiddleware_1.tokenVerification, expressValidations_1.default, newUserHandler_1.newUserHandler);
exports.router.put("/updateuser", authenticationMiddleware_1.tokenVerification, expressValidations_1.default, updateUserHandler_1.updateUserHandler);
exports.router.post("/createSuperAdmins", superAdmin_1.superAdminHandler);
exports.router.delete("/deleteuser", authenticationMiddleware_1.tokenVerification, deleteUserHandler_1.deleteUserHandler);
