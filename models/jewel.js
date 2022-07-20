/*=============================================
=               IMPORT MODULES                =
=============================================*/
// Local modules
import jewels from "../db/jewels.js"

/*=============================================
=                   QUERIES                   =
=============================================*/
// Get all
const getJewels = async () => {
   return jewels
}

// Get by id
const getJewelById = async (id) => {
   return jewels.find((jewel) => jewel.id === id)
}

// Get by category
const getJewelsByCategory = async (category) => {
   return jewels.filter((jewel) => jewel.category === category)
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
export default {
   getJewels,
   getJewelById,
   getJewelsByCategory,
}
