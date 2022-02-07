import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import path from "path"

dotenv.config()

/*
 * Middlewares
 */
import authMiddleware from "./middleware/AuthMiddleware.js"
import groupsAndPermissionsMiddleware from "./middleware/GroupsAndPermissionsMiddleware.js"
import errorMiddleware from "./middleware/ErrorMiddleware.js"
import validators from "./middleware/Validators/index.js"

/*
 * Routes Files
 */
import UsersRoutes from "./routes/UsersRoutes.js"
import SecurityPermissionsRoutes from "./routes/PermissionsRoutes.js"
import MenusRoutes from "./routes/MenusRoutes.js"
import GroupsRoutes from "./routes/GroupsRoutes.js"

const app = express()
const port = process.env.PORT

const options = {
    origin: ["http://localhost:3000"]
}

app.use(express.json())
app.use(cors(options))
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )

    next()
})

app.use("/public", express.static(path.resolve() + "/public"))

/**
 * server Config.
 */
console.log(`Node environment: ${process.env.NODE_ENV}`)
app.listen(port, () => {
    console.log(`Example app listening at port http://localhost:${port}`)
})

/**
 * Routes..
 */
UsersRoutes(app, authMiddleware, groupsAndPermissionsMiddleware, validators)
GroupsRoutes(app, authMiddleware, groupsAndPermissionsMiddleware, validators)
MenusRoutes(app, authMiddleware, groupsAndPermissionsMiddleware, validators)
SecurityPermissionsRoutes(
    app,
    authMiddleware,
    groupsAndPermissionsMiddleware,
    validators
)

app.use(errorMiddleware)
