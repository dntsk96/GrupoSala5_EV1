// Array de productos del catálogo
var productos = [
    {nombre: "Aceite Sintético 5W-30", categoria: "aceites", marca: "Mobil 1", precio: 45, stock: 25},
    {nombre: "Aceite Semi-Sintético 10W-40", categoria: "aceites", marca: "Castrol", precio: 32, stock: 40},
    {nombre: "Aceite Mineral 20W-50", categoria: "aceites", marca: "Shell", precio: 28, stock: 15},
    {nombre: "Líquido de Frenos DOT 4", categoria: "frenos", marca: "Bosch", precio: 18, stock: 50},
    {nombre: "Pastillas de Freno Delanteras", categoria: "frenos", marca: "Brembo", precio: 120, stock: 12},
    {nombre: "Disco de Freno Ventilado", categoria: "frenos", marca: "TRW", precio: 85, stock: 8},
    {nombre: "Filtro de Aceite", categoria: "filtros", marca: "Mann", precio: 15, stock: 60},
    {nombre: "Filtro de Aire", categoria: "filtros", marca: "K&N", precio: 35, stock: 30},
    {nombre: "Filtro de Combustible", categoria: "filtros", marca: "Bosch", precio: 22, stock: 45},
    {nombre: "Filtro de Cabina", categoria: "filtros", marca: "Fram", precio: 18, stock: 35},
    {nombre: "Batería 60Ah", categoria: "baterias", marca: "Varta", precio: 180, stock: 10},
    {nombre: "Batería 75Ah AGM", categoria: "baterias", marca: "Bosch", precio: 280, stock: 6},
    {nombre: "Bujías Iridium", categoria: "motor", marca: "NGK", precio: 12, stock: 100},
    {nombre: "Kit de Distribución", categoria: "motor", marca: "Gates", precio: 220, stock: 5},
    {nombre: "Termostato", categoria: "motor", marca: "Mahle", precio: 45, stock: 20}
];

var filtroActual = "todos";

// Dibuja la tabla - DOM + bucles
function generarTabla(lista) {
    var tbody = document.getElementById('tablaPrecios');
    var sinResultados = document.getElementById('sin-resultados');
    tbody.innerHTML = "";

    if (lista.length === 0) {
        sinResultados.style.display = "block";
        return;
    }
    sinResultados.style.display = "none";

    for (var i = 0; i < lista.length; i++) {
        var fila = document.createElement('tr');
        var stockColor = lista[i].stock > 10? '#10B981' : lista[i].stock > 0? '#F59E0B' : '#EF4444';
        var stockTexto = lista[i].stock > 0? lista[i].stock + ' unid.' : 'Agotado';

        fila.innerHTML = `
            <td>${lista[i].nombre}</td>
            <td><span class="badge-cat">${lista[i].categoria}</span></td>
            <td>${lista[i].marca}</td>
            <td><strong>S/ ${lista[i].precio}</strong></td>
            <td><span style="color:${stockColor}; font-weight:600;">${stockTexto}</span></td>
            <td>
                <button class="btn-cotizar" onclick="cotizar('${lista[i].nombre}')" ${lista[i].stock === 0? 'disabled' : ''}>
                    <i class="fa-solid fa-cart-plus"></i> Cotizar
                </button>
            </td>
        `;
        tbody.appendChild(fila);
    }
}

// Búsqueda + Filtros - Condicionales + operadores lógicos
function filtrarProductos() {
    var texto = document.getElementById('buscador').value.toLowerCase();
    var filtrados = [];

    for (var i = 0; i < productos.length; i++) {
        var coincideTexto = productos[i].nombre.toLowerCase().indexOf(texto)!== -1 ||
                           productos[i].marca.toLowerCase().indexOf(texto)!== -1 ||
                           productos[i].categoria.toLowerCase().indexOf(texto)!== -1;

        var coincideCategoria = filtroActual === "todos" || productos[i].categoria === filtroActual;

        if (coincideTexto && coincideCategoria) {
            filtrados.push(productos[i]);
        }
    }
    generarTabla(filtrados);
}

// Función cotizar
function cotizar(nombreProducto) {
    alert('Producto agregado: ' + nombreProducto + '\nPronto te contactaremos con la cotización.');
}

// Eventos
window.addEventListener('load', function() {
    generarTabla(productos);

    // Buscador
    document.getElementById('buscador').addEventListener('keyup', filtrarProductos);

    // Botones de filtro
    var btnsFiltro = document.querySelectorAll('.filtro-btn');
    btnsFiltro.forEach(function(btn) {
        btn.addEventListener('click', function() {
            btnsFiltro.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtroActual = this.getAttribute('data-categoria');
            filtrarProductos();
        });
    });
});