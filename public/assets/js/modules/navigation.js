/**
 * NAVIGATION.JS
 * Handles mobile menu toggling and smooth scrolling.
 */

export function initNavigation() {
    initMobileMenu();
    initSmoothScroll();
}

/**
 * Mobile Menu Toggle
 * Toggles the visibility of the nav list on small screens.
 */
function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const navConfig = document.querySelector('.main-nav');

    if (!toggleBtn || !navConfig) return;

    toggleBtn.addEventListener('click', () => {
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        
        // Toggle State
        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        navConfig.classList.toggle('is-open'); // CSS handles the display/animation
    });
}

/**
 * Smooth Scroll
 * Handles scrolling to anchor links with offset for sticky header.
 */
function initSmoothScroll() {
    const header = document.querySelector('.site-header');
    const headerHeight = header ? header.offsetHeight : 0;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Calculate position with header offset
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // 20px extra breathing room

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu if open
                const navConfig = document.querySelector('.main-nav');
                if (navConfig && navConfig.classList.contains('is-open')) {
                    navConfig.classList.remove('is-open');
                    const toggleBtn = document.querySelector('.mobile-toggle');
                    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
}
