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

/*=============================================
=                   EXPORTS                   =
=============================================*/
export default {
   getJewels,
   getJewelById,
}
