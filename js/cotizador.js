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
            var nombre = checkboxes[i].getAttribute('data-nombre'); // Nuevo: usar data-nombre
            total = total + precio; // Operador +

            // Guardar objeto con nombre y precio
            serviciosSeleccionados.push({
                nombre: nombre,
                precio: precio
            });
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

    // Bucle para mostrar detalle con precios
    var htmlDetalle = "";
    for (var j = 0; j < serviciosSeleccionados.length; j++) {
        htmlDetalle += `
            <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #D1FAE5;">
                <span>${serviciosSeleccionados[j].nombre}</span>
                <strong>S/ ${serviciosSeleccionados[j].precio}</strong>
            </div>
        `;
    }

    divDetalle.innerHTML = htmlDetalle; // innerHTML - Rúbrica: Manipula valores
    h3Total.innerHTML = `S/ ${total}`; // Operador + con string

    // Guardar en localStorage para usar en el form de contacto
    localStorage.setItem('cotizacion_servicios', JSON.stringify(serviciosSeleccionados));
    localStorage.setItem('cotizacion_total', total);
}

// Función para limpiar - Rúbrica: Trabaja con funciones
function limpiarCotizacion() {
    var checkboxes = document.getElementsByClassName('servicio');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    document.getElementById('resultado').style.display = 'none';

    // Limpiar localStorage
    localStorage.removeItem('cotizacion_servicios');
    localStorage.removeItem('cotizacion_total');
}

// Eventos - Semana 5: addEventListener
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btnCalcular').addEventListener('click', calcularCotizacion);
    document.getElementById('btnLimpiar').addEventListener('click', limpiarCotizacion);

    // Si viene de "Agendar Cita", pre-llenar el mensaje en index.html#contacto
    var cotizacionGuardada = localStorage.getItem('cotizacion_servicios');
    if (cotizacionGuardada && window.location.pathname.includes('index.html')) {
        var servicios = JSON.parse(cotizacionGuardada);
        var total = localStorage.getItem('cotizacion_total');
        var mensaje = `Hola, quiero cotizar los siguientes servicios:\n\n`;
        servicios.forEach(function(s) {
            mensaje += `• ${s.nombre} - S/ ${s.precio}\n`;
        });
        mensaje += `\nTotal estimado: S/ ${total}`;

        var textareaMensaje = document.getElementById('mensaje');
        if (textareaMensaje) {
            textareaMensaje.value = mensaje;
        }
    }
});