import * as UsersValidators from "./UsersValidators.js"
import * as PermissionsValidators from "./PermissionsValidators.js"
import * as GroupsValidators from "./GroupsValidators.js"

export default {
    ...UsersValidators,
    ...PermissionsValidators,
    ...GroupsValidators
}
