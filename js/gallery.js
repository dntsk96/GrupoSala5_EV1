// ===== TABS GALERÍA DE PROYECTOS =====
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sliders = document.querySelectorAll('.galeria-slider');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Quitar active de todos
                tabBtns.forEach(b => b.classList.remove('active'));
                sliders.forEach(s => s.classList.remove('active'));
                
                // Activar el seleccionado
                btn.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
});