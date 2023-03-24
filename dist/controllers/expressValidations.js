"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
let expressValidations = [
    (0, express_validator_1.check)('firstName').not().isEmpty().isLength({ min: 2, max: 150 }),
    (0, express_validator_1.check)('lastName').not().isEmpty().isLength({ min: 1, max: 150 }),
    (0, express_validator_1.check)('email').not().isEmpty().isEmail().normalizeEmail(),
    (0, express_validator_1.check)('startDate').not().isEmpty().isDate(),
    (0, express_validator_1.check)('location').not().isEmpty().isLength({ max: 100 }),
    (0, express_validator_1.check)('department').not().isEmpty().isLength({ max: 100 }),
    (0, express_validator_1.check)('designation').not().isEmpty().isLength({ max: 100 })
];
exports.default = expressValidations;
