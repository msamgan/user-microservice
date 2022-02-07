/**
 *
 * @param message
 * @param payload
 * @param statusCode
 * @returns {{code: number, payload, message: string, status: boolean}}
 */
 export function  successResponse(message, statusCode = 200, payload = null) {
    return {
        status: true,
        code: statusCode,
        message: message,
        payload: payload
    }
}

/**
 *
 * @param message
 * @param payload
 * @param statusCode
 * @returns {{code: number, payload: null, error: string, status: boolean}}
 */
export function errorResponse(message, statusCode = 500, payload = null) {
    return {
        status: false,
        error: message,
        code: statusCode,
        payload: payload,
    }
}
