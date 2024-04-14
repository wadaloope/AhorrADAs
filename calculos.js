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
		alert("Verifique haber ingresado todos los datos");
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

const renderizarBalance = (datosPorRenderizar) => {
	if (datosPorRenderizar != "") {
		document.getElementById("con-operaciones").classList.remove("hidden");
		document.getElementById("sin-operaciones").classList.add("hidden");
		const tabla = document.getElementById("small-operaciones");
		tabla.classList.remove("hidden");
		tabla.innerHTML = "";
		for (let i = 0; i < datosPorRenderizar.length; i++) {
			console.log("hola");
			tabla.innerHTML += `<div class="flex flex-row items-center pb-3">
				<div class="w-1/4">
					${datosPorRenderizar[i].description}
				</div>
				<div class="w-1/4">
					${datosPorRenderizar[i].category}
				</div>
				<div class="w-1/6 text-right">
					${datosPorRenderizar[i].date}
				</div>
				<div class="w-1/6 text-right cantidad">
					${datosPorRenderizar[i].amount}
				</div>
				<div class="w-1/6 text-right">
					<button id="${datosPorRenderizar[i].id}EditaBal" title="presione aqui para editar" class="editar bg-white p-1 rounded-md text-blue-500 font-bold hover:text-gray-400">
						<i class="fa-solid fa-pencil w-5"></i>
					</button>
					<button id="${datosPorRenderizar[i].id}BorraBal" title="presione aqui para borrar" class="borrar bg-white p-1 rounded-md text-rose-900 font-bold hover:text-gray-400">
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
			} else alert("no puedes eliminar esta categoria porque esta en uso");
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
		}
	}

	//-----Generacion de un vector unidimensional en que cada elemento es un objeto con nombre de categoria y balances de la misma
	for (let i = 0; i < porCategorias.length; i++) {
		for (let j = 0; j < porCategorias[i].length; j++) {
			porCategorias[i][j].type === "Ganancia"
				? (acumuladorGan += porCategorias[i][j].amount)
				: (acumuladorGan += 0);

			porCategorias[i][j].type === "Gasto"
				? (acumuladorGasto += porCategorias[i][j].amount)
				: (acumuladorGasto += 0);
		}
		sumatoriasCategorias.push({
			ganancia: acumuladorGan,
			gasto: acumuladorGasto,
			valor: acumuladorGan + acumuladorGasto,
			nombre: porCategorias[i][0].category,
		});
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
