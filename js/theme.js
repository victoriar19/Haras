document.addEventListener('DOMContentLoaded', () => {
    
    // 1. THÈME
    const toggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const iconSpan = toggleBtn ? toggleBtn.querySelector('.icon') : null;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (iconSpan) iconSpan.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    // 2. ACCORDÉON
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', !isExpanded);
            const content = header.nextElementSibling;
            
            if (!isExpanded) {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.opacity = "1";
            } else {
                content.style.maxHeight = null;
                content.style.opacity = "0";
            }
        });
    });

    // 3. CARROUSEL (SWIPE)
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextBtn = carousel.querySelector('.next');
        const prevBtn = carousel.querySelector('.prev');
        let index = 0;

        const updateSlide = () => {
            track.style.transform = `translateX(-${index * 100}%)`;
        };

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche l'accordéon de réagir
            index = (index + 1) % slides.length;
            updateSlide();
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            index = (index - 1 + slides.length) % slides.length;
            updateSlide();
        });
    });
});