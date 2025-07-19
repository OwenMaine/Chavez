/**
 * Chavez Sheet Metal LLC - main.js
 *
 * This file contains the core JavaScript functionality for the website.
 *
 * Contents:
 * 1.  Sticky Navigation
 * 2.  Mobile Navigation Toggle
 * 3.  AOS (Animate on Scroll) Initialization
 * 4.  SwiperJS (Testimonials Slider) Initialization
 * 5.  Simple Lightbox for Gallery
 * 6.  Back to Top Button
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navigation
    // ----------------------------------------
    // Adds a 'scrolled' class to the header when the user scrolls down
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Navigation Toggle
    // ----------------------------------------
    // Toggles the 'active' class on the mobile menu
    const navToggle = document.getElementById('navbar-toggle');
    const navMenu = document.getElementById('navbar-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Change icon to 'X' when menu is open
            navToggle.querySelector('i').classList.toggle('fa-bars');
            navToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // 3. AOS (Animate on Scroll) Initialization
    // ----------------------------------------
    // Initializes the AOS library with some default settings
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        once: true,    // whether animation should happen only once - while scrolling down
        offset: 100,   // offset (in px) from the original trigger point
    });

// js/main.js

// ... (after mobile nav logic) ...

// 3. NEW: Hero Slider Initialization
// ----------------------------------------
// Initializes Swiper for the split-screen hero visual panel
const heroSlider = new Swiper('.hero-slider', {
    loop: true,
    effect: 'fade', // Use fade effect for smooth transitions
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    speed: 1000, // Transition speed in ms
    allowTouchMove: false, // It's a background, so disable user interaction
});

// 4. AOS (Animate on Scroll) Initialization
// ... (rest of the file remains the same) ...

    // 4. SwiperJS (Testimonials Slider) Initialization
    // ----------------------------------------
    // Initializes the Swiper instance for the testimonials section
    const testimonialsSlider = new Swiper('.testimonials-slider', {
        // Optional parameters
        loop: true,
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 768px
            768: {
                slidesPerView: 1,
            },
            // when window width is >= 1024px
            1024: {
                slidesPerView: 2,
            }
        }
    });

    // 5. Simple Lightbox for Gallery
    // ----------------------------------------
    // Handles opening and closing a simple lightbox for gallery images
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeBtn = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && galleryItems.length > 0 && closeBtn) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                lightbox.style.display = 'block';
                lightboxImg.src = item.href;
            });
        });

        // Close lightbox when clicking the close button or outside the image
        const closeLightbox = () => {
            lightbox.style.display = 'none';
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // 6. Back to Top Button
    // ----------------------------------------
    // Shows/hides the button and handles the scroll-to-top action
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // js/main.js

// ... (existing JS code) ...

    // 7. NEW: Animated Counters (Counter-Up 2)
    // ----------------------------------------
    // Initializes the counter animation on elements with the class 'counter'
    const counters = document.querySelectorAll('.counter');
    const FADE_DURATION = 1000; // Custom duration

    if (counters.length > 0) {
        counters.forEach(counter => {
            const waypoint = new Waypoint({
                element: counter,
                handler: function() {
                    counterUp(counter, {
                        duration: 2000,
                        delay: 16,
                    });
                    this.destroy(); // Trigger only once
                },
                offset: 'bottom-in-view',
            });
        });
    }

}); // End of DOMContentLoaded event listener

// js/main.js

document.addEventListener('DOMContentLoaded', () => {

// ... (all existing code from the previous steps) ...

    // 8. NEW: Project Gallery Filter & Enhanced Lightbox
    // ----------------------------------------
    const filterContainer = document.querySelector('.filter-controls');
    const projectGrid = document.querySelector('.project-grid');
    
    if (filterContainer && projectGrid) {
        const projectItems = projectGrid.querySelectorAll('.project-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDescription = document.getElementById('lightbox-description');
        const closeBtn = document.querySelector('.lightbox-close');

        // --- Filter Logic ---
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                // Deactivate existing active button
                filterContainer.querySelector('.active').classList.remove('active');
                // Activate new button
                e.target.classList.add('active');
                
                const filterValue = e.target.getAttribute('data-filter');

                projectItems.forEach(item => {
                    if (item.dataset.category === filterValue || filterValue === 'all') {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            }
        });

        // --- Enhanced Lightbox Logic ---
        projectItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                const title = item.dataset.title;
                const description = item.dataset.description;

                lightboxImg.src = imgSrc;
                lightboxTitle.textContent = title;
                lightboxDescription.textContent = description;
                lightbox.style.display = 'block';
            });
        });
        
        // --- Close Lightbox ---
        const closeLightbox = () => {
            lightbox.style.display = 'none';
        };

        if(closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }
        lightbox.addEventListener('click', (e) => {
            // Check if the click is on the dark background, not the container itself
            if (e.target.classList.contains('lightbox')) {
                closeLightbox();
            }
        });
    }


}); // End of DOMContentLoaded event listener

// NOTE: The previous simple lightbox logic from the homepage can now be removed
// if you want to avoid redundancy, as this new enhanced version handles all cases
// by checking if the required elements (.project-grid) exist on the page.

// js/main.js

document.addEventListener('DOMContentLoaded', () => {

// ... (all existing code) ...

    // 9. NEW: FAQ Accordion
    // ----------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Optional: Close all other accordions
                // faqItems.forEach(i => {
                //     i.classList.remove('active');
                //     i.querySelector('.faq-answer').style.maxHeight = null;
                // });

                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                }
            });
        });
    }

}); // End of DOMContentLoaded event listener



