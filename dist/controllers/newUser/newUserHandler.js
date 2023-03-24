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
exports.newUserHandler = void 0;
const express_validator_1 = require("express-validator");
const advancedValidations_1 = require("./advancedValidations");
const createUserSql_1 = require("./createUserSql");
const createUserNode_1 = require("./createUserNode");
const locationMap_1 = require("./locationMap");
const departmentMap_1 = require("./departmentMap");
const createLocation_1 = require("../createLocation");
const createDepartment_1 = require("../createDepartment");
function newUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
            let userEmailId = req.body.email;
            let userLocation = req.body.location;
            let userDepartment = req.body.department;
            let userCandidateId = req.body.candidateId;
            let userFirstName = req.body.firstName;
            let userLastName = req.body.lastName;
            let userStartDate = req.body.startDate;
            let userDesignation = req.body.designation;
            try {
                let existingUsers = yield (0, advancedValidations_1.findAnyExistingUsers)(userEmailId);
                let existingLocation = yield (0, advancedValidations_1.confirmLocation)(userLocation);
                let existingDepartment = yield (0, advancedValidations_1.confirmDepartment)(userDepartment);
                let existingCandidateID = yield (0, advancedValidations_1.findCandidateID)(userCandidateId);
                if (existingLocation.length === 0) {
                    let newLocationId = yield (0, createLocation_1.createNewLocation)(userLocation);
                    yield (0, createLocation_1.createNewLocationNode)({ loc_id: newLocationId, loc_name: userLocation, loc_status: 1 });
                }
                if (existingDepartment.length === 0) {
                    let newDepartmentId = yield (0, createDepartment_1.createNewDepartment)(userDepartment);
                    yield (0, createDepartment_1.createNewDepartmentNode)({ dep_id: newDepartmentId, dep_name: userDepartment, dep_status: 1 });
                }
                if (existingUsers.length != 0) {
                    res.status(400).json("This email id is already taken");
                }
                else if (existingCandidateID.length != 0) {
                    res.status(400).json("This candidate ID is already registered");
                }
                else {
                    const date = new Date();
                    let userDetails = [
                        userFirstName,
                        userLastName,
                        userEmailId,
                        userStartDate,
                        userDesignation,
                        date,
                        userCandidateId
                    ];
                    let insertId = yield (0, createUserSql_1.createUser)(userDetails);
                    let data = {
                        user_id: insertId,
                        first_name: userFirstName,
                        last_name: userLastName,
                        email: userEmailId,
                        start_date: userStartDate,
                        designation: userDesignation,
                        cand_id: userCandidateId
                    };
                    try {
                        yield (0, createUserNode_1.createUserNode)(data);
                        let locationID = yield (0, locationMap_1.getLocationId)(userLocation);
                        yield (0, locationMap_1.userLocationMapping)([insertId, locationID, date]);
                        yield (0, locationMap_1.createUserLocation)({ user_id: insertId, loc_id: locationID });
                        let departmentID = yield (0, departmentMap_1.getDepartmentId)(req.body.department);
                        yield (0, departmentMap_1.userDepartmentMapping)([insertId, departmentID, date]);
                        yield (0, departmentMap_1.createUserDepartment)({ user_id: insertId, dep_id: departmentID });
                        res.status(200).json("User is successfully created");
                    }
                    catch (err) {
                        res.status(500).json(err);
                    }
                }
            }
            catch (err) {
                res.status(500).json("Oops! Internal Server Error");
            }
        }
    });
}
exports.newUserHandler = newUserHandler;
