document.addEventListener('DOMContentLoaded', () => {
    // --- Carousel Scrolling Logic (Existing) ---
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

    // --- Go Back to Top Button Logic (New) ---
    const backToTopBtn = document.getElementById('backToTopBtn');

    // When the user scrolls down 300px from the top of the document, show the button
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.classList.add('show'); // Add 'show' class to make it visible
        } else {
            backToTopBtn.classList.remove('show'); // Remove 'show' class to hide it
        }
    });

    // When the user clicks on the button, scroll to the top of the document
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll effect
        });
    });
});