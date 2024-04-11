cargarPorDefecto(); //carga de valores por default para local storage
desplegableCategorias(); //renderizacion de menues desplegables de categorias desde local storage
renderizarBalance(descargarStorage().operaciones);
//---------------------------------- Desplegado menu hamburguesa -------------------------------
let banderaHamburguesa = undefined;
const botonSuperior = document.getElementById("boton-hamburguesa");
const divisor = document.getElementById("linea-separacion");
botonSuperior.addEventListener("click", (e) => {
	document
		.getElementsByClassName("links-navegacion")[0]
		.classList.remove("hidden");
	divisor.classList.remove("hidden");
	botonSuperior.classList.add("hidden");
	botonSuperiorCierre.classList.remove("hidden");
	banderaHamburguesa = 1;
});

//---------------------------------- Guardado menu hamburguesa ---------------------------------
const botonSuperiorCierre = document.getElementById("boton-cruz");
botonSuperiorCierre.addEventListener("click", (e) => {
	document
		.getElementsByClassName("links-navegacion")[0]
		.classList.add("hidden");
	divisor.classList.add("hidden");
	botonSuperior.classList.remove("hidden");
	botonSuperiorCierre.classList.add("hidden");
	banderaHamburguesa = 2;
});

//-------------------------------- Seleccion distintas secciones -------------------------------

const botonBalance = document.getElementById("boton-balance");
const botonCategorias = document.getElementById("boton-categorias");
const botonSumarCateg = document.getElementById("sumar-categoria");
const botonReportes = document.getElementById("boton-reportes");
let selectBalance = false;
let selectCategoria = false;
let selectReporte = false;

//---------------------------------- Seleccion seccion balance ---------------------------------
botonBalance.addEventListener("click", (e) => {
	if (!selectBalance) {
		document.getElementById("balance").classList.remove("hidden");
		document.getElementById("categorias").classList.add("hidden");
		document.getElementById("reportes").classList.add("hidden");
		selectBalance = true;
		selectCategoria = false;
		selectReporte = false;
		if (window.innerWidth < 768) {
			document
				.getElementsByClassName("links-navegacion")[0]
				.classList.add("hidden");
			divisor.classList.add("hidden");
			botonSuperior.classList.remove("hidden");
			botonSuperiorCierre.classList.add("hidden");
		}
	}
});

//--------------------------------- Seleccion seccion categorias -------------------------------
botonCategorias.addEventListener("click", (e) => {
	if (!selectCategoria) {
		document.getElementById("balance").classList.add("hidden");
		document.getElementById("categorias").classList.remove("hidden");
		document.getElementById("reportes").classList.add("hidden");
		selectBalance = false;
		selectCategoria = true;
		selectReporte = false;
		if (window.innerWidth < 768) {
			document
				.getElementsByClassName("links-navegacion")[0]
				.classList.add("hidden");
			divisor.classList.add("hidden");
			botonSuperior.classList.remove("hidden");
			botonSuperiorCierre.classList.add("hidden");
		}
	}
	renderizarCategorias(descargarStorage().categorias);
});
//--------------------------------- Agregar una categoria nueva --------------------------------
botonSumarCateg.addEventListener("click", (e) => {
	agregarCategoria();
});
//---------------------------------- Seleccion seccion reportes --------------------------------
botonReportes.addEventListener("click", (e) => {
	if (!selectReporte) {
		document.getElementById("balance").classList.add("hidden");
		document.getElementById("categorias").classList.add("hidden");
		document.getElementById("reportes").classList.remove("hidden");
		selectBalance = false;
		selectCategoria = false;
		selectReporte = true;
	}
	if (window.innerWidth < 768) {
		document
			.getElementsByClassName("links-navegacion")[0]
			.classList.add("hidden");
		divisor.classList.add("hidden");
		botonSuperior.classList.remove("hidden");
		botonSuperiorCierre.classList.add("hidden");
	}
});

//----------------------------------- Carga de nueva operacion ---------------------------------
const botonOperacion = document.getElementById("ver-operacion");
const nuevaOperacion = document.getElementById("sumar-operacion");
const cancelaOperacion = document.getElementById("cancelar-operacion");

//-------------------------------------- Agregar operacion -------------------------------------
botonOperacion.addEventListener("click", (e) => {
	document.getElementById("nueva-operacion").classList.remove("hidden");
	document.getElementById("balance").classList.add("hidden");
	selectBalance = false;
	document.getElementById("boton-balance").style.display = "none";
	document.getElementById("boton-categorias").style.display = "none";
	document.getElementById("boton-reportes").style.display = "none";
	document.getElementById("boton-hamburguesa").classList.add("hidden");
	console.log(document.getElementById("linea-separacion").classList);
});

//----------------------------------- Aceptar nueva operacion ----------------------------------
nuevaOperacion.addEventListener("click", (e) => {
	if (agregarOperacion()) {
		renderizarBalance(descargarStorage().operaciones);
		document.getElementById("nueva-operacion").classList.add("hidden");
		document.getElementById("balance").classList.remove("hidden");
		selectBalance = true;
		document.getElementById("boton-balance").style.display = "flex";
		document.getElementById("boton-categorias").style.display = "flex";
		document.getElementById("boton-reportes").style.display = "flex";
		if (window.innerWidth < 768)
			document.getElementById("boton-hamburguesa").classList.remove("hidden");
		limpiarFormulario();
	}
});

//----------------------------------- Cancelar nueva operacion ---------------------------------
cancelaOperacion.addEventListener("click", (e) => {
	document.getElementById("nueva-operacion").classList.add("hidden");
	document.getElementById("balance").classList.remove("hidden");
	selectBalance = true;
	document.getElementById("boton-balance").style.display = "flex";
	document.getElementById("boton-categorias").style.display = "flex";
	document.getElementById("boton-reportes").style.display = "flex";
	if (window.innerWidth < 768)
		document.getElementById("boton-hamburguesa").classList.remove("hidden");
	limpiarFormulario();
});

//-------------------------------------- Listado de Filtros ------------------------------------
const ocultarFiltros = document.getElementById("ocultar-filtros");
const mostrarFiltros = document.getElementById("mostrar-filtros");
const filtros = document.getElementsByClassName("field");

//---------------------------------------- Ocultar filtros -------------------------------------
ocultarFiltros.addEventListener("click", (e) => {
	for (i = 0; i < filtros.length; i++) filtros[i].style.display = "none";
	ocultarFiltros.classList.add("hidden");
	mostrarFiltros.classList.remove("hidden");
});

//---------------------------------------- Mostrar filtros -------------------------------------
mostrarFiltros.addEventListener("click", (e) => {
	for (i = 0; i < filtros.length; i++) filtros[i].style.display = "block";
	ocultarFiltros.classList.remove("hidden");
	mostrarFiltros.classList.add("hidden");
});

//----------------------------------------- Boton Borrar----------------------------------------
const borrar = document.getElementsByClassName("borrar");
console.log(borrar);
for (let i = 0; i < borrar.length; i++) {
	borrar[i].addEventListener("click", (e) => {
		const identificacion = borrar[i].id;
		alert(`${identificacion}`);
	});
}
