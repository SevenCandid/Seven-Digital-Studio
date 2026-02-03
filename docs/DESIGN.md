# SEVEN Digital Studio - Design System

This document outlines the visual language and CSS architecture for the project.

## Core Principles

1.  **Mobile-First**: Styles are written for mobile default, with `@media (min-width)` or specific overrides for larger screens.
2.  **No Frameworks**: Pure CSS variables and utility classes.
3.  **Component-Based**: UI elements are isolated in `assets/css/components/`.

## 1. Color Palette

Professional, high-contrast, trust-building.

| Role           | Color      | Hex       | Usage                             |
| -------------- | ---------- | --------- | --------------------------------- |
| **Primary**    | Deep Slate | `#0F172A` | Headings, Footer, Borders         |
| **Accent**     | Royal Blue | `#2563EB` | Buttons, Active Links, Highlights |
| **Background** | White      | `#FFFFFF` | Cards, Main Content               |
| **Surface**    | Slate 50   | `#F8FAFC` | Section Backgrounds               |
| **Text**       | Slate 600  | `#334155` | Body Copy                         |

## 2. Typography

Hosted via Google Fonts (optimized in `_template.html`).

- **Headings**: `Outfit` (Bold, Modern, Sans-serif)
- **Body**: `Inter` (Clean, highly readable)

## 3. CSS Architecture (ITCSS inspired)

The styling is organized from generic to specific in `assets/css/main.css`.

1.  **Base**: Variables, Reset, Typography.
2.  **Layout**: Grid lines, Header, Footer.
3.  **Components**: Cards, Buttons, Forms, Hero.
4.  **Utilities**: Margin/Padding helpers.

## 4. Breakpoints

Standardized breakpoints used across `grid.css` and components.

- **Mobile**: Default (< 768px)
- **Tablet**: `768px`
- **Desktop**: `1024px` +
- **Large Screens**: `1200px` (Container Max-Width)

## 5. Usage Examples

### Buttons

```html
<a href="#" class="btn btn--primary">Get Started</a>
<a href="#" class="btn btn--outline">Learn More</a>
```

### Grid

```html
<div class="grid grid--2">
  <div class="card">Content</div>
  <div class="card">Content</div>
</div>
```

### Spacing Utilities

- `.mb-md`: Margin Bottom medium (`1.5rem`)
- `.mt-xl`: Margin Top extra large (`5rem`)
