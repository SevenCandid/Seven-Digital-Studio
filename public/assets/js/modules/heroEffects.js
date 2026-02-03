/**
 * HERO EFFECTS.JS
 * Handles interactive background effects for the hero section.
 */

export function initHeroEffects() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    // Create effects container
    const effectsContainer = document.createElement('div');
    effectsContainer.className = 'hero-bg-effects';
    heroSection.insertBefore(effectsContainer, heroSection.firstChild);

    // Create living dots instead of single follower
    const dotCount = 60;
    const dots = [];

    // Modern vibey colors
    const colors = [
        'rgba(59, 130, 246, 0.6)',  // Blue
        'rgba(139, 92, 246, 0.6)',  // Purple
        'rgba(236, 72, 153, 0.6)',  // Pink
        'rgba(20, 184, 166, 0.6)',  // Teal
        'rgba(245, 158, 11, 0.6)'   // Amber
    ];

    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        effectsContainer.appendChild(dot);

        const color = colors[Math.floor(Math.random() * colors.length)];

        dots.push({
            element: dot,
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            offsetX: (Math.random() - 0.5) * 250, // Increased spread
            offsetY: (Math.random() - 0.5) * 250, // Increased spread
            speed: 0.015 + Math.random() * 0.045, // Slightly slower for more organic feel
            size: 2 + Math.random() * 4,
            phase: Math.random() * Math.PI * 2
        });

        dot.style.width = `${dots[i].size}px`;
        dot.style.height = `${dots[i].size}px`;
        dot.style.background = color;
        dot.style.boxShadow = `0 0 10px ${color.replace('0.6', '0.4')}`;
    }

    // Cursor tracking
    const rect = heroSection.getBoundingClientRect();
    let mouseX = rect.width / 2;
    let mouseY = rect.height / 2;

    const updatePosition = (x, y) => {
        const bounds = heroSection.getBoundingClientRect();
        mouseX = x - bounds.left;
        mouseY = y - bounds.top;
    };

    heroSection.addEventListener('mousemove', (e) => {
        updatePosition(e.clientX, e.clientY);
    });

    // Touch support for mobile
    heroSection.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            updatePosition(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    heroSection.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            updatePosition(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    let time = 0;

    function animate() {
        time += 0.01;

        dots.forEach((dot, index) => {
            // Add organic movement with sine waves
            const wobbleX = Math.sin(time + dot.phase) * 30;
            const wobbleY = Math.cos(time + dot.phase * 1.3) * 30;

            // Target position with offset and wobble
            dot.targetX = mouseX + dot.offsetX + wobbleX;
            dot.targetY = mouseY + dot.offsetY + wobbleY;

            // Smooth following with easing
            const dx = dot.targetX - dot.x;
            const dy = dot.targetY - dot.y;

            dot.x += dx * dot.speed;
            dot.y += dy * dot.speed;

            dot.element.style.transform = `translate(${dot.x}px, ${dot.y}px)`;
        });

        requestAnimationFrame(animate);
    }

    animate();

    console.log('SEVEN Digital Studio: Hero effects initialized.');
}
