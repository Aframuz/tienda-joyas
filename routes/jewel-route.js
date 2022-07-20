/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
import express from "express"
// Local modules
import jewelCtrl from "../controllers/jewel-controller.js"

/*=============================================
=                    INIT                     =
=============================================*/

const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.route("/v1/jewels").get(jewelCtrl.getJewels)
router.route("/v1/jewels/:id").get(jewelCtrl.getJewelById)

router.route("/v2/jewels").get(jewelCtrl.getJewelsv2)
router.route("/v2/jewels/:id").get(jewelCtrl.getJewelByIdv2)

/*=============================================
=                   EXPORTS                   =
=============================================*/
export default router
