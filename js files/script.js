// script.js

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const services = document.querySelector('.nav-link.services');
    const servicesLink = services.querySelector('a');
    const dropdown = services.querySelector('.drop-down');

    // Toggle navigation links on hamburger click
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click from bubbling up to document
        const isActive = navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
    });

    // Toggle dropdown on services click (only on mobile)
    servicesLink.addEventListener('click', (e) => {
        // Check if the screen width is less than or equal to 768px
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Prevent default link behavior
            const isActive = services.classList.toggle('active');
            // Update aria-expanded attribute for accessibility
            const ariaExpanded = isActive ? 'true' : 'false';
            servicesLink.setAttribute('aria-expanded', ariaExpanded);
        }
    });

    // Close the nav menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbarContains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            services.classList.remove('active');
            servicesLink.setAttribute('aria-expanded', 'false');
        }
    });

    // Helper function to check if a click is inside the navbar
    function navbarContains(element) {
        return document.querySelector('.navbar').contains(element);
    }

    // Handle window resize to remove active classes when switching between desktop and mobile
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            services.classList.remove('active');
            servicesLink.setAttribute('aria-expanded', 'false');
        }
    });
});
