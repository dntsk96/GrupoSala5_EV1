// Array de objetos - Semana 6
var listaServicios = [];

function calcularCotizacion() {
    // Variables - Fundamentos JS
    var checkboxes = document.getElementsByClassName('servicio');
    var total = 0;
    var serviciosSeleccionados = []; // Array vacío

    // Bucle FOR - Rúbrica: Diseña bucles
    for (var i = 0; i < checkboxes.length; i++) {
        // Condicional IF - Rúbrica: Diseña condicionales
        if (checkboxes[i].checked == true) {
            // Operadores - Rúbrica: Trabaja con operadores
            var precio = parseInt(checkboxes[i].getAttribute('data-precio'));
            total = total + precio; // Operador +

            // Manipulación de strings y objetos
            var nombreServicio = checkboxes[i].parentElement.textContent;
            serviciosSeleccionados.push(nombreServicio); // Método de array
        }
    }

    // Condicional para validar - Rúbrica: lógica
    if (total == 0) {
        alert("Selecciona al menos un servicio");
        return;
    }

    // Manipulación DOM con innerHTML - Semana 5
    var divResultado = document.getElementById('resultado');
    var divDetalle = document.getElementById('detalleServicios');
    var h3Total = document.getElementById('totalPagar');

    divResultado.style.display = 'block'; // Muestra el div

    // Bucle para mostrar detalle
    var htmlDetalle = "<ul>";
    for (var j = 0; j < serviciosSeleccionados.length; j++) {
        htmlDetalle = htmlDetalle + "<li>" + serviciosSeleccionados[j] + "</li>";
    }
    htmlDetalle = htmlDetalle + "</ul>";

    divDetalle.innerHTML = htmlDetalle; // innerHTML - Rúbrica: Manipula valores
    h3Total.innerHTML = "Total a pagar: S/ " + total; // Operador + con string
}

// Función para limpiar - Rúbrica: Trabaja con funciones
function limpiarCotizacion() {
    var checkboxes = document.getElementsByClassName('servicio');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    document.getElementById('resultado').style.display = 'none';
}

// Eventos - Semana 5: addEventListener
document.getElementById('btnCalcular').addEventListener('click', calcularCotizacion);
document.getElementById('btnLimpiar').addEventListener('click', limpiarCotizacion);