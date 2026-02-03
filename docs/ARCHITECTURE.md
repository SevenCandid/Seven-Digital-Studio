# Architecture & Development Guidelines

## Tech Stack

- **HTML**: Semantic HTML5.
- **CSS**: Vanilla CSS with BEM naming convention. No preprocessors (SASS/LESS) to keep it dependency-free.
- **JS**: Vanilla JavaScript (ES6+ Modules).
- **Backend**: None (Static). Data stored in `public/data/*.json`.

## Folder Structure Rules

- **public/**: The only folder exposed to the web server.
- **assets/**: All static resources.
  - **css/main.css**: The only CSS file linked in HTML. It imports all others.
- **data/**: JSON files for dynamic content (Price lists, Testimonials).

## Naming Conventions

- **Directories/Files**: `kebab-case` (e.g., `featured-projects.html`)
- **CSS Classes**: BEM (e.g., `.card__header--active`)
- **JS Functions**: camelCase (e.g., `initCarousel`)

## Deployment

1.  Connect via FTP/SFTP to Hostinger.
2.  Upload contents of `public/` to `public_html`.
3.  Do NOT upload `docs/`, `tests/`, or `.vscode/`.
