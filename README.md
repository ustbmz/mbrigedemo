# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## GitHub Pages (project site / sub-path)

This repo is configured for GitHub Pages **sub-path** deployment.

- **Site URL**: `https://ustbmz.github.io/mbrigedemo/`
- **Vite base**: `vite.config.js` uses `base: '/mbrigedemo/'`
- **Auto deploy**: push to `main` triggers `.github/workflows/deploy-pages.yml`

### If the site shows “Site not found” (404)

1. In the repo on GitHub: **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch” unless you intentionally use a `gh-pages` branch).
3. Open **Actions** and confirm **Deploy to GitHub Pages** completed successfully on the latest push. If GitHub asks to approve the **`github-pages`** environment once, approve it under **Settings → Environments**.
4. Wait a minute and reload `https://ustbmz.github.io/mbrigedemo/` (with or without trailing slash).

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
