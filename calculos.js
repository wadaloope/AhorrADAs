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
	//windows.localStorage.setItem("", JSON.stringify(objeto));
	localStorage.setItem(``, JSON.stringify(objeto));
};
const traerStorage = () => {
	return JSON.parse(localStorage.getItem("")) || [];
};
//console.log(operaciones);
const agregarOperacion = () => {
	let operacion = {
		id: self.crypto.randomUUID(),
		description: $("#descripcion-entrada").value, //descripcionEntrada
		amount: Number($("#cantidad-entrada").value),
		type: $("#tipo-operacion").value,
		category: $("#seleccion-categoria").value,
		date: $("#fecha-entrada").value.replace(/-/g, "/"), //generar la variable
	};

	//console.log(operation);
	//operaciones = [operaciones, operation];
	const descargaStorage = traerStorage();
	descargaStorage.operaciones.push(operacion);
	console.log(descargaStorage);
	subirDatos("", descargaStorage);
	//mostrarOperaciones(operaciones);
};

const completarTabla = () => {
	document.getElementById("con-operaciones").classList.remove("hidden");
	document.getElementById("sin-operaciones").classList.add("hidden");
	let tabla = document.getElementById("small-operaciones");
	const descargaStorage = traerStorage().operaciones;
	console.log(descargaStorage);
	for (let i = 0; i < descargaStorage.lenght; i++) {
		tabla.innerHTML += `<div class="w-1/4">${descargaStorage.description}</div>
							<div class="w-1/4">${descargaStorage.category}</div>
							<div class="w-1/6 text-right">${descargaStorage.date}</div>
							<div class="w-1/6 text-right">${descargaStorage.amount}</div>
							<div class="w-1/6 text-right"><button title="presione aqui para editar" class="editar bg-white p-1 rounded-md text-blue-500 font-bold hover:text-gray-400">
									<i class="fa-solid fa-pencil w-5"></i>
								</button>
								<button title="presione aqui para borrar" class="borrar bg-white p-1 rounded-md text-rose-900 font-bold hover:text-gray-400">
									<i class="fa-solid fa-trash w-5"></i></div>`;
	}
};
