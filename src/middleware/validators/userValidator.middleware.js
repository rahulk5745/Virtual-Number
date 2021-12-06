const { body } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createUserSchema = [
    body('user_id')
    .optional()
    .isNumeric(),
    body('expiry_date')
    .optional(),
    
    body('username')
        .exists()
        .withMessage('username is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    // body('password')
    //     .exists()
    //     .withMessage('Password is required')
    //     .notEmpty()
    //     .isLength({ min: 6 })
    //     .withMessage('Password must contain at least 6 characters')
    //     .isLength({ max: 10 })
      //  .withMessage('Password can contain max 10 characters'),
    body('name')
        .exists()
        .withMessage('Your first name is required')
        .isAlpha()
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('mobile')
    .optional()
    .isNumeric()
    .isLength({ min: 10 })
    .withMessage('Must be a number'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
   //address
    body('address')
    .optional(),
    body('pincode')
        .optional()
        .isNumeric()
        .isLength({ min: 6 })
        .withMessage('Must be a number'),
    //company_name
    body('company_name')
    .optional(),
    body('parent')
        .optional()
        .isNumeric()
        .withMessage('Must be a number'),
    body('type')
        .optional(),
        
    body('parent_company')
        .optional(),
    body('credits')
        .optional()
        .isNumeric()
        .isLength({ min: 10 })
        .withMessage('Must be a number'),
    body('flag')
        .optional()
        .isNumeric(),
    //logo
    body('logo')
    .optional(),
    //domain
    body('domain')
    .optional(),
    body('service_type')
    .optional(),
];

exports.updateUserSchema = [
    body('name')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
        body('mobile')
        .optional()
        .isNumeric()
        .isLength({ min: 10 })
        .withMessage('Must be a number'),
        body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .normalizeEmail(),
        body('address')
        .optional(),
        body('pincode')
        .optional()
        .isNumeric()
        .isLength({ min: 6 })
        .withMessage('Must be a number'),
        body('company_name')
        .optional(),
    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['name', 'mobile', 'email', 'address', 'pincode', 'company_name'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];

exports.validateLogin = [
    body('username')
        .exists()
        .withMessage('username is required')
        .withMessage('Must be a valid username'),
        
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password must be filled')
];