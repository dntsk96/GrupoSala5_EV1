function validarFormulario() {
    // Obtenemos valores con getElementById - Semana 4
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var vehiculo = document.getElementById('vehiculo').value;
    var servicio = document.getElementById('servicio').value;
    
    // Validación campos vacíos - Semana 3
    if (nombre == "") {
        alert("Error: Ingresa tu nombre completo");
        return false;
    }
    
    if (email == "") {
        alert("Error: Ingresa tu correo electrónico");
        return false;
    }
    
    // Validación básica de email
    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        alert("Error: El correo electrónico no es válido");
        return false;
    }
    
    if (telefono == "") {
        alert("Error: Ingresa tu teléfono");
        return false;
    }
    
    if (vehiculo == "") {
        alert("Error: Ingresa marca y modelo del vehículo");
        return false;
    }
    
    if (servicio == "") {
        alert("Error: Selecciona un servicio requerido");
        return false;
    }
    
    // Si todo está bien
    alert("Solicitud enviada correctamente. Nos contactaremos con " + nombre + " pronto.");
    return true;
}