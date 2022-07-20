/*=============================================
=               IMPORT MODULES                =
=============================================*/
// Local modules
import jewels from "../db/jewels.js"

/*=============================================
=                   QUERIES                   =
=============================================*/
// Get
const getJewels = async () => {
   return jewels
}

const getJewelById = async (id) => {
   return jewels.find((jewel) => jewel.id === id)
}

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
