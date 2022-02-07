"use strict"

const { HASHSALT, SUPERADMIN } = require("../helpers/constants.cjs")
const bcrypt = require("bcrypt")

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            "users",
            [
                {
                    full_name: "Super Admin",
                    username: "superAdmin",
                    email: "super.admin@admin.com",
                    password: await bcrypt.hash("SuperAdmin@2022", HASHSALT),
                    phone: "971563325682",
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
