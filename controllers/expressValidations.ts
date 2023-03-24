import { check } from "express-validator";

let expressValidations = [
    check('firstName').not().isEmpty().isLength({min:2,max:150}),
  check('lastName').not().isEmpty().isLength({min:1,max:150}),
  check('email').not().isEmpty().isEmail().normalizeEmail(),
  check('startDate').not().isEmpty().isDate(),
  check('location').not().isEmpty().isLength({max:100}),
  check('department').not().isEmpty().isLength({max:100}),
  check('designation').not().isEmpty().isLength({max:100})
 ]

 export default expressValidations