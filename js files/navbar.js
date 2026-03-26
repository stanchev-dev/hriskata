
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const services = document.querySelector('.nav-link.services');
    const servicesLink = services.querySelector('a');

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
    });

    servicesLink.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const isActive = services.classList.toggle('active');
            const ariaExpanded = isActive ? 'true' : 'false';
            servicesLink.setAttribute('aria-expanded', ariaExpanded);
        }
    });

    document.addEventListener('click', (e) => {
        if (!navbarContains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            services.classList.remove('active');
            servicesLink.setAttribute('aria-expanded', 'false');
        }
    });

    function navbarContains(element) {
        return document.querySelector('.navbar').contains(element);
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            services.classList.remove('active');
            servicesLink.setAttribute('aria-expanded', 'false');
        }
    });
});
