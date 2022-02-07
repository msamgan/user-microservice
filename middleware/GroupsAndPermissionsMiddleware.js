import { FORBIDDEN } from "../helpers/constants.cjs"

const groupsAndPermissionsMiddleware = (groups) => {
    return (req, res, next) => {
        const userGroups = req.user.groups
            .split(",")
            .map((group) => Number(group))

        if (
            !userGroups.some((r) => groups.indexOf(r) >= 0) ||
            !groups.some((r) => userGroups.indexOf(r) >= 0)
        ) {
            res.statusCode = FORBIDDEN
            throw Error(`Must be in groups ${groups}`)
        } else {
            next()
        }
    }
}

export default groupsAndPermissionsMiddleware
