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

1. `jewel-route.js`, aplicacion de HATEOAS a nivel de controlador mediante `utils/halify`
2. `jewel-route.js`, se cambia el nombre de las llaves mediante `utils/rename-obj-keys` a nivel de controlador
3.

## Notas
