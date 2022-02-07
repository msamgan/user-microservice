import { body, param } from "express-validator"
import WrapperValidator from "./WrapperValidator.js"

export const createPermissionValidator = [
    body("permissionData.name")
        .exists()
        .withMessage("Permissions name is required")
        .isLength({ min: 4 })
        .withMessage("Must be at least 4 chars long"),
    body("permissionData.desc")
        .exists()
        .withMessage("Permissions description is required"),
    WrapperValidator
]

export const checkNameValidator = [
    body("permissionData.name").exists().withMessage("Name is required"),
    WrapperValidator
]

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
