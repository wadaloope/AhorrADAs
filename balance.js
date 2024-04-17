//------------------------------Calculo de resumen de balance esquina superior izquierda---------------------------------------
const generarBalance = (vector) => {
	let displaySumador = document.getElementById("sumador-ganancia");
	let displayResta = document.getElementById("sumador-gasto");
	let displaysumaTotal = document.getElementById("sumador-total");
	if (vector.length != 0) {
		let contadorGastos = 0;
		let contadorGanancias = 0;
		let contadorTotal = 0;
		for (let i = 0; i < vector.length; i++) {
			if (vector[i].type === "Gasto") {
				contadorGastos += vector[i].amount;
			} else {
				contadorGanancias += vector[i].amount;
			}
			contadorTotal += vector[i].amount;
		}
		displaySumador.innerHTML = `+$${contadorGanancias}`;
		//-Nota: cada vez que aparece una raiz cuadrada las he puesto para sacar el signo negativo del dato del medio, sino imprime "-$-63300"
		displayResta.innerHTML = `-$${Math.sqrt(contadorGastos * contadorGastos)}`;
		displaysumaTotal.innerHTML = `${contadorTotal < 0 ? "-" : "+"}$${Math.sqrt(
			contadorTotal * contadorTotal
		)}`;
	} else {
		displaySumador.innerHTML = "+$0";
		displayResta.innerHTML = "-$0";
		displaysumaTotal.innerHTML = "$0";
	}
};

//----------------------Debi posicionar aqui estas funciones porque no me estaban respondiendo en los demas js-------------------
//------------------------------Eliminacion de una operacion en la renderizacion y en el local storage----------------------------
const eliminarReg = (identificacion) => {
	console.log("eliminacion de registro oficial");
	let indiceARemover = undefined;
	const operacionesAlmacenadas = descargarStorage();
	for (let i = 0; i < operacionesAlmacenadas.operaciones.length; i++) {
		if (operacionesAlmacenadas.operaciones[i].id === identificacion) {
			indiceARemover = i;
			console.log("lo encontre", i);
		}
	}
	if (indiceARemover != undefined) {
		const operacionRemovida = operacionesAlmacenadas.operaciones.splice(
			indiceARemover,
			1
		);
		console.log(indiceARemover, operacionRemovida);
		subirDatos("", operacionesAlmacenadas);
		generarBalance(descargarStorage().operaciones);
		renderizarBalance(descargarStorage().operaciones);
	}
};

//----------------------------------------Creacion de una ventana modal reutilizable-------------------------------------------
const crearModal = (pregunta, rta1, rta2, nickname) => {
	document.getElementById("ventana-modal").classList.remove("hidden");
	document.getElementById("contenido-modal").innerHTML = `${pregunta}`;
	document.getElementById("aceptacion").innerHTML = `${rta1}`;
	if (rta2 != 0) {
		document.getElementById("cancelacion").classList.remove("hidden");
		document.getElementById("cancelacion").innerHTML = `${rta2}`;
	}

	document.getElementById("cancelacion").addEventListener("click", (e) => {
		document.getElementById("cancelacion").classList.add("hidden");
		document.getElementById("ventana-modal").classList.add("hidden");
		return false;
	});

	document.getElementById("aceptacion").addEventListener("click", (e) => {
		document.getElementById("cancelacion").classList.add("hidden");
		document.getElementById("ventana-modal").classList.add("hidden");
		if (rta2 != 0) eliminarReg(nickname);
	});
};
