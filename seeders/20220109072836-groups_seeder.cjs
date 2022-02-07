"use strict"

const { SUPERADMIN, ADMIN } = require("../helpers/constants.cjs")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "groups",
            [
                {
                    id: SUPERADMIN,
                    name: "super-admin",
                    desc: "read, create, edit, delete, activate/deactivate",
                    created_by: SUPERADMIN,
                    updated_by: SUPERADMIN,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: ADMIN,
                    name: "admin",
                    desc: "read, create, edit",
                    created_by: SUPERADMIN,
                    updated_by: SUPERADMIN,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ],
            {}
        )
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
}
