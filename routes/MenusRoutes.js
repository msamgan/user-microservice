import IndexController from "../controllers/IndexController.js"
import MenusController from "../controllers/MenusController.js"

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
        "/api/menus/create-menu",
        authMiddleware,
        MenusController.createMenu
    )
    app.put(
        "/api/menus/update-menu",
        authMiddleware,
        MenusController.updateMenu
    )
    app.get(
        "/api/menus/get-all-menus",
        authMiddleware,
        MenusController.getAllMenus
    )
}
