// /js/auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDx2B_A82yqD5Se4MAw-8Lucm4RAgj86BY",
    authDomain: "autoelite-grupo5.firebaseapp.com",
    projectId: "autoelite-grupo5",
    storageBucket: "autoelite-grupo5.firebasestorage.app",
    messagingSenderId: "21475395432",
    appId: "1:21475395432:web:7e00d3f3b651c15b3e78dd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Cambia el header según sesión
onAuthStateChanged(auth, (user) => {
    const headerActions = document.getElementById('header-actions');
    if (!headerActions) return;
    
    if (user) {
        // CON SESIÓN
        headerActions.innerHTML = `
            <span class="user-name">
                <i class="fa-solid fa-user"></i> ${user.displayName || user.email.split('@')[0]}
            </span>
            <a href="index.html#contacto" class="btn-cita">
                <i class="fa-solid fa-calendar-check"></i> Pedir Cita Online
            </a>
            <button id="btn-logout" class="btn-logout" title="Cerrar sesión">
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>
        `;
        
        document.getElementById('btn-logout')?.addEventListener('click', async () => {
            await signOut(auth);
            window.location.href = 'index.html';
        });
    } else {
        // SIN SESIÓN - ahora con icono
        const isRegistro = window.location.pathname.includes('registro.html');
        headerActions.innerHTML = `
            <a href="registro.html" class="btn-registro ${isRegistro ? 'active' : ''}">Registro</a>
            <a href="index.html#contacto" class="btn-cita">
                <i class="fa-solid fa-calendar-check"></i> Pedir Cita Online
            </a>
        `;
    }
});

export { auth, db };