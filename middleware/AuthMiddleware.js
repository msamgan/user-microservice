import dotenv from "dotenv"
import jsonwebtoken from "jsonwebtoken"
import { USER_UNAUTHORIZED } from "../helpers/constants.cjs"
dotenv.config()

export default (req, res, next) => {
    const bearerHeader = req.headers["authorization"]
    let accessToken

    if (bearerHeader) {
        const bearer = bearerHeader.split(" ")
        accessToken = bearer[1]
    }
    if (!accessToken) {
        res.statusCode = USER_UNAUTHORIZED
        throw new Error("Invalid Token")
    }

    req.user = jsonwebtoken.verify(accessToken, process.env.JWT_SECRET)

    next()
}
