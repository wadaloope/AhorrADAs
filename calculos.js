const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const subirDatos = (key, datos) => {
	localStorage.setItem(`${key}`, JSON.stringify(datos));
};

const objeto = {
	operaciones: [],
	cuentas: [],
	categorias: [
		{
			id: self.crypto.randomUUID(),
			name: "Comida",
		},
		{
			id: self.crypto.randomUUID(),
			name: "Servicios",
		},
		{
			id: self.crypto.randomUUID(),
			name: "Salidas",
		},
		{
			id: self.crypto.randomUUID(),
			name: "Educacion",
		},
		{
			id: self.crypto.randomUUID(),
			name: "Transporte",
		},
		{
			id: self.crypto.randomUUID(),
			name: "Trabajo",
		},
	],
};

const cargarPorDefecto = () => {
	if (JSON.parse(localStorage.getItem("")) === null)
		localStorage.setItem(``, JSON.stringify(objeto));
};
const descargarStorage = () => {
	return JSON.parse(localStorage.getItem("")) || [];
};

const desplegableCategorias = () => {
	const desplegable = document.getElementsByClassName("seleccion-categoria");
	desplegable[0].innerHTML = `<option value="Todas">Todas</option>`;
	desplegable[1].innerHTML = "";
	const categoriasAlmacenadas = descargarStorage().categorias;
	for (let i = 0; i < categoriasAlmacenadas.length; i++) {
		for (let j = 0; j < desplegable.length; j++)
			desplegable[
				j
			].innerHTML += `<option id="${categoriasAlmacenadas[i].id}categ" value="${categoriasAlmacenadas[i].name}">${categoriasAlmacenadas[i].name}</option>`;
	}
};

const agregarOperacion = () => {
	if (
		$("#descripcion-entrada").value === "" ||
		$("#cantidad-entrada").value === 0 ||
		$("#fecha-entrada").value === ""
	) {
		crearModal("Verificá haber ingresado todos los datos", "Aceptar", 0, 0);
		return false;
	} else {
		let operacion = {
			id: self.crypto.randomUUID(),
			description: $("#descripcion-entrada").value, //descripcionEntrada
			amount:
				$("#tipo-operacion").value === "Ganancia"
					? Number($("#cantidad-entrada").value)
					: -Number($("#cantidad-entrada").value),
			type: $("#tipo-operacion").value,
			category: $("#seleccion-categoria").value,
			date: $("#fecha-entrada").value.replace(/-/g, "/"), //generar la variable
		};
		const datosAlmacenados = descargarStorage();
		datosAlmacenados.operaciones.push(operacion);
		console.log(datosAlmacenados);
		subirDatos("", datosAlmacenados);
		return true;
	}
};

const editarOperacion = (identificador) => {
	document.getElementById("editar-operacion").classList.remove("hidden");
	document.getElementById("balance").classList.add("hidden");
	selectBalance = false;
	document.getElementById("boton-balance").style.display = "none";
	document.getElementById("boton-categorias").style.display = "none";
	document.getElementById("boton-reportes").style.display = "none";
	document.getElementById("boton-hamburguesa").classList.add("hidden");
	console.log(document.getElementById("linea-separacion").classList);
	const temporalParaEditar = descargarStorage();
	let identflag = "";
	for (let i = 0; i < temporalParaEditar.operaciones.length; i++)
		if (identificador === temporalParaEditar.operaciones[i].id) {
			document.getElementById("edic-descripcion-entrada").value =
				temporalParaEditar.operaciones[i].description;
			document.getElementById("edic-cantidad-entrada").value = Math.sqrt(
				temporalParaEditar.operaciones[i].amount *
					temporalParaEditar.operaciones[i].amount
			);
			document.getElementById("edic-tipo-operacion").value =
				temporalParaEditar.operaciones[i].type;
			document.getElementById("edic-seleccion-categoria").value =
				temporalParaEditar.operaciones[i].category;
			document.getElementById("edic-fecha-entrada").value =
				temporalParaEditar.operaciones[i].date.replace(/\//g, "-");
			identflag = i;
		}

	document
		.getElementById("edic-sumar-operacion")
		.addEventListener("click", (e) => {
			if (
				$("#edic-descripcion-entrada").value === "" ||
				$("#edic-cantidad-entrada").value === 0 ||
				$("#edic-fecha-entrada").value === ""
			) {
				crearModal("Verificá haber ingresado todos los datos", "Aceptar", 0, 0);
				return false;
			} else {
				temporalParaEditar.operaciones[identflag].description = $(
					"#edic-descripcion-entrada"
				).value;
				temporalParaEditar.operaciones[identflag].amount =
					$("#edic-tipo-operacion").value === "Ganancia"
						? Number($("#edic-cantidad-entrada").value)
						: -Number($("#edic-cantidad-entrada").value);
				temporalParaEditar.operaciones[identflag].type = $(
					"#edic-tipo-operacion"
				).value;
				temporalParaEditar.operaciones[identflag].category = $(
					"#edic-seleccion-categoria"
				).value;
				temporalParaEditar.operaciones[identflag].date = $(
					"#edic-fecha-entrada"
				).value.replace(/-/g, "/");
				subirDatos("", temporalParaEditar);
				renderizarBalance(descargarStorage().operaciones);
				generarBalance(descargarStorage().operaciones);
				document.getElementById("editar-operacion").classList.add("hidden");
				document.getElementById("balance").classList.remove("hidden");
				selectBalance = true;
				document.getElementById("boton-balance").style.display = "flex";
				document.getElementById("boton-categorias").style.display = "flex";
				document.getElementById("boton-reportes").style.display = "flex";
				if (window.innerWidth < 768)
					document
						.getElementById("boton-hamburguesa")
						.classList.remove("hidden");
				limpiarFormulario();
				return true;
			}
		});

	document
		.getElementById("edic-cancelar-operacion")
		.addEventListener("click", (e) => {
			document.getElementById("editar-operacion").classList.add("hidden");
			document.getElementById("balance").classList.remove("hidden");
			selectBalance = true;
			document.getElementById("boton-balance").style.display = "flex";
			document.getElementById("boton-categorias").style.display = "flex";
			document.getElementById("boton-reportes").style.display = "flex";
			if (window.innerWidth < 768)
				document.getElementById("boton-hamburguesa").classList.remove("hidden");
			limpiarFormulario();
		});
};

const renderizarBalance = (datosPorRenderizar) => {
	if (datosPorRenderizar.length != 0) {
		document.getElementById("con-operaciones").classList.remove("hidden");
		document.getElementById("sin-operaciones").classList.add("hidden");
		const tabla = document.getElementById("small-operaciones");
		tabla.classList.remove("hidden");
		tabla.innerHTML = "";
		for (let i = 0; i < datosPorRenderizar.length; i++) {
			console.log("hola");
			tabla.innerHTML += `<div class="flex flex-row items-center justify-between pb-3 text-sm sm:text-base mx-3">
				<div class="w-1/3 sm:w-1/5 text-left overflow-hidden">
					${datosPorRenderizar[i].description}
				</div>
				<div class="sm:w-1/4 hidden sm:inline-block">
					${datosPorRenderizar[i].category}
				</div>
				<div class="sm:w-1/7 hidden sm:inline-block text-right">
					${datosPorRenderizar[i].date}
				</div>
				<div class="w-1/3 sm:w-1/6 text-right cantidad">
					${datosPorRenderizar[i].amount}
				</div>
				<div class="w-auto sm:w-1/6 text-right ml-1 md:ml-3">
					<button id="${datosPorRenderizar[i].id}EditaBal" title="presione aqui para editar" class="editarOp bg-white p-1 rounded-md text-blue-500 font-bold hover:text-gray-400">
						<i class="fa-solid fa-pencil w-5"></i>
					</button>
					<button id="${datosPorRenderizar[i].id}BorraBal" title="presione aqui para borrar" class="borrarOp bg-white p-1 rounded-md text-rose-900 font-bold hover:text-gray-400">
						<i class="fa-solid fa-trash w-5"></i>
					</button>
				</div>
				</div>`;
		}
		const entradas = document.querySelectorAll(".cantidad");
		for (let i = 0; i < entradas.length; i++)
			if (parseInt(entradas[i].innerHTML) < 0)
				entradas[i].classList.add("text-red-500");
			else entradas[i].classList.add("text-green-500");
	} else {
		document.getElementById("con-operaciones").classList.add("hidden");
		document.getElementById("sin-operaciones").classList.remove("hidden");
		const tabla = document.getElementById("small-operaciones");
		tabla.classList.add("hidden");
		tabla.innerHTML = "";
	}

	const borrarOperacion = document.getElementsByClassName("borrarOp");
	let identificacion = undefined;
	for (let i = 0; i < borrarOperacion.length; i++) {
		borrarOperacion[i].addEventListener("click", (e) => {
			identificacion = borrarOperacion[i].id.slice(0, -8);
			crearModal(
				"Estás seguro de querer eliminar?",
				"Si, quiero",
				"No quiero",
				identificacion
			);
		});
	}

	const editOperacion = document.getElementsByClassName("editarOp");
	let identOperacion = undefined;
	for (let i = 0; i < editOperacion.length; i++) {
		editOperacion[i].addEventListener("click", (e) => {
			identOperacion = editOperacion[i].id.slice(0, -8);
			editarOperacion(identOperacion);
		});
	}
};

const limpiarFormulario = () => {
	$("#descripcion-entrada").value = "";
	$("#cantidad-entrada").value = 0;
	$("#fecha-entrada").value = "";
};

const renderizarCategorias = (categoriasAlmacenadas) => {
	const tabla = document.getElementById("lista-de-categorias");
	tabla.innerHTML = "";
	for (let i = 0; i < categoriasAlmacenadas.length; i++) {
		tabla.innerHTML += `<div class="flex flex-row w-full justify-between items-center">
							<div class="w-full">
								<span class="bg-blue-200 rounded-md">${categoriasAlmacenadas[i].name}</span>
							</div>
							<div class="flex flex-row w-full gap-5 justify-end">
								<button
									id="${categoriasAlmacenadas[i].id}EditaCat"
									title="presione aqui para editar"
									class="editarCat bg-white p-1 rounded-md text-blue-500 font-bold hover:text-gray-400"
								>
									<i class="fa-solid fa-pencil w-5"></i>
								</button>
								<button
									id="${categoriasAlmacenadas[i].id}BorraCat"
									title="presione aqui para borrar"
									class="borrarCat bg-white p-1 rounded-md text-rose-900 font-bold hover:text-gray-400"
								>
									<i class="fa-solid fa-trash w-5"></i>
								</button>
							</div>
						</div>`;
	}

	const borrarCategoria = document.getElementsByClassName("borrarCat"); //manejador de evento boton borrar
	for (let i = 0; i < borrarCategoria.length; i++) {
		borrarCategoria[i].addEventListener("click", (e) => {
			let identificacion = borrarCategoria[i].id.slice(0, -8);
			const temporal = descargarStorage();
			let indiceARemover = temporal.categorias.findIndex(
				(categoria) => categoria.id === identificacion
			);
			let contador = 0;
			for (let j = 0; j < temporal.operaciones.length; j++) {
				if (
					temporal.operaciones[j].category ===
					temporal.categorias[indiceARemover].name
				)
					contador += 1;
			}

			if (contador === 0) {
				const categoriaRemovida = temporal.categorias.splice(indiceARemover, 1);
			} else
				crearModal(
					"No puedes eliminar esta categoria porque esta en uso",
					"Volver",
					0,
					0
				);
			subirDatos("", temporal);
			renderizarCategorias(descargarStorage().categorias);
			desplegableCategorias();
		});
	}
};

const agregarCategoria = () => {
	const datosAlmacenados = descargarStorage();
	const categoriaNueva = {
		id: self.crypto.randomUUID(),
		name: $("#categoria-sumada").value,
	};
	if (categoriaNueva.name != "") {
		datosAlmacenados.categorias.push(categoriaNueva);
		subirDatos("", datosAlmacenados);
		renderizarCategorias(descargarStorage().categorias);
		$("#categoria-sumada").value = "";
		desplegableCategorias();
	}
};

const calcularReportes = (vector) => {
	document.getElementById("detalle-categorias").innerHTML = ``;
	document.getElementById("detalle-mes").innerHTML = ``;
	const porCategorias = [];
	const porMes = [];
	const sumatoriasCategorias = [];
	const sumatoriasMes = [];
	const meses = [
		"Nan",
		"Enero",
		"Febrero",
		"Marzo",
		"Abril",
		"Mayo",
		"Junio",
		"Julio",
		"Agosto",
		"Setiembre",
		"Octubre",
		"Noviembre",
		"Diciembre",
	];
	let acumuladorGasto = 0;
	let acumuladorGan = 0;
	let acumuladorMesGan = 0;
	let acumuladorMesGasto = 0;

	//-----Generacion de un vector en que cada elemento es otro vector cuyos elementos son operaciones de la misma categoria-----
	for (let i = 0; i < vector.categorias.length; i++) {
		porCategorias[i] = [];
		for (let j = 0; j < vector.operaciones.length; j++) {
			if (vector.categorias[i].name === vector.operaciones[j].category)
				porCategorias[i].push(vector.operaciones[j]);
			else
				porCategorias[i].push({
					id: self.crypto.randomUUID(),
					description: "",
					amount: "",
					type: "",
					category: vector.categorias[i].name,
					date: "",
				});
		}
	}
	console.log(porCategorias);
	//-----Generacion de un vector unidimensional en que cada elemento es un objeto con nombre de categoria y balances de la misma
	for (let i = 0; i < porCategorias.length; i++) {
		let flag = 0;
		for (let j = 0; j < porCategorias[i].length; j++) {
			if (porCategorias[i][j].amount != "") {
				porCategorias[i][j].type === "Ganancia"
					? (acumuladorGan += porCategorias[i][j].amount)
					: (acumuladorGan += 0);

				porCategorias[i][j].type === "Gasto"
					? (acumuladorGasto += porCategorias[i][j].amount)
					: (acumuladorGasto += 0);
				flag += 1;
			}
		}
		if (flag != 0) {
			//evitando cargar categorias sin operaciones asociadas
			sumatoriasCategorias.push({
				ganancia: acumuladorGan,
				gasto: acumuladorGasto,
				valor: acumuladorGan + acumuladorGasto,
				nombre: porCategorias[i][0].category,
			});
		}
		acumuladorGan = 0;
		acumuladorGasto = 0;
	}

	//-----Ordenamiento del vector creado en funcion del valor (con signo) de los balances de mayor a menor
	sumatoriasCategorias.sort((a, b) => {
		return b.valor - a.valor;
	});
	console.log(sumatoriasCategorias);

	//-----Generacion de un vector en que cada elemento es otro vector cuyos elementos son operaciones del mismo mes-----
	for (let i = 1; i < 13; i++) {
		porMes[i - 1] = [];
		for (let j = 0; j < vector.operaciones.length; j++) {
			if (i === parseInt(vector.operaciones[j].date.substring(5, 7))) {
				console.log(vector.operaciones[j].date);
				console.log(vector.operaciones[j].date.substring(5, 7));
				porMes[i - 1].push(vector.operaciones[j]);
			}
		}
	}
	//-----Generacion de un vector unidimensional en que cada elemento es un objeto con meses de operaciones y balance de los mismos
	for (let i = 0; i < 12; i++) {
		for (let j = 0; j < porMes[i].length; j++) {
			porMes[i][j].type === "Ganancia"
				? (acumuladorMesGan += porMes[i][j].amount)
				: (acumuladorMesGan += 0);

			porMes[i][j].type === "Gasto"
				? (acumuladorMesGasto += porMes[i][j].amount)
				: (acumuladorMesGasto += 0);
		}
		if (porMes[i].length != 0)
			sumatoriasMes.push({
				ganancia: acumuladorMesGan,
				gasto: acumuladorMesGasto,
				valor: acumuladorMesGan + acumuladorMesGasto,
				nombre: i + 1,
			});
		acumuladorMesGan = 0;
		acumuladorMesGasto = 0;
	}
	//-----Ordenamiento del vector creado en funcion del valor (con signo) de los balances de mayor a menor
	sumatoriasMes.sort((a, b) => {
		return b.valor - a.valor;
	});
	console.log(porMes, sumatoriasMes);

	//------Inyeccion de los balances calculados en el HTML--------------
	let lastIndex = sumatoriasCategorias.length - 1;
	let lastIndexMes = sumatoriasMes.length - 1;
	if (sumatoriasCategorias[0].valor >= 0)
		document.getElementById(
			"categorias-top"
		).innerHTML = `<div class="flex flex-row items-center pb-3">
	<div class="w-1/2">Categoria con mayor ganancia</div>
	<div class="w-1/4 text-right"><span class="resumen-1 bg-blue-200 rounded-md">${sumatoriasCategorias[0].nombre}</span></div>
	<div class="w-1/4 text-right text-green-500">${sumatoriasCategorias[0].valor}</div></div>`;
	else document.getElementById("categorias-top").innerHTML = ``;

	if (sumatoriasCategorias[lastIndex].valor <= 0)
		document.getElementById(
			"categorias-bottom"
		).innerHTML = `<div class="flex flex-row items-center pb-3">
	<div class="w-1/2">Categoria con mayor gasto</div>
	<div class="w-1/4 text-right"><span class="resumen-1 bg-blue-200 rounded-md">${sumatoriasCategorias[lastIndex].nombre}</span></div>
	<div class="w-1/4 text-right text-red-500">${sumatoriasCategorias[lastIndex].valor}</div></div>`;
	else document.getElementById("categorias-bottom").innerHTML = ``;

	if (
		sumatoriasCategorias[lastIndex].valor != 0 ||
		sumatoriasCategorias[0].valor != 0
	)
		document.getElementById(
			"categoria-mayor"
		).innerHTML = `<div class="flex flex-row items-center pb-3">
	<div class="w-1/2">Categoria con mayor balance</div>
	<div class="w-1/4 text-right"><span class="resumen-1 bg-blue-200 rounded-md">${
		sumatoriasCategorias[0].valor >
		Math.sqrt(
			sumatoriasCategorias[lastIndex].valor *
				sumatoriasCategorias[lastIndex].valor
		)
			? sumatoriasCategorias[0].nombre
			: sumatoriasCategorias[lastIndex].nombre
	}</span></div>
	<div class="w-1/4 text-right text-gray-500">${
		sumatoriasCategorias[0].valor >
		Math.sqrt(
			sumatoriasCategorias[lastIndex].valor *
				sumatoriasCategorias[lastIndex].valor
		)
			? sumatoriasCategorias[0].valor
			: sumatoriasCategorias[lastIndex].valor
	}</div></div>`;
	else document.getElementById("categoria-mayor").innerHTML = ``;

	if (sumatoriasMes[0].valor >= 0)
		document.getElementById(
			"categorias-top-mes"
		).innerHTML = `<div class="flex flex-row items-center pb-3">
	<div class="w-1/2">Mes con mayor ganancia</div>
	<div class="w-1/4 text-right">${meses[parseInt(sumatoriasMes[0].nombre)]}</div>
	<div class="w-1/4 text-right text-green-500">${
		sumatoriasMes[0].valor
	}</div></div>`;
	else document.getElementById("categorias-top-mes").innerHTML = ``;

	if (sumatoriasMes[lastIndexMes].valor <= 0)
		document.getElementById(
			"categorias-bottom-mes"
		).innerHTML = `<div class="flex flex-row items-center pb-3">
	<div class="w-1/2">Mes con mayor gasto</div>
	<div class="w-1/4 text-right">${
		meses[parseInt(sumatoriasMes[lastIndexMes].nombre)]
	}</div>
	<div class="w-1/4 text-right text-red-500">${
		sumatoriasMes[lastIndexMes].valor
	}</div></div>`;
	else document.getElementById("categorias-bottom-mes").innerHTML = ``;

	for (let i = 0; i < sumatoriasCategorias.length; i++)
		document.getElementById(
			"detalle-categorias"
		).innerHTML += `<div class="flex flex-row items-center pb-3"> <div class="w-1/4"><span class="resumen-1 bg-blue-200 rounded-md">${sumatoriasCategorias[i].nombre}</span></div>
						<div class="w-1/4 text-green-500 text-right">${sumatoriasCategorias[i].ganancia}</div>
						<div class="w-1/4 text-red-500 text-right">${sumatoriasCategorias[i].gasto}</div>
						<div class="w-1/4 text-gray-500 text-right">${sumatoriasCategorias[i].valor}</div></div>`;

	sumatoriasMes.sort((a, b) => {
		return a.nombre - b.nombre;
	});
	for (let i = 0; i < sumatoriasMes.length; i++)
		document.getElementById(
			"detalle-mes"
		).innerHTML += `<div class="flex flex-row items-center pb-3">
									<div class="w-1/4">${meses[parseInt(sumatoriasMes[i].nombre)]}</div>
									<div class="w-1/4 text-green-500 text-right">${sumatoriasMes[i].ganancia}</div>
									<div class="w-1/4 text-red-500 text-right">${sumatoriasMes[i].gasto}</div>
									<div class="w-1/4 text-gray-500 text-right">${sumatoriasMes[i].valor}</div>
								</div>`;
};

//----------------------------------------- Boton Borrar----------------------------------------

//console.log("tontisima");

/* {
			const operacionesAlmacenadas = descargarStorage().operaciones;
			for (let i = 0; i < operacionesAlmacenadas.length; i++) {
				if (operacionesAlmacenadas[i].id === identificacion.slice(0, -8)) {

					 let indiceARemover = operacionesAlmacenadas.operaciones.findIndex(
						(operacion) => operacion.id === identificacion
					); 
				}
				const operacionRemovida = operacionesAlmacenadas.operaciones.splice(
					indiceARemover,
					1
				);
			}
			subirDatos("", operacionesAlmacenadas);
			renderizarBalance(descargarStorage().operaciones);
		} */
