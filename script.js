document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    let isMenuOpen = false;

    // Hamburger menu click handler
    hamburgerMenu.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('active');
        body.style.overflow = isMenuOpen ? 'hidden' : '';
        
        // Animate hamburger menu
        const spans = this.querySelectorAll('span');
        spans[0].style.transform = isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none';
        spans[1].style.opacity = isMenuOpen ? '0' : '1';
        spans[2].style.transform = isMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navLinks.contains(event.target) || mobileMenu.contains(event.target);
        const isClickOnHamburger = hamburgerMenu.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && isMenuOpen) {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
            isMenuOpen = false;
            
            const spans = hamburgerMenu.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && isMenuOpen) {
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('active');
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
            isMenuOpen = false;
            
            const spans = hamburgerMenu.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
            isMenuOpen = false;
        });
    });

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation classes to elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.feature-card, .step-card, .card, .ready-container'
        );

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.9 && elementBottom > 0) {
                element.classList.add('animate-fade-in');
            }
        });
    };

    // Initial check for elements in view
    animateOnScroll();

    // Check for elements on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Section transitions
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});