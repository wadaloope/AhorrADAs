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
			if (parseInt(entradas[i].innerHTML) <= 0)
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
