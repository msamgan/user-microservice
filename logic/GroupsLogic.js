import db from "../models/index.js"
import {
    SERVER_ERROR,
    NOT_FOUND,
    FORBIDDEN,
    ACTIVE,
    INACTIVE
} from "../helpers/constants.cjs"
import Sequelize from "sequelize"

class GroupsLogic {}

/**
 *
 * @param name
 * @param res
 * @returns {Promise<{boolean}>}
 */
GroupsLogic.checkNameValidity = async (name, res) => {
    const group = await db.Group.findOne({
        where: {
            name: name
        }
    })

    return !!group
}

/**
 *
 * @param req
 * @param res
 * @returns { Promise<{
 * 	 group: {name: *, desc: *, created_by: *, updated_by: *, created_at: *, updated_at: *}, Menus: [*], permissions: [*]
 * 	}>
 * }
 */
GroupsLogic.createGroup = async (req, res) => {
    const { groupData, permissions, menus, mobileMenus } = req.body
    const creator = req.user.id

    try {
        groupData.created_by = creator
        groupData.updated_by = creator
        groupData.created_at = new Date()
        groupData.updated_at = new Date()

        const group = await db.Group.create(groupData)

        if (menus || mobileMenus) {
            const allMenus = menus.concat(mobileMenus)
            allMenus.forEach(async (menu) => {
                await db.GroupMenu.create({
                    group_id: group.id,
                    menu_id: menu,
                    is_mobile_menu: mobileMenus.includes(menu)
                        ? ACTIVE
                        : INACTIVE
                })
            })
        }

        if (permissions) {
            permissions.forEach(async (permission) => {
                await db.GroupPermission.create({
                    group_id: group.id,
                    permission_id: permission
                })
            })
        }

        return {
            ...group,
            Menus: menus || [],
            Permissions: permissions || []
        }
    } catch (error) {
        throw Error(error.message)
    }
}

/**
 * @param req
 * @param res
 * @returns {Promise<Model<any, TModelAttributes>>}
 */

GroupsLogic.updateGroup = async (req, res) => {
    const {
        groupData = {},
        permissions = [],
        menus = [],
        mobileMenus = [],
        groupId = null
    } = req.body
    groupData.updated_by = req.user.id
    try {
        // const t = await db.sequelize.transaction()
        const groupPermissions = await db.GroupPermission.findAll({
            where: {
                group_id: groupId
            }
        })

        const groupMenus = await db.GroupMenu.findAll({
            where: {
                group_id: groupId
            }
        })

        if (permissions?.length > 0) {
            await db.GroupPermission.destroy({
                where: {
                    group_id: group.id,
                    permission_id: {
                        [Sequelize.Op.notIn]: permissions
                    }
                }
            })

            const groupPermissionsIds = groupPermissions.map(
                (groupPermission) => groupPermission.permission_id
            )

            permissions.forEach(async (permission) => {
                if (!groupPermissionsIds.includes(permission)) {
                    await db.GroupPermission.create({
                        group_id: group.id,
                        permission_id: permission
                    })
                }
            })
        }

        if (menus.length > 0 || mobileMenus.length > 0) {
            const allMenus = menus.concat(mobileMenus)
            await db.GroupMenu.destroy({
                where: {
                    group_id: groupId,
                    menu_id: {
                        [Sequelize.Op.notIn]: allMenus
                    }
                }
            })

            const groupMenusIds = groupMenus.map(
                (groupMenu) => groupMenu.menu_id
            )

            allMenus.forEach(async (menu) => {
                if (!groupMenusIds.includes(menu)) {
                    await db.GroupMenu.create({
                        group_id: groupId,
                        menu_id: menu,
                        is_mobile_menu: mobileMenus.includes(menu)
                            ? ACTIVE
                            : INACTIVE
                    })
                }
            })
        }

        const updatedGroup = await db.Group.scope([
            "withPermissions",
            "withMenus"
        ]).update(groupData, {
            where: {
                id: groupId
            },
            returning: true,
            plain: true
        })

        if (updatedGroup) {
            return updatedGroup
        }

        res.statusCode = NOT_FOUND
        throw Error("Invalid group")
    } catch (error) {
        throw Error(error.message)
    }
}

/**
 *
 * @returns {Promise<groups[]|*[]>}
 */
GroupsLogic.getAllGroups = async () => {
    try {
        let groups = await db.Group.scope([
            "withPermissions",
            "withMenus",
            "withUsers"
        ]).findAll()
        let modules = await db.Module.scope(["withMenus"]).findAll()
        if (groups) {
            return { groups, modules }
        }

        res.statusCode = NOT_FOUND
        throw Error("No groups")
    } catch (error) {
        throw Error(error.message)
    }
}

/**
 *
 * @returns {Promise<>}
 */
GroupsLogic.deleteUnUsedGroup = async (req, res) => {
    try {
        const usersGroups = await db.UserGroup.findAll({
            where: {
                group_id: req.body.id
            }
        })
        if (!usersGroups || usersGroups?.length === 0) {
            await db.Group.destroy({
                where: {
                    id: req.body.id
                }
            })
        } else {
            res.statusCode = FORBIDDEN
            throw Error("Unable to proceed, group is used.")
        }
    } catch (error) {
        throw Error(error.message)
    }
}

export default GroupsLogic
