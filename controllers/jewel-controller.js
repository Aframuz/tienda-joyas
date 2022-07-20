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
   const qs = req.query

   const schema = {
      path: req.path,
      name: "jewels",
      data: jewels,
   }

   try {
      const hal = halify.halifyCollection(schema, qs)
      res.json(hal)
   } catch (error) {
      res.status(400).json({
         error: {
            statusCode: 400,
            errorCode: "BAD_REQUEST",
            message: "Bad request",
            devMessage: error.message,
            timestamp: new Date().toISOString(),
         },
      })
   }
}

const getJewelById = async (req, res) => {
   const collectionName = req.path.split("/").slice(-2)[0]
   const { id } = req.params
   const jewel = await db.getJewelById(+id)

   const hal = halify.singleHal({ jewel }, collectionName)

   res.json(hal)
}

const getJewelsByCategory = async (req, res) => {
   const { category } = req.params
   const jewels = await db.getJewelsByCategory(category)
   console.log(req.path)

   const schema = {
      path: req.path,
      name: "jewels",
      data: jewels,
   }

   const hal = halify.halifyCollection(schema, req.query)

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
      path: req.path,
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
   getJewelsByCategory,
   getJewelsv2,
   getJewelByIdv2,
}
