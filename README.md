# AhorrADAs 🤑

Este proyecto ofrece resolución al tercer TP correspondiente a la carrera de Front End Developer de ADA.

## Descripción 💸

[AhorrADAs](https://github.com/wadaloope/AhorrADAs/deployments/github-pages) consiste en una aplicación web, creada con el objetivo de que se le permita al usuario realizar un seguimiento de sus gastos e ingresos a lo largo de los años.

![image](https://github.com/wadaloope/AhorrADAs/assets/139147384/0d4bb454-9332-45d9-85f9-8dcfb435d7b6)

Para ello, el proyecto presenta tres interfaces:

- La seccion de Balance, presenta al usuario un resumen de todas las operaciones ingresadas, que cumplan con los criterios indicados en la subsección de Filtros. En esta misma sección se presenta el balance total de las operaciones seleccionadas (esquina superior izquierda), y la opción de ingreso de nueva operación. Las operaciones ingresadas tienen la opción de ser editadas o eliminadas, según sea la necesidad del usuario.
- La sección Categorías, presenta un listado de rubros por defecto según los cuales clasificar cada operación. Así mismo, es posible incorporar categorías personalizadas, o editar las categorías existentes. Incluso borrarlas, operación permitida sólo para categorías que no están en uso.
- La sección Reportes, presenta el total de la información ingresada, en forma tabular y separada de acuerdo a meses y categorías con mayor balance positivo y negativo. Esto facilita revisar cuáles son los rubros que están insumiendo la mayor parte de nuestro dinero, o identificar los meses de mayores gastos/ganancias.

Esta aplicación cuenta con una presentación de escritorio y otra diseñada para uso desde dispositivos móviles (responsiveness) de acuerdo con los requerimientos del TP.

## Visuales 🎞️​

https://github.com/wadaloope/AhorrADAs/assets/139147384/d471359b-a401-4b45-9d75-2f9061ecf30e

## Tecnologías empleadas 🛠️

El proyecto tiene una estructura modular, lo que permitió el desarrollo individual de los elementos descritos:
Las tecnologías empleadas comprenden HTML5, Tailwild y Javascript. En función de las mismas, el contenido se agrupa de la siguiente manera:

- Un archivo .HTML organiza la información de marcado por etiquetas de los tres paneles. El mismo archivo incluye las opciones de estilado, generadas con ayuda de Tailwind.
- Cuatro archivos .JS cada uno de los cuales describe las funcionalidades que corresponden a cada parte del trabajo.
  - Script, donde se encuentran las funcionalidades de visualizacion de secciones.
  - Calculos, donde se efectúan las operaciones generales de recuperacion y guardado de datos en Local Storage, asi como las funciones de renderización de información.
  - Filtros, donde se aloja el algoritmo de filtrado, que permite al usuario seleccionar operaciones de manera específica, detallando en simultáneo el tipo de operación (gasto o ganancia), la categoría o la fecha de las mismas, así como ordenar al grupo de entradas en funcion de la fecha, monto, o alfabéticamente de acuerdo a su descripción.
  - Balance, que agrupa la lógica del cálculo general de balance, que debe irse actualizando en función de los criterios de filtrado.

En suma a los lenguajes utilizados, debe señalarse la incorporación de:

- Librerías de Tailwind , para diseñar el proyecto y lograr el responsive.
- Font awesome, para incorporar los iconos que se pueden visualizar en el proyecto.

## Software utilizado ​💾​

- Visual Studio Code
- Google Chrome
- GitBash

## Deployado 💳

[AhorrADAs](https://github.com/wadaloope/AhorrADAs/deployments/github-pages)

### Prerrequisitos 💻

- PC o celular provisto de navegador Google Chrome o Microsoft Edge.

### Instrucciones de uso 🕹️​

1. Accedé a la aplicación: [AhorrADAs](https://github.com/wadaloope/AhorrADAs/deployments/github-pages)
2. Cargá una operacion, la que desees. Puede ser el pago del alquiler, indicando el monto, la categoría, la fecha y si es gasto o ganancia.
3. Cuando lo hagas, clickeá en "Agregar" y en la pantalla principal aparecerá esa operacion y todas las que desees cargar.
4. Luego en la parte de filtros podrás elegir que se filtren y se visualicen solo los de mayor o menor ganancia, los de determinada categoría, de menor a mayor $$.
5. En la sección de categorías, si así lo preferís, vas a poder agregar, editar o borrar categorías.
6. Y por último en la seccion de informes, recibirás un resumen de los gastos o/y ganancias en función de las categorías y meses. 

## Autoras ✒️

- **Ma. Guadalupe Fernandez** [wadaloope](https://github.com/wadaloope)
- **Melina Eiros** [Meli](https://github.com/MeliEiros)

## Agradecimientos 🎁

Agradecemos a las profesoras Aldana Sorni y Clari Arguello por su claridad y paciencia a la hora de explicar este extenso y complejo trabajo.

-⌨️ con ❤️ por [wadaloope](https://github.com/wadaloope) 😊
-⌨️ con ❤️ por [Meli](https://github.com/MeliEiros) 😊
