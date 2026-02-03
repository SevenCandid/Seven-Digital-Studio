/**
 * ANIMATIONS.JS
 * Handles scroll-triggered animations using IntersectionObserver.
 */

export function initAnimations() {
    const observerOptions = {
        root: null, // viewport
        rootMargin: '10px', // Small margin to trigger slightly before visibility
        threshold: 0 // Trigger as soon as 1px is visible
    };

    const typeEffect = (element, html, speed = 15) => {
        const visibleSpan = element.querySelector('.tw-visible');
        if (!visibleSpan) return;

        // Clear any existing typing timeout to prevent overlaps
        if (element._typeTimeout) {
            clearTimeout(element._typeTimeout);
        }

        let i = 0;
        element.style.opacity = '1';
        element.classList.add('is-typing');
        visibleSpan.innerHTML = ''; // Reset for (re)typing

        function type() {
            if (i < html.length) {
                if (html[i] === '<') {
                    const tagEnd = html.indexOf('>', i);
                    i = tagEnd !== -1 ? tagEnd + 1 : i + 1;
                } else {
                    i++;
                }

                visibleSpan.innerHTML = html.substring(0, i);
                element._typeTimeout = setTimeout(type, speed);
            } else {
                element.classList.remove('is-typing');
                element._typeTimeout = null;
                if (element.querySelector('.typewriter')) {
                    import('./typewriter.js').then(m => m.initTypewriter());
                }
            }
        }

        type();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('reveal-typewriter')) {
                    const html = entry.target.getAttribute('data-html');
                    typeEffect(entry.target, html);
                } else {
                    entry.target.classList.add('is-visible');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Pre-process typewriter elements for stability and add interactive hover
    document.querySelectorAll('.reveal-typewriter').forEach(el => {
        el.querySelectorAll('.typewriter').forEach(tw => tw.removeAttribute('data-typewriter-init'));

        // Final Normalization: Trim and collapse all internal whitespaces/newlines
        const currentHTML = el.innerHTML.trim().replace(/\s+/g, ' ');
        el.setAttribute('data-html', currentHTML);

        // Condense into one line without any whitespace between tags
        el.innerHTML = `<span class="tw-ghost">${currentHTML}</span><span class="tw-visible"></span>`;
        el.style.opacity = '0';

        // Add Hover-Triggered Retyping
        el.addEventListener('mouseenter', () => {
            if (!el.classList.contains('is-typing')) {
                const html = el.getAttribute('data-html');
                typeEffect(el, html, 10); // Slightly faster for hover interaction
            }
        });
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll, .reveal-typewriter');
    animatedElements.forEach(el => observer.observe(el));

    console.log(`SEVEN Digital Studio: Initialized animations and hover effects for ${animatedElements.length} elements.`);
}
