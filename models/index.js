import dotenv from "dotenv"
import Sequelize from "sequelize"
import * as UserModel from "./User.js"
import * as GroupModel from "./Group.js"
import * as PermissionModel from "./Permission.js"
import * as MenuModel from "./Menu.js"
import * as ModuleModel from "./Module.js"
import * as UserGroupModel from "./UserGroup.js"
import * as GroupPermissionModel from "./GroupPermission.js"
import * as GroupMenuModel from "./GroupMenu.js"
import _ from "lodash"
import { createRequire } from "module"

dotenv.config()

const require = createRequire(import.meta.url)
const config = require("../config/config.json")

const database =
    config[process.env.NODE_ENV || _.last(process.argv).split("=")[1]]

const sequelize = new Sequelize.Sequelize(
    database.database,
    database.username,
    database.password,
    {
        host: database.host,
        dialect: database.dialect
    }
)

//TODO refactor the file, & reorder the imports and inits

// initialize models
UserModel.initModel(sequelize, Sequelize.DataTypes)
GroupModel.initModel(sequelize, Sequelize.DataTypes)
PermissionModel.initModel(sequelize, Sequelize.DataTypes)
MenuModel.initModel(sequelize, Sequelize.DataTypes)
ModuleModel.initModel(sequelize, Sequelize.DataTypes)
UserGroupModel.initModel(sequelize, Sequelize.DataTypes)
GroupPermissionModel.initModel(sequelize, Sequelize.DataTypes)
GroupMenuModel.initModel(sequelize, Sequelize.DataTypes)

const User = UserModel.User
const Group = GroupModel.Group
const Permissions = PermissionModel.Permissions
const Menu = MenuModel.Menu
const Module = ModuleModel.Module
const UserGroup = UserGroupModel.UserGroup
const GroupPermission = GroupPermissionModel.GroupPermission
const GroupMenu = GroupMenuModel.GroupMenu

const db = {
    sequelize,
    Sequelize,
    User,
    Group,
    Permissions,
    Menu,
    Module,
    UserGroup,
    GroupPermission,
    GroupMenu
}

Object.values(db).forEach((model) => {
    if (model.associate) {
        model.associate(db)
    }

    if (model.initScopes) {
        model.initScopes(db)
    }

    if (model.initHooks) {
        model.initHooks(db)
    }
})

// attempt connecting to db
sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.")
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err)
    })

export default db
