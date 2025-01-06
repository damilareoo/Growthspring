document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    let isMenuOpen = false;

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('active');
        body.style.overflow = isMenuOpen ? 'hidden' : '';
        
        // Animate hamburger
        const spans = this.querySelectorAll('.line');
        if (isMenuOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target) && isMenuOpen) {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
            isMenuOpen = false;
            
            const spans = hamburger.querySelectorAll('.line');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking on a mobile menu link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
            isMenuOpen = false;
            
            const spans = hamburger.querySelectorAll('.line');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
            isMenuOpen = false;
            
            const spans = hamburger.querySelectorAll('.line');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
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
});