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
// API v1
// Get all jewels
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

// Get jewel by id
const getJewelById = async (req, res) => {
   const { id } = req.params
   const jewel = await db.getJewelById(+id)

   // If the jewel is not found, return a 404 error
   if (!jewel) {
      return res.status(404).json({
         error: {
            statusCode: 404,
            errorCode: "NOT_FOUND",
            message: "Resource not found",
            devMessage: `Jewel with id ${id} not found`,
            timestamp: new Date().toISOString(),
         },
      })
   }

   const schema = {
      path: req.path,
      qs: req.query,
      name: "jewel",
      data: jewel,
   }

   try {
      const hal = halify.singleHal(schema)
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

// Get jewels by category
const getJewelsByCategory = async (req, res) => {
   const { category } = req.params
   const jewels = await db.getJewelsByCategory(category)

   const schema = {
      path: req.path,
      name: "jewels",
      data: jewels,
   }

   try {
      const hal = halify.halifyCollection(schema, req.query)
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

// API v2
// Get all jewels
const getJewelsv2 = async (req, res) => {
   const jewels = await db.getJewels()
   const qs = req.query

   // Rename the keys of the jewel object
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

// Get jewel by id
const getJewelByIdv2 = async (req, res) => {
   const { id } = req.params
   const jewel = await db.getJewelById(+id)

   // If the jewel is not found, return a 404 error
   if (!jewel) {
      return res.status(404).json({
         error: {
            statusCode: 404,
            errorCode: "NOT_FOUND",
            message: "Resource not found",
            devMessage: `Jewel with id ${id} not found`,
            timestamp: new Date().toISOString(),
         },
      })
   }

   // Rename the keys of the jewel object
   const [jewelv2] = renameKeys([jewel], {
      name: "nombre",
      model: "modelo",
      category: "categoria",
      value: "valor",
   })

   const schema = {
      path: req.path,
      qs: req.query,
      name: "jewel",
      data: jewelv2,
   }

   try {
      const hal = halify.singleHal(schema)
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
