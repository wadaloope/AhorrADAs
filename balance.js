const generarBalance = (vector) => {
	let displaySumador = document.getElementById("sumador-ganancia");
	let displayResta = document.getElementById("sumador-gasto");
	let displaysumaTotal = document.getElementById("sumador-total");
	let contadorGastos = 0;
	let contadorGanancias = 0;
	let contadorTotal = 0;
	console.log(vector);
	for (let i = 0; i < vector.length; i++) {
		if (vector[i].type === "Gasto") {
			contadorGastos += vector[i].amount;
		} else {
			contadorGanancias += vector[i].amount;
		}
		contadorTotal += vector[i].amount;
	}
	displaySumador.innerHTML = `${contadorGanancias}`;
	displayResta.innerHTML = `${contadorGastos}`;
	displaysumaTotal.innerHTML = `${contadorTotal}`;
	console.log(`suma de gastos: ${contadorGastos}, suma ganancias: ${contadorGanancias}, suma total: ${contadorTotal}`);
};
