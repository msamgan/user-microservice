import Sequelize from "sequelize"
import { ACTIVE, INACTIVE, SUPERADMIN } from "../helpers/constants.cjs"

export class User extends Sequelize.Model {
    static associate(db) {
        User.hasMany(db.UserGroup, {
            as: "UserGroup",
            foreignKey: "user_id"
        })

        User.belongsTo(db.User, {
            as: "Creator",
            foreignKey: "created_by"
        })

        User.belongsTo(db.User, {
            as: "Updater",
            foreignKey: "updated_by"
        })
    }

    static initScopes(db) {
        User.addScope("withGroupAndMenus", (mobile) => ({
            include: [
                {
                    model: db.UserGroup,
                    as: "UserGroup",
                    required: false,
                    attributes: ["id", "user_id", "group_id"],
                    include: [
                        {
                            model: db.Group,
                            as: "Group",
                            attributes: ["id", "name"],
                            include: [
                                {
                                    model: db.GroupPermission,
                                    as: "GroupPermission",
                                    attributes: ["id", "permission_id"],
                                    include: [
                                        {
                                            model: db.Permissions,
                                            as: "Permissions",
                                            attributes: ["id", "name"]
                                        }
                                    ]
                                }
                            ],
                            include: [
                                {
                                    model: db.GroupMenu,
                                    as: "GroupMenu",
                                    attributes: ["id", "menu_id"],
                                    include: [
                                        {
                                            model: db.Menu,
                                            as: "Menu",
                                            where: {
                                                is_mobile_menu: mobile
                                                    ? mobile
                                                    : INACTIVE
                                            },
                                            include: [
                                                {
                                                    model: db.Module,
                                                    as: "Module",
                                                    attributes: ["id", "name"]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }))
    }
}

export const initModel = (sequelize, DataTypes) => {
    User.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false
            },
            full_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            active: {
                type: DataTypes.INTEGER,
                defaultValue: ACTIVE,
                allowNull: false
            },
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: SUPERADMIN,
                foreignKey: true
            },
            updated_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: SUPERADMIN,
                foreignKey: true
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            tableName: "users",
            sequelize: sequelize,
            underscored: true,
            modelName: "User",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
}

export default User
