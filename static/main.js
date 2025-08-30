// Hamburger menu toggle for mobile navigation
const burger = document.querySelector('.nav-burger');
const navLinks = document.getElementById('main-nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('is-open');
        const expanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !expanded);
    });
}

// Close menu when a link is clicked on mobile
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && navLinks.classList.contains('is-open')) {
            navLinks.classList.remove('is-open');
            burger.setAttribute('aria-expanded', 'false');
        }
    });
});

// Highlight active navigation link
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.replace(/\/$/, ""); // Handle trailing slash
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPath = new URL(link.href).pathname.replace(/\/$/, "");
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
});

// Fade-in on scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const targets = document.querySelectorAll('.fade-in-on-scroll');
    targets.forEach(target => observer.observe(target));
});
