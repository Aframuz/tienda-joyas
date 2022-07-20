const renameKeys = (collection, keySchema) => {
   const newCollection = collection.map((obj) => {
      const newObj = {}

      for (const [k, v] of Object.entries(obj)) {
         if (keySchema.hasOwnProperty(k)) {
            const newKey = keySchema[k]
            delete Object.assign(newObj, { [newKey]: obj[k] })
         } else {
            Object.assign(newObj, { [k]: v })
         }
      }

      return newObj
   })

   return newCollection
}

export default renameKeys
