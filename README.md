# Desafío - Tienda de Joyas

## Habilidades a Evaluar

-  Buenas prácticas para la creación de API REST
-  HATEOAS y los subrecursos
-  Versionamiento
-  Selección, ordenación y filtrado de campos
-  Paginación y Errores de estado personalizados

## Descripción

La tienda de joyas My Precious Spa necesita cambiar su aplicación de escritorio por una moderna y dinámica. Para realizar esta tarea, contactó a un desarrollador Full Stack Developer que desarrolle la API REST de una aplicación cliente para satisfacer las necesidades puntuales de sus usuarios de una forma eficiente, mantenible y eficaz.

En este desafío contarás con un **Apoyo Desafío - Tienda de Joyas**, en donde encontrarás un documento JavaScript que exporta un arreglo de objetos, el cual corresponde a las joyas que deberás usar para cumplir con los requerimientos.

## Requerimientos

1. Crear una ruta para la devolución de todas las joyas aplicando HATEOAS. **(2 Puntos)**
2. Hacer una segunda versión de la API que ofrezca los mismos datos pero con los nombres de las propiedades diferentes. **(1 Punto)**
3. La API REST debe poder ofrecer una ruta con la que se puedan filtrar las joyas por categoría. **(1.5 Puntos)**
4. Crear una ruta que permita el filtrado por campos de una joya a consultar. **(2 Puntos)**
5. Crear una ruta que devuelva como payload un JSON con un mensaje de error cuando el usuario consulte el id de una joya que no exista. **(0.5 Puntos)**
6. Permitir hacer paginación de las joyas usando Query Strings. **(1.5 Puntos)**
7. Permitir hacer el ordenamiento de las joyas según su valor de forma ascendente o descendente usando Query Strings. **(1.5 Puntos)**

### Dónde encontrar cada requerimiento

1. `routes/jewel-route.js`, aplicacion de HATEOAS a nivel de controlador mediante `utils/halify` [link](https://github.com/Aframuz/tienda-joyas/blob/1454aaeb9d73de17c97f4ec75b9ca12e96556acb/routes/jewel-route.js#L18)
2. `routes/jewel-route.js`, se cambia el nombre de las llaves mediante `utils/rename-obj-keys` a nivel de controlador [link](https://github.com/Aframuz/tienda-joyas/blob/1454aaeb9d73de17c97f4ec75b9ca12e96556acb/routes/jewel-route.js#L22)
3. `routes/jewel-route.js`, handler en API ver.1, ademas se implementa un filtro por categoria usando query strings [link](https://github.com/Aframuz/tienda-joyas/blob/1454aaeb9d73de17c97f4ec75b9ca12e96556acb/routes/jewel-route.js#L20)
4. `routes/jewel-route.js`, handler en API ver.1, usar query strings para filtrar los campos que se deseen mostrar [link](https://github.com/Aframuz/tienda-joyas/blob/1454aaeb9d73de17c97f4ec75b9ca12e96556acb/routes/jewel-route.js#L19)
5. `controllers/jewel-controller.js` en handler `getJewelById` en ambas versiones de la API [link](https://github.com/Aframuz/tienda-joyas/blob/1454aaeb9d73de17c97f4ec75b9ca12e96556acb/controllers/jewel-controller.js#L38)
6. `utils/halify` toma el objeto `req.query` y revisa las propiedades `page` y `limit`, si no las hay utiliza valores por defecto (1 y 2 respectivamente) [link](https://github.com/Aframuz/tienda-joyas/blob/1454aaeb9d73de17c97f4ec75b9ca12e96556acb/utils/halify.js#L13)
7. `utils/halify` toma el objecto `req.query` y revisa si existe alguna propiedad con el valor de `asc` o `desc`, si es que existe y es válida devuelve el array de objetos ordenados según el campo especificado de lo contrario devuelve un error (400). Para ordenar por el valor usar `values=asc|desc` [link](https://github.com/Aframuz/tienda-joyas/blob/1454aaeb9d73de17c97f4ec75b9ca12e96556acb/utils/halify.js#L98)

## Notas

-  Diferencia entre no filtros y filtro mal escrito
-  Limite de recursos por página es 2 para demostrar paginación
