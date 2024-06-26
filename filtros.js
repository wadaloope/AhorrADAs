const filtrosElegidos = document.getElementsByClassName("seleccion");
for (let i = 0; i < filtrosElegidos.length; i++)
	filtrosElegidos[i].addEventListener("change", (e) => {
		filtrado(
			filtrosElegidos[0].value,
			filtrosElegidos[1].value,
			filtrosElegidos[2].valueAsNumber,
			filtrosElegidos[3].valueAsNumber,
			filtrosElegidos[4].value
		);
	});

const filtrado = (
	tipoOper,
	categoriaOper,
	fechaDesde,
	fechaHasta,
	ordenarOper
) => {
	const vectorFiltrado = [];
	const vector_sinFiltrar = descargarStorage();
	const vectorOperaciones = vector_sinFiltrar.operaciones;
	for (let i = 0; i < vectorOperaciones.length; i++) {
		const fechaAlmacenada = Date.parse(vectorOperaciones[i].date);
		if (!(isNaN(fechaDesde) && isNaN(fechaHasta))) {
			if (
				(vectorOperaciones[i].type == tipoOper || tipoOper == "Todos") &&
				(vectorOperaciones[i].category == categoriaOper ||
					categoriaOper === "Todas") &&
				((fechaAlmacenada >= fechaDesde && fechaAlmacenada <= fechaHasta) ||
					(isNaN(fechaHasta) && fechaAlmacenada >= fechaDesde) ||
					(isNaN(fechaDesde) && fechaAlmacenada <= fechaHasta))
			)
				vectorFiltrado.push(vectorOperaciones[i]);
		} else if (
			(vectorOperaciones[i].type == tipoOper || tipoOper == "Todos") &&
			(vectorOperaciones[i].category == categoriaOper ||
				categoriaOper === "Todas")
		)
			vectorFiltrado.push(vectorOperaciones[i]);
	}
	//---------------------------------Seleccion de orden--------------------------------
	switch (ordenarOper) {
		case "mas-recientes":
			vectorFiltrado.sort((a, b) => {
				return Date.parse(b.date) - Date.parse(a.date);
			});
			break;
		case "menos-recientes":
			vectorFiltrado.sort((a, b) => {
				return Date.parse(a.date) - Date.parse(b.date);
			});
			break;
		case "mayor-monto":
			vectorFiltrado.sort((a, b) => {
				return Math.sqrt(b.amount * b.amount) - Math.sqrt(a.amount * a.amount);
			});
			break;
		case "menor-monto":
			vectorFiltrado.sort((a, b) => {
				return Math.sqrt(a.amount * a.amount) - Math.sqrt(b.amount * b.amount);
			});
			break;
		case "a/z":
			vectorFiltrado.sort((a, b) => {
				if (a.description < b.description) return -1;
				if (a.description > b.description) return 1;
				return 0;
			});
			break;
		case "z/a":
			vectorFiltrado.sort((a, b) => {
				if (a.description > b.description) return -1;
				if (a.description < b.description) return 1;
				return 0;
			});
			break;
	}
	renderizarBalance(vectorFiltrado);
	generarBalance(vectorFiltrado);
};

//el resultado de este filtrado no debe regresar al local storage ya que estamos filtrando para visualizar el dato desde diferentes criterios, no para modificarlo
