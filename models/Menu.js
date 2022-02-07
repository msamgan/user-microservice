import Sequelize from "sequelize"
import { ACTIVE, INACTIVE } from "../helpers/constants.cjs"

export class Menu extends Sequelize.Model {
    static associate(db) {
        Menu.belongsTo(db.Module, {
            as: "Module",
            foreignKey: "module_id"
        })
        Menu.belongsTo(db.Menu, {
            as: "ParentMenu",
            foreignKey: {
                name: "parent_id",
                allowNull: true
            }
        })
        Menu.hasMany(db.GroupMenu, {
            as: "GroupMenu",
            foreignKey: "menu_id"
        })
    }

    static initScopes(db) {
        Menu.addScope("withModule", {
            include: [
                {
                    model: db.Module,
                    as: "Module",
                    required: false,
                    include: []
                }
            ]
        })

        Menu.addScope("withParentMenu", {
            include: [
                {
                    model: db.Module,
                    as: "ParentMenu",
                    required: false,
                    include: []
                }
            ]
        })
    }
}

export const initModel = (sequelize, DataTypes) => {
    Menu.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false
            },
            module_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            parent_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            route: {
                type: DataTypes.STRING,
                allowNull: false
            },
            icon: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            is_mobile_menu: {
                type: DataTypes.BOOLEAN,
                defaultValue: INACTIVE,
                allowNull: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: ACTIVE,
                allowNull: false
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
            tableName: "menus",
            sequelize: sequelize,
            underscored: true,
            modelName: "Menu",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
}

export default Menu
