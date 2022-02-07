import bcrypt from "bcrypt"
import db from "../models/index.js"
import {
    ACTIVE,
    NOT_FOUND,
    USER_UNAUTHORIZED,
    INVALID_PASSWORD,
    DEFAULT_WAREHOUSE,
    HASHSALT,
    INACTIVE
} from "../helpers/constants.cjs"
import Sequelize from "sequelize"

class UsersLogic {}

UsersLogic.decryptPassword = async (password, hashedPassword) => {
    hashedPassword = hashedPassword.replace(/^\$2y(.+)$/i, "$2a$1")
    return await bcrypt.compare(password, hashedPassword)
}

UsersLogic.encryptPassword = async (password) => {
    return await bcrypt.hash(password, HASHSALT)
}

/**
 *
 * @param identity
 * @param res
 * @returns {Promise<{boolean}>}
 */
UsersLogic.checkUsernameOrEmailValidity = async (identity, res) => {
    const user = await db.User.findOne({
        where: {
            [Sequelize.Op.or]: [{ email: identity }, { username: identity }],
            active: ACTIVE
        }
    })

    return !!user
}

/**
 * @param req
 * @param res
 * @returns {Promise<
 * 	user: {fname: *, lname: *, username: *, email: *, phone: *, Warehouses: [*], Groups: [*], active: boolean}>}
 */
UsersLogic.createUser = async (req, res) => {
    const {
        userData = {},
        warehouses = [],
        groups = [],
        default_warehouse = DEFAULT_WAREHOUSE
    } = req.body
    const hashedPassword = await UsersLogic.encryptPassword(userData.password)
    const creator = req.user.id

    try {
        // let user = await db.sequelize.transaction(async (t) => {

        userData.password = hashedPassword
        userData.created_by = creator
        userData.updated_by = creator
        userData.created_at = new Date()
        userData.updated_at = new Date()

        const user = await db.User.create(userData)

        warehouses.forEach(async (warehouse) => {
            await db.ParcelHubUserWarehouse.create({
                user_id: user.id,
                warehouse_id: warehouse,
                is_default: warehouse === default_warehouse ? ACTIVE : INACTIVE
            })
        })

        groups.forEach(async (group) => {
            await db.UserGroup.create({
                user_id: user.id,
                group_id: group
            })
        })

        // 	return user
        // })

        return {
            full_name: user.full_name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            Warehouses: warehouses,
            Groups: groups,
            active: user.active
        }
    } catch (error) {
        throw Error(error.message)
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
    }
}

/**
 * @param req
 * @param res
 * @returns {Promise<Model<any, TModelAttributes>>}
 */

UsersLogic.updateUser = async (req, res) => {
    //activate or deactivate will be included in this api
    const { userData = {}, groups = [], warehouses = [], userId } = req.body
    userData.updated_by = req.user.id

    try {
        // const t = await db.sequelize.transaction()
        if (userData?.newPassword) {
            if (userData?.newPassword?.length < 6) {
                res.statusCode = INVALID_PASSWORD
                throw new Error("Must be at least 6 chars long")
            }
            const hashedPassword = await UsersLogic.encryptPassword(
                userData.newPassword
            )
            userData.password = hashedPassword
            delete userData.newPassword
        }

        const updatedUser = await db.User.scope([
            "withGroupAndMenus",
            "withWarehouses"
        ]).update(userData, {
            where: {
                id: userId
            },
            returning: true,
            plain: true
        })

        const userGroups = await db.UserGroup.findAll({
            where: {
                user_id: userId
            }
        })

        const userWarehouses = await db.ParcelHubUserWarehouse.findAll({
            where: {
                user_id: userId
            }
        })

        if (groups?.length > 0) {
            await db.UserGroup.destroy({
                where: {
                    user_id: userId,
                    group_id: {
                        [Sequelize.Op.notIn]: groups
                    }
                }
            })

            const userGroupsIds = userGroups.map(
                (userGroup) => userGroup.group_id
            )
            groups.forEach(async (group) => {
                if (!userGroupsIds.includes(group)) {
                    await db.UserGroup.create({
                        user_id: userId,
                        group_id: group
                    })
                }
            })
        }

        if (warehouses.length > 0) {
            await db.ParcelHubUserWarehouse.destroy({
                where: {
                    user_id: userId,
                    warehouse_id: {
                        [Sequelize.Op.notIn]: warehouses
                    }
                }
            })

            const userWarehousesIds = userWarehouses.map(
                (userWarehouse) => userWarehouse.warehouse_id
            )

            warehouses.forEach(async (warehouse) => {
                if (!userWarehousesIds.includes(warehouse)) {
                    await db.ParcelHubUserWarehouse.create({
                        user_id: userId,
                        warehouse_id: warehouse
                    })
                }
            })
        }

        if (updatedUser) {
            return updatedUser
        }

        res.statusCode = NOT_FOUND
        throw Error("Invalid  user")
    } catch (error) {
        throw Error(error.message)
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
UsersLogic.login = async (req, res) => {
    const { identity, password } = req.body
    try {
        let user = await db.User.scope([
            {
                method: ["withGroupAndMenus", INACTIVE]
            }
        ]).findOne({
            where: {
                [Sequelize.Op.or]: [
                    { email: identity },
                    { username: identity }
                ],
                active: ACTIVE
            }
        })

        if (!user) {
            res.statusCode = NOT_FOUND
            throw Error("Invalid user")
        }

        let isUserValid = await UsersLogic.decryptPassword(
            password,
            user.password
        )

        if (!isUserValid) {
            res.statusCode = USER_UNAUTHORIZED
            throw Error("Invalid credentials for a user")
        }

        delete user.password
        return user
    } catch (error) {
        throw Error(error.message)
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<Model<any, TModelAttributes>>}
 */
UsersLogic.mobileLogin = async (req, res) => {
    const { identity, password } = req.body
    try {
        let user = await db.User.scope([
            { method: ["withGroupAndMenus", ACTIVE] }
        ]).findOne({
            where: {
                [Sequelize.Op.or]: [
                    { email: identity },
                    { username: identity }
                ],
                active: ACTIVE
            }
        })

        if (user) {
            let isUserValid = await UsersLogic.decryptPassword(
                password,
                user.password
            )

            if (isUserValid) {
                delete user.password
                return user
            } else {
                res.statusCode = USER_UNAUTHORIZED
                throw Error("Invalid credentials for a  user")
            }
        }
        res.statusCode = NOT_FOUND
        throw Error("Invalid  user")
    } catch (error) {
        throw Error(error.message)
    }
}

/**
 *
 * @returns {Promise<users[]|*[]>}
 */
UsersLogic.getAllUsers = async (req, res) => {
    try {
        const warhouseId = Number(req.query?.warehouse) || DEFAULT_WAREHOUSE
        let users = await db.User.scope([
            "withGroupAndMenus",
            "withWarehouses"
        ]).findAll()

        if (users) {
            return users?.filter((user) =>
                user?.ParcelHubUserWarehouse?.map(
                    (uw) => uw.warehouse_id
                ).includes(warhouseId)
            )
        }

        res.statusCode = NOT_FOUND
        throw Error("No  users")
    } catch (error) {
        throw Error(error.message)
    }
}

export default UsersLogic
