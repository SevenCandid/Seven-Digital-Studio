/**
 * HEADERSCROLL.JS
 * Implements "Vanish on Scroll Up, Reappear on Scroll Down" behavior.
 */

export function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollTop = 0;
    const scrollThreshold = 10; // Avoid flickering on tiny scrolls

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // If the difference is too small, do nothing
        if (Math.abs(currentScroll - lastScrollTop) <= scrollThreshold) return;

        // If at the very top, always show
        if (currentScroll <= 100) {
            header.classList.remove('site-header--hidden');
        } else {
            // USER REQUEST: "vanish only on scroll up and reappears as soon as scroll down starts"
            if (currentScroll < lastScrollTop) {
                // Scrolling UP (towards top) -> HIDE
                header.classList.add('site-header--hidden');
            } else {
                // Scrolling DOWN (towards bottom) -> SHOW
                header.classList.remove('site-header--hidden');
            }
        }

        lastScrollTop = currentScroll;
    }, { passive: true });
}
