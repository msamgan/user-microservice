"use strict"

const { SUPERADMIN, ADMINSTRATION, ADMIN } = require("../helpers/constants.cjs")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "user_groups",
            [
                {
                    group_id: SUPERADMIN,
                    user_id: SUPERADMIN,
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
