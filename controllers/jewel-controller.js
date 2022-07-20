/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
import db from "../models/jewel.js"
import halify from "../utils/halify.js"
import renameKeys from "../utils/rename-obj-keys.js"
/*=============================================
=                  HANDLERS                   =
=============================================*/
// Get
const getJewels = async (req, res) => {
   const jewels = await db.getJewels()
   const { page = 1, limit = 2 } = req.query

   const schema = {
      name: "jewels",
      data: jewels,
   }

   const hal = halify.halifyCollection(schema, page, limit)

   res.json(hal)
}

const getJewelById = async (req, res) => {
   const collectionName = req.path.split("/").slice(-2)[0]
   const { id } = req.params
   const jewel = await db.getJewelById(+id)

   const hal = halify.singleHal({ jewel }, collectionName)

   res.json(hal)
}

// API v2
const getJewelsv2 = async (req, res) => {
   const jewels = await db.getJewels()
   const { page = 1, limit = 2 } = req.query

   const jewelsv2 = renameKeys(jewels, {
      name: "nombre",
      model: "modelo",
      category: "categoria",
      value: "valor",
   })

   const schema = {
      name: "jewels",
      data: jewelsv2,
   }

   const hal = halify.halifyCollection(schema, page, limit)

   res.json(hal)
}

const getJewelByIdv2 = async (req, res) => {
   const collectionName = req.path.split("/").slice(-2)[0]
   const { id } = req.params

   const jewel = await db.getJewelById(+id)

   const [jewelv2] = renameKeys([jewel], {
      name: "nombre",
      model: "modelo",
      category: "categoria",
      value: "valor",
   })

   const hal = halify.singleHal({ jewelv2 }, collectionName)

   res.json(hal)
}
/*=============================================
=                   EXPORTS                   =
=============================================*/
export default {
   getJewels,
   getJewelById,
   getJewelsv2,
   getJewelByIdv2,
}
