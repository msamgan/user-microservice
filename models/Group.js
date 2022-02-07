import Sequelize from "sequelize"

export class Group extends Sequelize.Model {
    static associate(db) {
        Group.hasMany(db.GroupPermission, {
            as: "GroupPermission",
            foreignKey: "group_id"
        })

        Group.hasMany(db.UserGroup, {
            as: "UserGroup",
            foreignKey: "group_id"
        })

        Group.hasMany(db.GroupMenu, {
            as: "GroupMenu",
            foreignKey: "group_id"
        })

        Group.belongsTo(db.User, {
            as: "Creator",
            foreignKey: "created_by"
        })

        Group.belongsTo(db.User, {
            as: "Updater",
            foreignKey: "updated_by"
        })
    }

    static initScopes(db) {
        Group.addScope("withPermissions", {
            include: [
                {
                    model: db.GroupPermission,
                    as: "GroupPermission",
                    required: false,
                    include: [
                        {
                            model: db.Permissions,
                            as: "Permissions",
                            required: false
                        }
                    ]
                }
            ]
        }),
            Group.addScope("withMenus", {
                include: [
                    {
                        model: db.GroupMenu,
                        as: "GroupMenu",
                        required: false,
                        include: [
                            {
                                model: db.Menu,
                                as: "Menu",
                                required: false
                            }
                        ]
                    }
                ]
            })
        Group.addScope("withUsers", {
            include: [
                {
                    model: db.UserGroup,
                    as: "UserGroup",
                    required: false,
                    include: [
                        {
                            model: db.User,
                            as: "User",
                            required: false
                        }
                    ]
                }
            ]
        })
    }
}

export const initModel = (sequelize, DataTypes) => {
    Group.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            desc: {
                type: DataTypes.STRING,
                allowNull: false
            },
            created_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true
            },
            updated_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
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
            tableName: "groups",
            sequelize: sequelize,
            underscored: true,
            modelName: "Group",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
}

export default Group
