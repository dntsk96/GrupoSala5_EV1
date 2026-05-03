// /js/contacto.js
import { db } from '/js/auth.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// FORMULARIO DE CONTACTO
const formContacto = document.getElementById('formContacto');

if (formContacto) {
    formContacto.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btnSubmit = formContacto.querySelector('.btn-submit');
        const textoOriginal = btnSubmit.textContent;
        const status = document.getElementById('contacto-mensaje-status');
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const servicio = document.getElementById('servicio').value;
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validación básica
        if (!nombre || nombre.length < 3) {
            alert('El nombre debe tener al menos 3 caracteres');
            return;
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            alert('Email inválido');
            return;
        }

        if (!servicio) {
            alert('Selecciona un servicio');
            return;
        }

        if (!mensaje || mensaje.length < 10) {
            alert('El mensaje debe tener al menos 10 caracteres');
            return;
        }

        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Enviando...';
        status.textContent = 'Enviando solicitud...';
        status.style.color = '#3B82F6';
        
        const datos = {
            nombre: nombre,
            email: email,
            telefono: telefono || 'No proporcionado',
            servicio: servicio,
            mensaje: mensaje,
            fecha: serverTimestamp(),
            estado: 'pendiente'
        };

        try {
            await addDoc(collection(db, 'solicitudes_citas'), datos);
            
            const mensajeWhatsApp = `Hola AutoElite! 🚗%0A%0AMi nombre es: ${datos.nombre}%0ATel: ${datos.telefono}%0AEmail: ${datos.email}%0A%0AServicio: ${datos.servicio}%0AMensaje: ${datos.mensaje}`;
            const numeroWhatsApp = '+51936544537';
            
            btnSubmit.textContent = '¡Enviado con éxito!';
            btnSubmit.style.background = '#16A34A';
            status.textContent = '¡Solicitud enviada! Te contactaremos pronto.';
            status.style.color = '#16A34A';
            
            setTimeout(() => {
                window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`, '_blank');
                formContacto.reset();
                btnSubmit.disabled = false;
                btnSubmit.textContent = textoOriginal;
                btnSubmit.style.background = '#DC2626';
                status.textContent = '';
            }, 2000);
            
        } catch (error) {
            console.error('Error al enviar:', error);
            btnSubmit.textContent = 'Error, intenta de nuevo';
            btnSubmit.style.background = '#EF4444';
            status.textContent = 'Error al enviar. Intenta de nuevo.';
            status.style.color = '#DC2626';
            
            setTimeout(() => {
                btnSubmit.disabled = false;
                btnSubmit.textContent = textoOriginal;
                btnSubmit.style.background = '#DC2626';
            }, 3000);
        }
    });
}