import IndexController from "../controllers/IndexController.js"
import PermissionsController from "../controllers/PermissionsController.js"
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
        "/api/permissions/create-permissions",
        authMiddleware,
        groupsAndPermissionsMiddleware(ADMINSTRATION_USERS),
        PermissionsController.createPermission
    )
    app.put(
        "/api/permissions/update-permissions",
        authMiddleware,
        groupsAndPermissionsMiddleware(ADMINSTRATION_USERS),
        PermissionsController.updatePermission
    )
    app.post(
        "/api/permissions/validate-name",
        authMiddleware,
        validators.checkNameValidator,
        groupsAndPermissionsMiddleware(ADMINSTRATION_USERS),
        PermissionsController.validateName
    )
    app.get(
        "/api/permissions/get-all-permissions",
        authMiddleware,
        groupsAndPermissionsMiddleware(ADMINSTRATION_USERS),
        PermissionsController.getAllPermissions
    )
}
