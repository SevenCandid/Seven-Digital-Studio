/**
 * Magnetic Buttons Module
 * Makes buttons subtly "pull" toward the cursor for a tactile feel.
 */

export function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Subtle pull effect
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            btn.style.transition = 'transform 0.1s ease-out';
        });

        btn.addEventListener('mouseleave', () => {
            // Smoothly return to original position
            btn.style.transform = 'translate(0, 0)';
            btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });

    console.log(`SEVEN Digital Studio: Initialized magnetic effect for ${buttons.length} buttons.`);
}
