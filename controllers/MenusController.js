import { successResponse, errorResponse } from "../helpers/methods.js"
import Controller from "./Controller.js"
import MenusLogic from "../logic/MenusLogic.js"
import { SERVER_ERROR } from "../helpers/constants.cjs"

class IndexController extends Controller {
    //
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
IndexController.createMenu = async (req, res) => {
    try {
        let menu = await MenusLogic.createMenu(req, res)
        if (menu) {
            return res.send(
                successResponse(
                    "Menu created successfully",
                    res.statusCode,
                    menu
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

IndexController.updateMenu = async (req, res) => {
    try {
        const updatedMenu = await MenusLogic.updateMenu(req, res)
        if (updatedMenu) {
            res.send({
                data: successResponse(
                    "Menu details added successfully",
                    res.statusCode,
                    updatedMenu
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
IndexController.getAllMenus = async (req, res) => {
    try {
        const menus = await MenusLogic.getAllMenus()

        if (menus) {
            res.send({
                data: successResponse("All Menus", res.statusCode, menus)
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
