import db from "../models/index.js"
import { SERVER_ERROR, NOT_FOUND } from "../helpers/constants.cjs"

class PermissionsLogic {}

/**
 *
 * @param name
 * @param res
 * @returns {Promise<{boolean}>}
 */
PermissionsLogic.checkNameValidity = async (name, res) => {
    const permission = await db.Permissions.findOne({
        where: {
            name: name
        }
    })

    return !!permission
}

/**
 *
 * @param req
 * @param res
 * @returns { Promise<{
 * 	 permission: {name: *, desc: *, active: boolean, created_by: *, updated_by: *, created_at: *, updated_at: *}
 * 	}>
 * }
 */
PermissionsLogic.createPermission = async (req, res) => {
    const { permissionData } = req.body
    const creator = req.user.id

    try {
        permissionData.created_by = creator
        permissionData.updated_by = creator
        permissionData.created_at = new Date()
        permissionData.updated_at = new Date()

        const permission = await db.Permissions.create(permissionData)

        return permission
    } catch (error) {
        throw Error(error.message)
    }
}

/**
 * @param req
 * @param res
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
PermissionsLogic.updatePermission = async (req, res) => {
    const { permissionData = {} } = req.body
    permissionData.updated_by = req.user.id
    try {
        const updatedPermission = await db.Permissions.update(permissionData, {
            where: {
                id: permissionData.id
            },
            returning: true,
            plain: true
        })

        if (updatedPermission) {
            return updatedPermission
        }

        res.statusCode = NOT_FOUND
        throw Error("Invalid permission")
    } catch (error) {
        throw Error(error.message)
    }
}

/**
 *
 * @returns {Promise<permissions[]|*[]>}
 */
PermissionsLogic.getAllPermissions = async () => {
    try {
        let permissions = await db.Permissions.findAll({
            where: {
                active: ACTIVE
            }
        })

        if (permissions) {
            return permissions
        }

        res.statusCode = NOT_FOUND
        throw Error("No permissions")
    } catch (error) {
        throw Error(error.message)
    }
}

export default PermissionsLogic
