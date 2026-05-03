// Filtros de galería
document.addEventListener('DOMContentLoaded', function() {
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const proyectos = document.querySelectorAll('.proyecto-card');
    
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Activar botón
            filtroBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar proyectos
            proyectos.forEach(proyecto => {
                if (filter === 'todos' || proyecto.getAttribute('data-category') === filter) {
                    proyecto.style.display = 'block';
                } else {
                    proyecto.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const btnsVer = document.querySelectorAll('.btn-ver');
    
    btnsVer.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const imgSrc = this.getAttribute('data-img');
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
        });
    });
    
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
});