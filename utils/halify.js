// From a collection of resources, format them to a HAL collection
const halifyCollection = (schema, qs) => {
   const { name, data, path } = schema
   const { page = 1, limit = 2 } = qs

   // Filter and Sort resources
   const dataFiltered = filterByProperty(data, qs)
   const dataSorted = sortByProperty(dataFiltered, qs)

   // Default error if no data
   if (dataSorted.length === 0) {
      throw new Error("No resources found for the given query")
   }

   // Paginate resources
   const offset = (page - 1) * limit
   const resourcePaged = dataSorted.slice(offset, offset + +limit)

   // Format resources, stripping unnecessary properties
   const dataHal = singleHalMinified(resourcePaged, name)

   // HAL
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
               page < Math.ceil(dataSorted.length / +limit)
                  ? `/api/${path}?page=${Number(page) + 1}&limit=${limit}`
                  : null, // URL to next page of resources
         },
         last: {
            href: `/api/${path}?page=${Math.ceil(dataSorted.length / +limit)}&limit=${limit}`, // URL to last page of resources
         },
      },
      count: resourcePaged.length,
      total: dataSorted.length,
      _embedded: {
         [name]: dataHal,
      },
   }
}

// Format a single resource to a HAL resource
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

// Filter resources by property in query string
const filterByProperty = (collection, qs) => {
   const filters = getFilters(qs)

   // If no filters, return collection
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

// Get filters from query string
const getFilters = (qs) => {
   const filters = []

   // Exclude page, limit, and sort fields from filters
   for (const key in qs) {
      if (key !== "page" && key !== "limit" && qs[key] !== "asc" && qs[key] !== "desc") {
         filters.push({
            key,
            value: qs[key],
         })
      }
   }

   return filters
}

// Sort resources by property in query string
const sortByProperty = (collection, qs) => {
   // get first property with value "asc" or "desc"
   const sortBy = Object.keys(qs).find((key) => qs[key] === "asc" || qs[key] === "desc")
   const order = qs[sortBy]

   // If no sort, return collection
   if (!sortBy) {
      return collection
   }

   // If sort is invalid, throw error
   if (!collection[0].hasOwnProperty(sortBy)) {
      throw new Error(`Property ${sortBy} not found`)
   }

   let orderMult = order === "asc" ? 1 : -1
   return collection.sort((a, b) => {
      let result = 0

      if (a[sortBy] < b[sortBy]) {
         result = -1 * orderMult
      } else if (a[sortBy] > b[sortBy]) {
         result = 1 * orderMult
      }

      return result
   })
}

// Create HAL for a single resource
const singleHal = (resourceSchema) => {
   const { path, qs, name, data } = resourceSchema
   const fields = getFields(Object.keys(data), qs)

   try {
      const dataFiltered = filterByFields(data, fields)
      return {
         _links: {
            self: {
               href: `/api/${path}`,
            },
         },
         [name]: dataFiltered,
      }
   } catch (error) {
      throw new Error(error)
   }
}

// Get fields to add to HAL from query string
const getFields = (resourceProperties, qs) => {
   if (qs.fields) {
      return Array.from(new Set(["id", ...qs.fields.split(",")]))
   }
   return resourceProperties
}

// Filter properties to show by fields in query string
const filterByFields = (obj, fields) => {
   const filtered = {}

   // If field is invalid, throw error
   for (const value of fields) {
      if (!obj.hasOwnProperty(value)) {
         throw new Error(`Property ${value} not found`)
      }
   }

   // Add properties to filtered object
   for (const key in obj) {
      if (fields.includes(key)) {
         filtered[key] = obj[key]
      }
   }

   return filtered
}

export default {
   halifyCollection,
   singleHal,
}
