"use strict"

const { ACTIVE, SUPERADMIN } = require("../helpers/constants.cjs")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("users", {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,
                allowNull: false
            },
            full_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            active: {
                type: Sequelize.INTEGER,
                defaultValue: ACTIVE,
                allowNull: false
            },
            created_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: SUPERADMIN,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            updated_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: SUPERADMIN,
                references: {
                    model: "users",
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
