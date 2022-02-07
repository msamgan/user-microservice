import Sequelize from "sequelize"

export class GroupPermission extends Sequelize.Model {
    static associate(db) {
        GroupPermission.belongsTo(db.Group, {
            as: "Group",
            foreignKey: "group_id"
        })

        GroupPermission.belongsTo(db.Permissions, {
            as: "Permissions",
            foreignKey: "permission_id"
        })
    }
}

export const initModel = (sequelize, DataTypes) => {
    GroupPermission.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false
            },
            group_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            permission_id: {
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
            tableName: "user_permissions",
            sequelize: sequelize,
            underscored: true,
            modelName: "GroupPermission",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
}

export default GroupPermission
