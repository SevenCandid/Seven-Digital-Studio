/**
 * THEME.JS
 * Handles dark mode toggling and persistence.
 * Injects a toggle button into the header.
 */

export const initTheme = () => {
    const themeKey = 'seven-theme';
    const html = document.documentElement;
    const headerInner = document.querySelector('.site-header__inner');

    // 1. Create the Toggle Button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle Dark Mode');
    toggleBtn.innerHTML = `
        <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    `;

    // Insert before the mobile toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (headerInner && mobileToggle) {
        headerInner.insertBefore(toggleBtn, mobileToggle);
    } else if (headerInner) {
        headerInner.appendChild(toggleBtn);
    }

    // 2. Logic to set theme
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem(themeKey, theme);
    };

    // 3. Check for saved theme or system preference
    const savedTheme = localStorage.getItem(themeKey);
    const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemPref;

    setTheme(initialTheme);

    // 4. toggle Event
    toggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
};
