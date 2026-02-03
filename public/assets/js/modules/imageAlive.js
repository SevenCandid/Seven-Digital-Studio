/**
 * IMAGEALIVE.JS
 * Adds a 3D tilt effect and interactive breathing to images.
 * Supports Mouse (Desktop) and Touch (Mobile).
 */

export function initImageAlive() {
    const images = document.querySelectorAll('.service-card__image, .image-block img');

    images.forEach(img => {
        const container = img.parentElement;
        if (!container) return;

        // Ensure container has perspective for 3D effect
        container.style.perspective = "1000px";
        img.style.transition = "transform 0.1s ease-out, box-shadow 0.3s ease";
        img.style.willChange = "transform";

        const handleMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const y = (e.clientY || e.touches[0].clientY) - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
            const rotateY = ((x - centerX) / centerX) * 10;  // Max 10 deg

            const parallaxOffset = img.style.getPropertyValue('--parallax-offset') || '0px';
            img.style.transform = `translateY(${parallaxOffset}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

            // Add dynamic shadow
            const shadowX = (centerX - x) / 10;
            const shadowY = (centerY - y) / 10;
            img.style.boxShadow = `${shadowX}px ${shadowY}px 25px rgba(0,0,0,0.15)`;
        };

        const handleLeave = () => {
            const parallaxOffset = img.style.getPropertyValue('--parallax-offset') || '0px';
            img.style.transform = `translateY(${parallaxOffset}) rotateX(0deg) rotateY(0deg) scale(1)`;
            img.style.boxShadow = "none";
            img.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease";
        };

        // Desktop
        container.addEventListener('mousemove', handleMove);
        container.addEventListener('mouseleave', handleLeave);

        // Mobile (Touch)
        container.addEventListener('touchstart', (e) => {
            img.style.transition = "transform 0.1s ease-out";
            handleMove(e);
        }, { passive: true });

        container.addEventListener('touchmove', handleMove, { passive: true });

        container.addEventListener('touchend', handleLeave);
    });
}
