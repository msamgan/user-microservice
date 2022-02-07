import Sequelize from "sequelize"

export class UserGroup extends Sequelize.Model {
    static associate(db) {
        UserGroup.belongsTo(db.Group, {
            as: "Group",
            foreignKey: "group_id"
        })

        UserGroup.belongsTo(db.User, {
            as: "User",
            foreignKey: "user_id"
        })
    }
}

export const initModel = (sequelize, DataTypes) => {
    UserGroup.init(
        {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false
            },
            user_id: {
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
            tableName: "user_groups",
            sequelize: sequelize,
            underscored: true,
            modelName: "UserGroup",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
}

export default UserGroup
