document.addEventListener('DOMContentLoaded', () => {
    // --- Existing Carousel Scrolling Logic ---
    const destinationsScrollWrapper = document.querySelector('.destinations-scroll-wrapper');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    if (destinationsScrollWrapper && leftArrow && rightArrow) {
        const firstCard = destinationsScrollWrapper.querySelector('.location-card');
        let scrollAmount = 0;
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const computedStyle = getComputedStyle(firstCard);
            const marginRight = parseFloat(computedStyle.marginRight) || 0;
            const gap = parseFloat(getComputedStyle(destinationsScrollWrapper.querySelector('.destinations-grid')).gap) || 0;
            
            scrollAmount = cardWidth + Math.max(marginRight, gap);
        }
        if (scrollAmount === 0) {
            scrollAmount = 350;
        }

        leftArrow.addEventListener('click', () => {
            destinationsScrollWrapper.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        rightArrow.addEventListener('click', () => {
            destinationsScrollWrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        const checkScrollArrows = () => {
            if (destinationsScrollWrapper.scrollLeft <= 0) {
                leftArrow.disabled = true;
                leftArrow.style.opacity = '0.5';
                leftArrow.style.cursor = 'default';
            } else {
                leftArrow.disabled = false;
                leftArrow.style.opacity = '1';
                leftArrow.style.cursor = 'pointer';
            }

            if (destinationsScrollWrapper.scrollLeft + destinationsScrollWrapper.clientWidth >= destinationsScrollWrapper.scrollWidth - 1) {
                rightArrow.disabled = true;
                rightArrow.style.opacity = '0.5';
                rightArrow.style.cursor = 'default';
            } else {
                rightArrow.disabled = false;
                rightArrow.style.opacity = '1';
                rightArrow.style.cursor = 'pointer';
            }
        };

        checkScrollArrows();
        destinationsScrollWrapper.addEventListener('scroll', checkScrollArrows);
        window.addEventListener('resize', checkScrollArrows);
    }

    // --- Go Back to Top Button Logic ---
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Fade-in Animations for Page Elements (Existing) ---
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('is-visible');

                if (element.classList.contains('services-section') || 
                    element.classList.contains('explore-destinations-section') ||
                    element.classList.contains('car-rentals-section') ||
                    element.classList.contains('properties-for-rent-section')) {
                    
                    const cards = element.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        card.style.transitionDelay = `${index * 0.1}s`;
                        card.classList.add('is-visible');
                    });
                }
                
                if (element.classList.contains('why-choose-us-section')) {
                    const reasonItems = element.querySelectorAll('.reason-item');
                    reasonItems.forEach((item, index) => {
                        item.style.transitionDelay = `${index * 0.1}s`;
                        item.classList.add('is-visible');
                    });
                }

                observer.unobserve(element); 
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        '.hero-section, ' +
        '.services-section, ' +
        '.explore-destinations-section, ' +
        '.car-rentals-section, ' +
        '.properties-for-rent-section, ' +
        '.why-choose-us-section, ' +
        '.site-footer'
    ).forEach(section => {
        observer.observe(section);
    });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            heroSection.classList.add('is-visible');
        }
    }

    // --- Mobile Navbar Toggle Logic (New) ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a'); // Get all nav links

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
            mobileMenuToggle.classList.toggle('is-open'); // To animate hamburger icon
            document.body.classList.toggle('no-scroll'); // Prevent scrolling body when menu is open
        });

        // Close menu when a link is clicked (for single-page navigation)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('is-open')) {
                    mainNav.classList.remove('is-open');
                    mobileMenuToggle.classList.remove('is-open');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    
});