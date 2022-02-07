import logger from "../logger.js"
import * as Methods from "../helpers/methods.js"

export default (error, req, res, next) => {
    logger.error(error.message, {
        stack: error.stack
    })

    res.send({ data: Methods.errorResponse(error.message, res.statusCode) })
}
