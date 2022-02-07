import Controller from "./Controller.js"

class IndexController extends Controller {
    //
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
IndexController.index = async (req, res) => {
    res.send("hello")
}

export default IndexController
