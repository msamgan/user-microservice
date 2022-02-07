import jsonwebtoken from "jsonwebtoken"
import { successResponse, errorResponse } from "../helpers/methods.js"
import Controller from "./Controller.js"
import UsersLogic from "../logic/UsersLogic.js"
import {
    ALREADY_EXIST,
    INVALID_PASSWORD,
    SERVER_ERROR
} from "../helpers/constants.cjs"
import _ from "lodash"

class IndexController extends Controller {
    //
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
IndexController.login = async (req, res) => {
    try {
        let user = await UsersLogic.login(req, res)

        if (user) {
            const userGroups = user.UserGroup.map((ug) => ug.group_id).join(",")

            let accessToken = jsonwebtoken.sign(
                {
                    email: user.email,
                    id: user.id,
                    groups: userGroups
                },
                process.env.JWT_SECRET
            )

            const UserGroup = user.UserGroup
            const GroupMenu = user.UserGroup[0].Group?.GroupMenu

            delete user.UserGroup

            UserGroup.forEach((ug) => ug.setDataValue("Group", undefined))

            return res.send({
                data: successResponse(
                    "Logged in successfully",
                    res.statusCode,
                    {
                        full_name: user.full_name,
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        UserGroup: UserGroup,
                        GroupMenu: GroupMenu?.sort(
                            (a, b) => a.menu_id - b.menu_id
                        ),
                        accessToken: accessToken
                    }
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
IndexController.mobileLogin = async (req, res) => {
    try {
        let user = await UsersLogic.mobileLogin(req, res)

        if (user) {
            const userGroups = user.UserGroup.map((ug) => ug.group_id).join(",")

            let accessToken = jsonwebtoken.sign(
                {
                    email: user.email,
                    id: user.id,
                    groups: userGroups
                },
                process.env.JWT_SECRET
            )

            const UserGroup = user.UserGroup
            const GroupMenu = user.UserGroup[0].Group?.GroupMenu

            delete user.UserGroup

            UserGroup.forEach((ug) => ug.setDataValue("Group", undefined))

            return res.send({
                data: successResponse(
                    "Logged in successfully",
                    res.statusCode,
                    {
                        full_name: user.full_name,
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        UserGroup: UserGroup,
                        GroupMenu: GroupMenu?.sort(
                            (a, b) => a.menu_id - b.menu_id
                        ),
                        accessToken: accessToken
                    }
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
 * @returns {Promise<*>}
 */
IndexController.createUser = async (req, res) => {
    try {
        let user = await UsersLogic.createUser(req, res)
        if (user) {
            return res.send({
                data: successResponse(
                    " User created successfully",
                    res.statusCode,
                    user
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

IndexController.updateUser = async (req, res) => {
    try {
        const updatedUser = await UsersLogic.updateUser(req, res)
        if (updatedUser) {
            res.send({
                data: successResponse(
                    " User details updated successfully",
                    res.statusCode,
                    updatedUser
                )
            })
        }
    } catch (error) {
        res.statusCode =
            res.statusCode >= 400 && res.statusCode < 600
                ? res.statusCode
                : SERVER_ERROR
        if (res.statusCode === INVALID_PASSWORD) {
            res.send({
                data: errorResponse(error.message, res.statusCode, [
                    { param: "password", msg: error.message }
                ])
            })
        } else {
            res.send({ data: errorResponse(error.message, res.statusCode) })
        }
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
IndexController.validateUsernameOrEmail = async (req, res) => {
    const notNewUser = await UsersLogic.checkUsernameOrEmailValidity(
        req.body.identity
    )

    if (notNewUser) {
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
IndexController.getAllUsers = async (req, res) => {
    try {
        const users = await UsersLogic.getAllUsers(req, res)

        if (users) {
            res.send({
                data: successResponse(
                    "All  Users",
                    res.statusCode,
                    users
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
