"use strict"

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("group_permissions", {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,
                allowNull: false
            },
            permission_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "permissions",
                    key: "id"
                }
            },
            group_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "groups",
                    key: "id"
                }
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable("users");
         */
    }
}
