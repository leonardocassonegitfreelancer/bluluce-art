# Bluluce Art — Project Notes

Astro 5 + React 19 site (shadcn/ui + Tailwind). Static output (`output: 'static'`), multi-language via a `[lang]` dynamic route.

## Running the dev server

**On this machine, start the dev server via the `dev.ps1` script in the project root:**

```powershell
.\dev.ps1
```

It activates fnm (installed via WinGet, not the default path) and then runs `npm run dev`. Equivalent manual steps:

```powershell
$fnm = "C:\Users\leona\AppData\Local\Microsoft\WinGet\Packages\Schniz.fnm_Microsoft.Winget.Source_8wekyb3d8bbwe\fnm.exe"
& $fnm env --shell powershell | Invoke-Expression
npm run dev
```

Server runs at **http://localhost:4321/**.

**Gotchas (PowerShell 5.1 on this machine):**
- fnm lives under the WinGet packages path above — **not** `%LOCALAPPDATA%\fnm`. `node`/`npm` are unavailable until fnm's env is activated.
- `npm` under fnm is a `.cmd` shim, so `Start-Process -FilePath "npm"` fails. Run `npm run dev` directly (or use `dev.ps1`).
- The `&` background operator doesn't exist in PS 5.1 — run the server as a background task instead.

## Common commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (`astro dev`) at :4321 |
| `npm run build` | Static production build (`astro build`) → `dist/` |
| `npm run preview` | Preview the build |
| `npm run lint` | ESLint |
| `npm test` | Vitest (run once) · `npm run test:watch` for watch mode |

## Project layout

- Standard Astro layout: routes in **`src/pages/`** (`.astro`), with a **`[lang]/`** dynamic segment for localization and `index.astro` / `404.astro`.
- React components in **`src/components/`**; the `@/` import alias points to `src/`.
- Integrations: `@astrojs/react`, `@astrojs/tailwind` (`applyBaseStyles: false`), `@astrojs/sitemap`.
- **Image conversion:** a `convert-to-webp.mjs` helper script lives at the project root for turning source images into webp.
