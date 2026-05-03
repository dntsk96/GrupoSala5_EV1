// calidar.js - AA3: Funciones reutilizables con condicionales y operadores lógicos

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {Object} { valido: boolean, error: string }
 */
export function validarEmail(email) {
    if (email === "" || email.trim() === "") {
        return { valido: false, error: "El email es obligatorio" };
    }
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        return { valido: false, error: "El email no es válido" };
    }
    return { valido: true };
}

/**
 * Valida contraseña
 * @param {string} password - Contraseña principal
 * @param {string|null} password2 - Confirmación de contraseña
 * @returns {Object} { valido: boolean, error: string }
 */
export function validarPassword(password, password2 = null) {
    if (password === "") {
        return { valido: false, error: "La contraseña es obligatoria" };
    }
    if (password.length < 6) {
        return { valido: false, error: "Mínimo 6 caracteres" };
    }
    if (password2 !== null && password !== password2) {
        return { valido: false, error: "Las contraseñas no coinciden" };
    }
    return { valido: true };
}

/**
 * Valida nombre completo
 * @param {string} nombre - Nombre a validar
 * @returns {Object} { valido: boolean, error: string }
 */
export function validarNombre(nombre) {
    if (nombre === "" || nombre.trim() === "") {
        return { valido: false, error: "El nombre es obligatorio" };
    }
    if (nombre.trim().length < 3) {
        return { valido: false, error: "Mínimo 3 caracteres" };
    }
    return { valido: true };
}

/**
 * Muestra mensaje de error en el DOM
 * @param {string} elementoId - ID del elemento donde mostrar
 * @param {string} mensaje - Mensaje a mostrar
 */
export function mostrarError(elementoId, mensaje) {
    const el = document.getElementById(elementoId);
    el.textContent = mensaje;
    el.className = 'auth-mensaje error';
}

/**
 * Muestra mensaje de éxito en el DOM
 * @param {string} elementoId - ID del elemento donde mostrar
 * @param {string} mensaje - Mensaje a mostrar
 */
export function mostrarExito(elementoId, mensaje) {
    const el = document.getElementById(elementoId);
    el.textContent = mensaje;
    el.className = 'auth-mensaje success';
}

/**
 * Muestra mensaje informativo en el DOM
 * @param {string} elementoId - ID del elemento donde mostrar
 * @param {string} mensaje - Mensaje a mostrar
 */
export function mostrarInfo(elementoId, mensaje) {
    const el = document.getElementById(elementoId);
    el.textContent = mensaje;
    el.className = 'auth-mensaje info';
}