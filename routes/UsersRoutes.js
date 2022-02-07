import IndexController from "../controllers/IndexController.js"
import UsersController from "../controllers/UsersController.js"
import { ADMINSTRATION_USERS } from "../helpers/constants.cjs"

export default (
    app,
    authMiddleware,
    groupsAndPermissionsMiddleware,
    validators
) => {
    /**
     * static URLS to be on top..
     */
    app.get("/", IndexController.index)
    app.post(
        "/api/users/login",
        validators.loginValidator,
        UsersController.login
    )
    app.post(
        "/api/users/mobile-login",
        validators.loginValidator,
        UsersController.mobileLogin
    )
    app.post(
        "/api/users/create-user",
        authMiddleware,
        groupsAndPermissionsMiddleware(ADMINSTRATION_USERS),
        validators.createUserValidator,
        UsersController.createUser
    )
    app.put(
        "/api/users/update-user",
        authMiddleware,
        groupsAndPermissionsMiddleware(ADMINSTRATION_USERS),
        validators.updateUserValidator,
        UsersController.updateUser
    )
    app.post(
        "/api/users/validate-username-or-email",
        authMiddleware,
        groupsAndPermissionsMiddleware(ADMINSTRATION_USERS),
        validators.checkIdentityValidator,
        UsersController.validateUsernameOrEmail
    )
    app.get(
        "/api/users/get-all-users",
        authMiddleware,
        groupsAndPermissionsMiddleware(ADMINSTRATION_USERS),
        UsersController.getAllUsers
    )
}
