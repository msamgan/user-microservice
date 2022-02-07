import Sequelize from "sequelize"

export class GroupMenu extends Sequelize.Model {
    static associate(db) {
        GroupMenu.belongsTo(db.Group, {
            as: "Group",
            foreignKey: "group_id"
        })

        GroupMenu.belongsTo(db.Menu, {
            as: "Menu",
            foreignKey: "menu_id"
        })
    }
}

export const initModel = (sequelize, DataTypes) => {
    GroupMenu.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false
            },
            menu_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            group_id: {
                type: DataTypes.INTEGER,
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
            tableName: "groups_menus",
            sequelize: sequelize,
            underscored: true,
            modelName: "GroupMenu",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
}

export default GroupMenu
