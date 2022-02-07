import { successResponse, errorResponse } from "../helpers/methods.js"
import Controller from "./Controller.js"
import GroupsLogic from "../logic/GroupsLogic.js"
import { ALREADY_EXIST, SERVER_ERROR } from "../helpers/constants.cjs"

class IndexController extends Controller {
    //
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
IndexController.createGroup = async (req, res) => {
    try {
        let group = await GroupsLogic.createGroup(req, res)
        if (group) {
            return res.send(
                successResponse(
                    "Group created successfully",
                    res.statusCode,
                    group
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

IndexController.updateGroup = async (req, res) => {
    try {
        const updatedGroup = await GroupsLogic.updateGroup(req, res)
        if (updatedGroup) {
            res.send({
                data: successResponse(
                    "Group details added successfully",
                    res.statusCode,
                    updatedGroup
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
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
IndexController.validateName = async (req, res) => {
    const notNewGroup = await GroupsLogic.checkNameValidity(req.body.groupName)

    if (notNewGroup) {
        res.statusCode = ALREADY_EXIST
        return res.send({
            data: errorResponse("Exist in system", ALREADY_EXIST)
        })
    }

    return res.send({ data: successResponse('Doesn"t exist in system') })
}

/**
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
IndexController.getAllGroups = async (req, res) => {
    try {
        const { groups, modules } = await GroupsLogic.getAllGroups()

        if (groups) {
            res.send({
                data: successResponse("All Groups", res.statusCode, {
                    groups,
                    modules
                })
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
IndexController.deleteUnUsedGroup = async (req, res) => {
    try {
        await GroupsLogic.deleteUnUsedGroup(req, res)
        res.send({
            data: successResponse(
                "Unused group deleted successfully",
                res.statusCode,
                {}
            )
        })
    } catch (error) {
        res.send({ data: errorResponse(error.message, res.statusCode) })
    }
}

export default IndexController
