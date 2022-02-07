import db from "../models/index.js"
import { SERVER_ERROR, NOT_FOUND } from "../helpers/constants.cjs"

class MenusLogic {}

/**
 *
 * @param req
 * @param res
 * @returns { Promise<{menu}> }
 *
 */
MenusLogic.createMenu = async (req, res) => {
    const { menuData } = req.body
    const creator = req.user.id

    try {
        menuData.created_by = creator
        menuData.updated_by = creator
        menuData.created_at = new Date()
        menuData.updated_at = new Date()

        const menu = await db.Menu.create(menuData)

        return menu
    } catch (error) {
        throw Error(error.message)
    }
}

/**
 * @param req
 * @param res
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
MenusLogic.updateMenu = async (req, res) => {
    const { menuData = {} } = req.body
    menuData.updated_by = req.user.id
    try {
        const updatedMenu = await db.Menu.update(menuData, {
            where: {
                id: menuData.id
            },
            returning: true,
            plain: true
        })

        if (updatedMenu) {
            return updatedMenu
        }

        res.statusCode = NOT_FOUND
        throw Error("Invalid menu")
    } catch (error) {
        throw Error(error.message)
    }
}

/**
 *
 * @returns {Promise<menus[]|*[]>}
 */
MenusLogic.getAllMenus = async () => {
    try {
        let menus = await db.Menu.findAll({
            where: {
                active: ACTIVE
            }
        })

        if (menus) {
            return menus
        }

        res.statusCode = NOT_FOUND
        throw Error("No menus")
    } catch (error) {
        throw Error(error.message)
    }
}

export default MenusLogic
