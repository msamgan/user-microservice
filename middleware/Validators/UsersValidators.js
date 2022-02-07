import { body, param } from "express-validator"
import WrapperValidator from "./WrapperValidator.js"

export const createUserValidator = [
    body("userData.full_name")
        .exists()
        .withMessage("Your last name is required")
        .isLength({ min: 4 })
        .withMessage("Must be at least 4 chars long"),
    body("userData.username")
        .exists()
        .withMessage("Your username is required")
        .isLength({ min: 6 })
        .withMessage("Must be at least 6 chars long"),
    body("userData.email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Must be a valid email"),
    body("userData.password")
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters"),
    body("userData.phone")
        .exists()
        .withMessage("Phone is required")
        .isLength({ min: 6 })
        .withMessage("Must be a valid Phone number")
        .notEmpty(),
    WrapperValidator
]

export const updateUserValidator = [
    body("userData.full_name")
        .exists()
        .withMessage("Your last name is required")
        .isLength({ min: 4 })
        .withMessage("Must be at least 4 chars long"),
    body("userData.username")
        .exists()
        .withMessage("Your username is required")
        .isLength({ min: 6 })
        .withMessage("Must be at least 6 chars long"),
    body("userData.email")
        .exists()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Must be a valid email"),
    body("userData.phone")
        .exists()
        .withMessage("Phone is required")
        .isLength({ min: 6 })
        .withMessage("Must be a valid Phone number")
        .notEmpty(),
    WrapperValidator
]

export const checkIdentityValidator = [
    body("identity").exists().withMessage("Identity is required"),
    WrapperValidator
]

export const loginValidator = [
    body("identity")
        .exists()
        .withMessage("Either username or email is required"),
    body("password")
        .exists()
        .withMessage("Password is required")
        .notEmpty()
        .withMessage("Password must be filled"),
    WrapperValidator
]

// export const loginWithUsernameValidator = [
//     body("username")
//         .exists()
//         .withMessage("Username is required")
// 		.isLength({ min: 6 })
// 		.withMessage("Must be at least 6 chars long"),
//     body("password")
//         .exists()
//         .withMessage("Password is required")
//         .notEmpty()
//         .withMessage("Password must be filled"),
//     WrapperValidator
// ];

// exports.resetPasswordValidator = [
// 	body("password")
// 		.exists()
// 		.withMessage("Password is required"),
// 	body("token")
// 		.exists()
// 		.withMessage("Token is required")
// 		.isLength({ min: 16 })
// 		.withMessage("Must be a valid token"),
// 	WrapperValidator
// ];
