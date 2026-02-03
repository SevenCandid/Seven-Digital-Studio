/**
 * APP.JS
 * Main entry point for the application.
 * Imports and initializes all modules.
 */

// Example import:
// import { initNavigation } from './modules/navigation.js';

// Imports
import { initTypewriter } from './modules/typewriter.js';
import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initHeroEffects } from './modules/heroEffects.js';
import { initLoader } from './modules/loader.js';
import { initParallax } from './modules/parallax.js';
import { initMagneticButtons } from './modules/magnetic.js';

document.addEventListener("DOMContentLoaded", () => {
  console.log("SEVEN Digital Studio: App Initialized");

  // Initialize loader first
  const hideLoader = initLoader();

  // Initialize modules with error safety
  const modules = [
    { name: 'Navigation', init: initNavigation },
    { name: 'Typewriter', init: initTypewriter },
    { name: 'Animations', init: initAnimations },
    { name: 'HeroEffects', init: initHeroEffects },
    { name: 'Parallax', init: initParallax },
    { name: 'MagneticButtons', init: initMagneticButtons }
  ];

  modules.forEach(module => {
    try {
      module.init();
      console.log(`SEVEN Digital Studio: ${module.name} initialized.`);
    } catch (error) {
      console.error(`SEVEN Digital Studio: Failed to initialize ${module.name}:`, error);
    }
  });

  // Finish loading
  if (hideLoader) hideLoader();
});
