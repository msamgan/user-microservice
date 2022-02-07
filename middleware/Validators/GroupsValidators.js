import { body, param } from "express-validator"
import WrapperValidator from "./WrapperValidator.js"

export const createGroupValidator = [
    body("groupData.name")
        .exists()
        .withMessage("Group name is required")
        .isLength({ min: 4 })
        .withMessage("Must be at least 4 chars long"),
    body("groupData.desc")
        .exists()
        .withMessage("Group description is required"),
    WrapperValidator
]

export const checkNameValidator = [
    body("groupName").exists().withMessage("Name is required"),
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
