const {body } = require('express-validator');
const validateNewUser =()=>{
   return [
    body('name')
    .trim()
    .isLength({min:3}).withMessage('your name cannot be shorter than 3 characters'),

    body('Nickname').trim().isLength({min:3}).withMessage('your Nick name cannot be shorter than 3 characters'),
    body('email')
    .trim().isEmail().withMessage('Enter Valid Email'),

    body('password')
    .trim()
    .isLength({min:4}).withMessage('password cannot be less than 4 characters'),

   ];
}

module.exports ={
    validateNewUser
}