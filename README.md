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

### White screen (blank page)

If the tab stays blank, **View Page Source** (查看网页源代码):

- **Good (Actions build is live):** you should see `<script ... src="/mbrigedemo/assets/index-....js">` (hashed filename under `/mbrigedemo/assets/`).
- **Bad:** you see `src="/src/main.jsx"` (leading slash only). The browser then requests `https://ustbmz.github.io/src/main.jsx` (wrong path) and the app never starts. Fix: **Settings → Pages → Source → GitHub Actions**, then run **Actions → Deploy to GitHub Pages → Re-run workflow** so the published site is the **`dist`** output from `npm run build`, not the raw repo `index.html`.

The entry script in `index.html` uses **`./src/main.jsx`** so that, if the HTML is ever opened from the `/mbrigedemo/` path, the request stays under that folder in dev; the **production** site must still be the **built** bundle from GitHub Actions.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
