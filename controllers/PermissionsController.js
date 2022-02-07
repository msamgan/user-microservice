import { successResponse, errorResponse } from "../helpers/methods.js"
import Controller from "./Controller.js"
import PermissionsLogic from "../logic/PermissionsLogic.js"
import { SERVER_ERROR } from "../helpers/constants.cjs"

class IndexController extends Controller {
    //
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
IndexController.validateName = async (req, res) => {
    const notNewUser = await PermissionsLogic.checkNameValidity(
        req.body.identity
    )

    if (notNewUser) {
        res.statusCode = ALREADY_EXIST
        return res.send({
            data: errorResponse("Exist in system", ALREADY_EXIST)
        })
    }

    return res.send({ data: successResponse("Does not exist in system") })
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
IndexController.createPermission = async (req, res) => {
    try {
        let permission = await PermissionsLogic.createPermission(req, res)
        if (permission) {
            return res.send(
                successResponse(
                    "Security Permission created successfully",
                    res.statusCode,
                    permission
                )
            )
        }
    } catch (error) {
        res.statusCode =
            res.statusCode >= 400 && res.statusCode < 600
                ? res.statusCode
                : SERVER_ERROR
        res.send({ data: errorResponse(error.message, res.statusCode) })
    }
}

/**
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
IndexController.updatePermission = async (req, res) => {
    try {
        const updatedPermission = await PermissionsLogic.updatePermission(
            req,
            res
        )
        if (updatedPermission) {
            res.send({
                data: successResponse(
                    "Security Permission details added successfully",
                    res.statusCode,
                    updatedPermission
                )
            })
        }
    } catch (error) {
        res.statusCode =
            res.statusCode >= 400 && res.statusCode < 600
                ? res.statusCode
                : SERVER_ERROR
        res.send({ data: errorResponse(error.message, res.statusCode) })
    }
}

/**
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
IndexController.getAllPermissions = async (req, res) => {
    try {
        const permissions = await PermissionsLogic.getAllPermissions()

        if (permissions) {
            res.send({
                data: successResponse(
                    "All Security Permissions",
                    res.statusCode,
                    permissions
                )
            })
        }
    } catch (error) {
        res.statusCode =
            res.statusCode >= 400 && res.statusCode < 600
                ? res.statusCode
                : SERVER_ERROR
        res.send({ data: errorResponse(error.message, res.statusCode) })
    }
}

export default IndexController
