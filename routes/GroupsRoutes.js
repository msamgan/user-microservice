import IndexController from "../controllers/IndexController.js"
import GroupsController from "../controllers/GroupsController.js"
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
        "/api/groups/create-group",
        authMiddleware,
        groupsAndPermissionsMiddleware(ADMINSTRATION_USERS),
        validators.createGroupValidator,
        GroupsController.createGroup
    )
    app.put(
        "/api/groups/update-group",
        authMiddleware,
        groupsAndPermissionsMiddleware(ADMINSTRATION_USERS),
        GroupsController.updateGroup
    )
    app.post(
        "/api/groups/validate-name",
        authMiddleware,
        groupsAndPermissionsMiddleware(ADMINSTRATION_USERS),
        validators.checkNameValidator,
        GroupsController.validateName
    )
    app.get(
        "/api/groups/get-all-groups",
        authMiddleware,
        groupsAndPermissionsMiddleware(ADMINSTRATION_USERS),
        GroupsController.getAllGroups
    )
    app.post(
        "/api/groups/delete-unused-group",
        authMiddleware,
        groupsAndPermissionsMiddleware(ADMINSTRATION_USERS),
        GroupsController.deleteUnUsedGroup
    )
}
