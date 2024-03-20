const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

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
const operaciones = JSON.parse(localStorage.getItem("")).categorias || [];
console.log(operaciones);
const agregarOperacion = () => {
	let operation = {
		id: self.crypto.randomUUID(),
		description: $("#descripcion-entrada").value, //descripcionEntrada
		amount: Number($("#cantidad-entrada").value),
		type: $("#tipo-operacion").value,
		category: $("#seleccion-categoria").value,
		date: $("#fecha-entrada").value.replace(/-/g, "/"), //generar la variable
	};

	console.log(operation);
	operaciones = [operaciones, operation];
	console.log(operaciones);
	subirDatos("operaciones", operaciones);
	mostrarOperaciones(operaciones);
};
