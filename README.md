# Multilingual Personal Homepage

This is a multilingual personal homepage with automatic language detection and manual language switching.

## Languages Supported

- **English** (`/en/`) - Default for most users
- **Traditional Chinese** (`/zh_tw/`) - Auto-detected for users with Chinese browser settings

## Features

- 🌐 **Automatic Language Detection**: Detects user's browser language preferences
- 🔄 **Language Toggle**: Fixed language switcher in top-right corner
- 🎯 **SEO-friendly URLs**: Separate routes for each language (`/en/`, `/zh_tw/`)
- 📱 **Responsive Design**: Works on all devices

## Language Detection Logic

The homepage automatically redirects users based on their browser language settings:

- **Traditional Chinese** (zh-TW, zh-Hant, zh-HK, zh-MO) → `/zh_tw/`
- **English** (en-\*) or any other language → `/en/` (default)

## Directory Structure

```
docs/
├── index.html          # Language detection & redirect page
├── en/
│   └── index.html      # English version
├── zh_tw/
│   └── index.html      # Traditional Chinese version
├── css/                # Shared stylesheets
├── js/                 # Shared JavaScript (including language utilities)
└── img/                # Shared images
```

## Deployment

### Standard Build Process (Recommended)

1. Make content changes in source files:
   - English: `src/en/index.html`
   - Chinese: `src/zh_tw/index.html`
   - Styles: `src/css/main.css`
2. Build and deploy: `npm run build`
3. Test locally: `npm run preview` or `cd docs && python3 -m http.server 8080`
4. Commit and push to GitHub
5. GitHub Pages automatically deploys from `/docs` folder

### Quick Content Updates (Alternative)

For quick text changes only:

1. Edit content directly in `docs/en/index.html` or `docs/zh_tw/index.html`
2. Commit and push to GitHub
3. **Note**: Changes will be overwritten on next `npm run build`

### Build Commands

- `npm run build` - Complete build (webpack + CSS copy)
- `npm run build:webpack` - Webpack only (JS + HTML)
- `npm run build:css` - Copy CSS only
- `npm run preview` - Build and start local server

## Making Changes

### Adding Content

1. Edit `src/en/index.html` for English content
2. Edit `src/zh_tw/index.html` for Chinese content
3. Run `npm run build` to update `/docs` folder
4. Keep the same structure but translate text content

### Styling Changes

1. Edit `src/css/main.css`
2. Run `npm run build` to copy to `/docs`

### Adding New Languages

1. Create new directory: `src/[language_code]/`
2. Copy and translate an existing `index.html`
3. Update `src/index-redirect.html` redirect logic
4. Update `src/js/languageUtils.js` detection logic
5. Update webpack.config.js to include new language
6. Run `npm run build`

## Technical Notes

- Webpack handles JS bundling and HTML generation
- CSS is copied separately (due to loader compatibility issues)
- Language toggle appears fixed in top-right corner
- Images use relative paths (`../img/`) from language subdirectories
- Build includes hash for JS files for cache-busting

## GitHub Pages Setup

- Repository: `escapiststupor.github.io`
- Source: Deploy from `/docs` folder in main branch
- Custom domain support available
- SSL enforced via domain provider (Namecheap)

## Testing URLs

- Main: `https://canglah-micyang.com/` (redirects based on language)
- English: `https://canglah-micyang.com/en/`
- Chinese: `https://canglah-micyang.com/zh_tw/`

## Troubleshooting

- If build fails, try `npm install` first
- CSS changes require `npm run build:css` or full `npm run build`
- For Node.js compatibility issues, the build uses `--openssl-legacy-provider`

---

### References

- Static website setup: https://www.ivarprudnikov.com/static-website-multiple-html-pages-using-webpack-plus-github-example/
- SSL setup via Namecheap: https://www.youtube.com/watch?v=FBtehan5DAo
