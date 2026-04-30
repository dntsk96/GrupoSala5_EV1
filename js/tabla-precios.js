// Array de objetos - Semana 6: Manipula objetos
var servicios = [
    {nombre: "Mantenimiento Preventivo", desc: "Revisión 20 puntos + fluidos", precio: 80, tiempo: "2 horas"},
    {nombre: "Reparación de Motor", desc: "Diagnóstico computarizado y reparación", precio: 350, tiempo: "1-3 días"},
    {nombre: "Sistema Eléctrico", desc: "Batería, alternador, luces, arranque", precio: 120, tiempo: "3 horas"},
    {nombre: "Sistema de Frenos", desc: "Pastillas, discos, líquido de frenos", precio: 150, tiempo: "2 horas"},
    {nombre: "Cambio de Aceite", desc: "Aceite sintético + filtro", precio: 60, tiempo: "30 min"},
    {nombre: "Alineamiento y Balanceo", desc: "Dirección y balanceo de ruedas", precio: 70, tiempo: "1 hora"},
    {nombre: "Diagnóstico Scanner", desc: "Lectura de códigos de falla", precio: 50, tiempo: "45 min"}
];

// Función para generar tabla - Rúbrica: Funciones
function generarTabla(lista) {
    var tbody = document.getElementById('tablaPrecios');
    tbody.innerHTML = ""; // Limpia tabla

    // Bucle FOR - Rúbrica: Diseña bucles
    for (var i = 0; i < lista.length; i++) {
        var fila = document.createElement('tr'); // createElement - Semana 5

        // Operadores y concatenación de strings
        fila.innerHTML = "<td style='padding:8px;'>" + lista[i].nombre + "</td>" +
                         "<td style='padding:8px;'>" + lista[i].desc + "</td>" +
                         "<td style='padding:8px;'>S/ " + lista[i].precio + "</td>" +
                         "<td style='padding:8px;'>" + lista[i].tiempo + "</td>";

        tbody.appendChild(fila); // appendChild - Manipula DOM
    }
}

// Función de búsqueda - Condicionales + lógica
function buscarServicio() {
    var texto = document.getElementById('buscador').value.toLowerCase();
    var filtrados = [];

    // Bucle + condicional + operador lógico ||
    for (var i = 0; i < servicios.length; i++) {
        if (servicios[i].nombre.toLowerCase().indexOf(texto)!= -1 ||
            servicios[i].desc.toLowerCase().indexOf(texto)!= -1) {
            filtrados.push(servicios[i]); // Método de array
        }
    generarTabla(filtrados);
}

// Evento al cargar página
window.addEventListener('load', function() {
    generarTabla(servicios); // Carga tabla inicial
});

// Evento en buscador
document.getElementById('buscador').addEventListener('keyup', buscarServicio);