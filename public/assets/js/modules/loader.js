/**
 * Page Loader Module
 * Handles the removal of the loader once the site is initialized.
 */

export function initLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    // Small delay to ensure smooth entrance/exit flow
    const hideLoader = () => {
        setTimeout(() => {
            loader.classList.add('page-loader--hidden');
            // Remove from DOM after transition to free resources
            setTimeout(() => {
                loader.remove();
            }, 800);
        }, 500);
    };

    // Fallback in case something prevents the main app from finishing
    window.addEventListener('load', hideLoader);

    // Return the handle function so app.js can trigger it explicitly after all modules init
    return hideLoader;
}
