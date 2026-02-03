/**
 * Parallax Module
 * Adds subtle scroll-driven movement to background shapes and images.
 */

export function initParallax() {
    const parallaxElements = document.querySelectorAll('.floating-shape, .service-card__image, .image-block img');

    if (parallaxElements.length === 0) return;

    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateParallax = () => {
        const scrollY = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.classList.contains('floating-shape') ? 0.2 : 0.05;
            const direction = el.offsetHeight % 2 === 0 ? 1 : -1; // Subtle variety
            const movement = (scrollY - lastScrollY) * speed * direction;

            // Apply subtle transform without breaking existing ones
            const currentTransform = window.getComputedStyle(el).transform;
            if (currentTransform === 'none') {
                el.style.transform = `translateY(${movement}px)`;
            } else {
                // If it already has a transform (like floating shapes), we append it carefully
                // But for simplicity in a performant loop, we use a custom property if possible
                el.style.setProperty('--parallax-offset', `${movement}px`);
            }
        });

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = true;
            });
        }
    });

    console.log(`SEVEN Digital Studio: Initialized parallax for ${parallaxElements.length} elements.`);
}
