"use strict"

const { ACTIVE } = require("../helpers/constants.cjs")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("groups", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            desc: {
                type: Sequelize.STRING,
                allowNull: false
            },
            created_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            updated_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            created_at: {
                type: Sequelize.DATE
            },

            updated_at: {
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
