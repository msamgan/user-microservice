import Sequelize from "sequelize"

export class Permissions extends Sequelize.Model {
    static associate(db) {
        Permissions.hasOne(db.GroupPermission, {
            as: "Group",
            foreignKey: "group_id"
        })

        Permissions.belongsTo(db.User, {
            as: "Creator",
            foreignKey: "created_by"
        })

        Permissions.belongsTo(db.User, {
            as: "Updater",
            foreignKey: "updated_by"
        })
    }

    // static initScopes(db ) {
    // 	Permissions.addScope("withMenuAndModule", {
    // 		include: []
    // 	})
    // }
}

export const initModel = (sequelize, DataTypes) => {
    Permissions.init(
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
            tableName: "permissions",
            sequelize: sequelize,
            underscored: true,
            modelName: "Permission",
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
    )
}

export default Permissions
