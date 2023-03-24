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
exports.updateUserHandler = void 0;
const express_validator_1 = require("express-validator");
const editValidations_1 = require("./editValidations");
const updateUserTable_1 = require("./updateUserTable");
const updateUserNeo_1 = require("./updateUserNeo");
const findPriorValues_1 = require("./findPriorValues");
const updateUserLocationMapping_1 = require("./updateUserLocationMapping");
const updateDepartmentMapping_1 = require("./updateDepartmentMapping");
const createLocation_1 = require("../createLocation");
const createDepartment_1 = require("../createDepartment");
function updateUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array());
        }
        else {
            let firstName = req.body.firstName;
            let lastName = req.body.lastName;
            let email = req.body.email;
            let startDate = req.body.startDate;
            let location = req.body.location;
            let department = req.body.department;
            let designation = req.body.designation;
            let candidateId = req.body.candidateId;
            let date = new Date();
            let candidateToBeUpdated = yield (0, editValidations_1.checkCandidateId)(candidateId);
            let usersWithEmail = yield (0, editValidations_1.checkEmailUniqueness)([email, candidateId]);
            let locationExists = yield (0, editValidations_1.checkLocation)(location);
            let departmentExists = yield (0, editValidations_1.checkDepartment)(department);
            if (locationExists.length === 0) {
                let newLocationId = yield (0, createLocation_1.createNewLocation)(location);
                yield (0, createLocation_1.createNewLocationNode)({ loc_id: newLocationId, loc_name: location, loc_status: 1 });
            }
            if (departmentExists.length === 0) {
                let departmentId = yield (0, createDepartment_1.createNewDepartment)(department);
                yield (0, createDepartment_1.createNewDepartmentNode)({ dep_id: departmentId, dep_name: department, dep_status: 1 });
            }
            if (candidateToBeUpdated.length === 0) {
                res.status(400).json("There is no candidate with this id");
            }
            else if (usersWithEmail.length != 0) {
                res.status(400).json("The email id is already registered");
            }
            // else if (locationExists.length === 0) {
            //     res.status(400).json("The given location is not present")
            // }
            // else if (departmentExists.length === 0) {
            //     res.status(400).json("The given department is not present")
            // } 
            else {
                try {
                    yield (0, updateUserTable_1.updateUsers)([
                        firstName, lastName, email, startDate, designation, date, candidateId
                    ]);
                    yield (0, updateUserNeo_1.updateUserInNeo)({
                        candidateID: candidateId,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        startdate: startDate,
                        designation: designation
                    });
                    let locationBeforeUpdation = yield (0, findPriorValues_1.locationPriorUpdate)(candidateId);
                    let departmentBeforeUpdation = yield (0, findPriorValues_1.departmentPriorUpdate)(candidateId);
                    if (locationBeforeUpdation != location) {
                        function updateUserLocation() {
                            return __awaiter(this, void 0, void 0, function* () {
                                let user_id = candidateToBeUpdated[0].user_id;
                                let current_location_id = locationExists[0].location_id;
                                yield (0, updateUserLocationMapping_1.makeStatusInActive)(user_id);
                                yield (0, updateUserLocationMapping_1.insertNewRow)([user_id, current_location_id, date]);
                                yield (0, updateUserLocationMapping_1.deletePreviousRelation)({ user_id: user_id });
                                yield (0, updateUserLocationMapping_1.createNewRelation)({ user_id: user_id, loc_id: current_location_id });
                            });
                        }
                        yield updateUserLocation();
                    }
                    if (departmentBeforeUpdation != department) {
                        function updateUserDepartment() {
                            return __awaiter(this, void 0, void 0, function* () {
                                let current_user_id = candidateToBeUpdated[0].user_id;
                                let current_department_id = departmentExists[0].id;
                                yield (0, updateDepartmentMapping_1.dep_makeStatusInActive)(current_user_id);
                                yield (0, updateDepartmentMapping_1.dep_insertNewRow)([current_user_id, current_department_id, date]);
                                yield (0, updateDepartmentMapping_1.dep_deletePreviousRelation)({ user_id: current_user_id });
                                yield (0, updateDepartmentMapping_1.dep_createNewRelation)({ user_id: current_user_id, dep_id: current_department_id });
                            });
                        }
                        yield updateUserDepartment();
                    }
                    res.status(200).send("User updation is successful");
                }
                catch (err) {
                    res.status(500).json(err);
                    // res.status(500).json("Internal server error User could not be updated")
                }
            }
        }
    });
}
exports.updateUserHandler = updateUserHandler;
