const halifyCollection = (schema, qs) => {
   const { name, data, path } = schema
   const { page = 1, limit = 2 } = qs

   const dataFiltered = filterByQuery(data, qs)

   if (dataFiltered.length === 0) {
      throw new Error("No resources found for the given query")
   }

   const offset = (page - 1) * limit
   const resourcePaged = dataFiltered.slice(offset, offset + limit)

   const dataHal = singleHalMinified(resourcePaged, name)

   return {
      _links: {
         self: {
            href: `/api/${path}?page=${page}&limit=${limit}`, // URL to this resource
         },
         first: {
            href: `/api/${path}?page=1&limit=${limit}`, // URL to first resource
         },
         prev: {
            href: page > 1 ? `/api/${path}?page=${page - 1}&limit=${limit}` : null, // URL to previous page of resources
         },
         next: {
            href:
               page < Math.ceil(dataFiltered.length / limit)
                  ? `/api/${path}?page=${Number(page) + 1}&limit=${limit}`
                  : null, // URL to next page of resources
         },
         last: {
            href: `/api/${path}?page=${Math.ceil(dataFiltered.length / limit)}&limit=${limit}`, // URL to last page of resources
         },
      },
      count: resourcePaged.length,
      total: dataFiltered.length,
      _embedded: {
         [name]: dataHal,
      },
   }
}

const singleHalMinified = (collectionPaged, collectionName) => {
   return collectionPaged.map((resource) => {
      const nameProp = Object.keys(resource).includes("name") ? "name" : "nombre"

      return {
         _links: {
            self: {
               href: `/api/v1/${collectionName}/${resource.id}`,
            },
         },
         id: resource.id,
         [nameProp]: resource[nameProp],
      }
   })
}

const singleHal = (resource, collectionName) => {
   const resourceName = Object.keys(resource)[0]
   const resourceProperties = resource[resourceName]

   return {
      _links: {
         self: {
            href: `/api/v1/${collectionName}/${resource.id}`,
         },
      },
      [resourceName]: resourceProperties,
   }
}

const filterByQuery = (collection, qs) => {
   const filters = getFilters(qs)

   if (filters.length === 0) {
      return collection
   }

   return collection.filter((resource) => {
      let isValid = true

      filters.forEach((filter) => {
         if (resource[filter.key] !== filter.value) {
            isValid = false
         }
      })

      return isValid
   })
}

const getFilters = (qs) => {
   const filters = []

   for (const key in qs) {
      if (key !== "page" && key !== "limit") {
         filters.push({
            key,
            value: qs[key],
         })
      }
   }

   return filters
}

export default {
   halifyCollection,
   singleHal,
}
