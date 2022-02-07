"use strict"

const { ACTIVE, INACTIVE } = require("../helpers/constants.cjs")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable("menus", {
            id: {
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.INTEGER,
                allowNull: false
            },
            parent_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "menus",
                    key: "id"
                }
            },
            module_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "modules",
                    key: "id"
                }
            },
            route: {
                type: Sequelize.STRING,
                allowNull: false
            },
            icon: {
                type: Sequelize.STRING,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            is_mobile_menu: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: INACTIVE
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: ACTIVE
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
