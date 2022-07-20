const halifyCollection = (schema, page, limit) => {
   const { name, data } = schema
   const offset = (page - 1) * limit
   const resourcePaged = data.slice(offset, offset + limit)

   const dataHal = singleHalMinified(resourcePaged, name)

   return {
      _links: {
         self: {
            href: `/api/v1/${name}?page=${page}&limit=${limit}`, // URL to this resource
         },
         first: {
            href: `/api/v1/${name}?page=1&limit=${limit}`, // URL to first resource
         },
         prev: {
            href: page > 1 ? `/api/v1/${name}?page=${page - 1}&limit=${limit}` : null, // URL to previous page of resources
         },
         next: {
            href:
               page < Math.ceil(data.length / limit) ? `/api/v1/${name}?page=${Number(page) + 1}&limit=${limit}` : null, // URL to next page of resources
         },
         last: {
            href: `/api/v1/${name}?page=${Math.ceil(data.length / limit)}&limit=${limit}`, // URL to last page of resources
         },
      },
      count: resourcePaged.length,
      total: data.length,
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

   console.log(resourceName)

   return {
      _links: {
         self: {
            href: `/api/v1/${collectionName}/${resource.id}`,
         },
      },
      [resourceName]: resourceProperties,
   }
}

export default {
   halifyCollection,
   singleHal,
}
