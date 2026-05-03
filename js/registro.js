// /js/registro.js
import { auth, db } from '/js/auth.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { validarEmail, validarPassword, validarNombre, mostrarError, mostrarExito, mostrarInfo } from '/js/validar.js';

// TABS
const tabBtns = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.auth-form');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        forms.forEach(f => f.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`form-${tab}`).classList.add('active');
    });
});

// LOGIN
document.getElementById('form-login')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    const emailVal = validarEmail(email);
    if (!emailVal.valido) {
        mostrarError('login-mensaje', emailVal.error);
        return;
    }

    mostrarInfo('login-mensaje', 'Iniciando sesión...');

    try {
        await signInWithEmailAndPassword(auth, email, password);
        mostrarExito('login-mensaje', '¡Bienvenido! Redirigiendo...');
        setTimeout(() => window.location.href = 'index.html', 1000);
    } catch (error) {
        const errores = {
            'auth/invalid-credential': 'Email o contraseña incorrectos',
            'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
            'auth/user-disabled': 'Esta cuenta está deshabilitada'
        };
        mostrarError('login-mensaje', errores[error.code] || 'Error: ' + error.message);
    }
});

// REGISTRO
document.getElementById('form-registro')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('reg-nombre').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const password2 = document.getElementById('reg-password2').value;

    const nombreVal = validarNombre(nombre);
    if (!nombreVal.valido) {
        mostrarError('reg-mensaje', nombreVal.error);
        return;
    }

    const emailVal = validarEmail(email);
    if (!emailVal.valido) {
        mostrarError('reg-mensaje', emailVal.error);
        return;
    }

    const passVal = validarPassword(password, password2);
    if (!passVal.valido) {
        mostrarError('reg-mensaje', passVal.error);
        return;
    }

    mostrarInfo('reg-mensaje', 'Creando cuenta...');

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: nombre });

        await setDoc(doc(db, 'usuarios', user.uid), {
            nombre: nombre,
            email: email,
            fechaRegistro: serverTimestamp()
        });

        mostrarExito('reg-mensaje', '¡Cuenta creada! Redirigiendo...');
        setTimeout(() => window.location.href = 'index.html', 1500);

    } catch (error) {
        console.error('ERROR:', error);
        const errores = {
            'auth/email-already-in-use': 'Este email ya está registrado',
            'auth/weak-password': 'Contraseña muy débil',
            'auth/invalid-email': 'Email no válido',
            'permission-denied': 'Error de permisos en Firestore'
        };
        mostrarError('reg-mensaje', errores[error.code] || 'Error: ' + error.message);
    }
});