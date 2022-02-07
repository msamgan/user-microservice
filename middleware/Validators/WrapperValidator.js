import { validationResult } from "express-validator"

import { errorResponse } from "../../helpers/methods.js"

/**
 *
 * @param req
 * @param res
 * @param next
 */
export default (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).send(errorResponse("Errors", 400, errors.array()))
        return
    }
    next()
}
