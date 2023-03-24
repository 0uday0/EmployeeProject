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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminHandler = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../db");
function superAdminHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userName = req.body.userName;
        let password = req.body.password;
        const hashPassword = (pswd, saltRounds = 10) => __awaiter(this, void 0, void 0, function* () {
            try {
                let salt = yield bcrypt_1.default.genSalt(saltRounds);
                return yield bcrypt_1.default.hash(pswd, salt);
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
        try {
            let hashedPassword = yield hashPassword(password);
            const updateAdmin = () => __awaiter(this, void 0, void 0, function* () {
                let query = `INSERT INTO superAdmins(username,password)
                        VALUES(?,?)`;
                yield db_1.pool.query(query, [userName, hashedPassword]);
                // return new Promise ((resolve,reject)=>{
                //     connection.query<OkPacket>(query,[userName,hashedPassword],(err,result)=>{
                //         if (err) {
                //             reject(err)
                //         } else {
                //             resolve()
                //         }
                //     })
                // })
            });
            yield updateAdmin();
            res.status(200).send("Yahoo you're a super admin");
        }
        catch (err) {
            res.status(400).send(err);
        }
    });
}
exports.superAdminHandler = superAdminHandler;
