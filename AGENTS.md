# AGENTS.md — 品杰科技 (pinjie-tech)

## Quick start

```bash
npm install
npm run dev     # Vite dev server → http://localhost:5173
npm run build   # outputs to dist/
```

No tests, no linter, no typecheck. CI/CD not configured.

## Architecture

```
public/portal.json  →  store/portal.js  (Pinia, fetch at runtime)
                          ↕
index.html  →  src/main.js  →  App.vue  →  router-view (Home.vue)
                                        →  AppHeader.vue (search)
                                        →  SystemCard.vue
```

- **No backend** — Express server removed. Data is `public/portal.json` fetched at runtime via `fetch('/portal.json')`.
- **`@` import alias** = `src/`
- **Element Plus** with Chinese locale (`zh-cn`) — all icons registered globally in `main.js`
- **SCSS** with CSS custom properties (`:root` in `global.scss`) — dark theme only, no light mode
- **Single route** (`/`) — no admin panel, no auth

## Store: `usePortalStore` (`src/store/portal.js`)

| Action | Effect |
|---|---|
| `setSearch(q)` | updates `searchQuery` — triggers `filteredSystems` computed |
| `setCategory(id)` | toggles `activeCategory` (click same id = deselect) |

Data (`systems`, `categories`) loaded via `fetch('/portal.json')` when the store is first created. `loading` ref starts as `true`, set to `false` after data arrives.

Computed `filteredSystems` applies: `isActive` filter → category filter → search (name/desc/tags, lowercased) → `sortOrder` sort.
Computed `groupedSystems` maps categories → their filtered systems, omitting empty groups.

## Data file: `public/portal.json`

Top-level array of categories, each containing its own systems:

- Category: `name`, `description`, `icon`, `systems[]`
- System: `name`, `url`, `description`, `icon`, `tags[]`, `department`

Categories and systems are sorted by pinyin (Chinese phonetic order). Edit this file to add/modify systems or categories. **No rebuild needed** — just refresh the browser in dev mode. For production, the file is copied to `dist/portal.json`.

## Component conventions

- All styles use `lang="scss"` and `scoped`
- CSS custom properties defined in `global.scss` (`--bg`, `--text`, `--border`, `--radius`, etc.)
- `.grid` / `.list` class toggle on `.system-container` for view mode switching (`viewMode` ref in `Home.vue`)
- `SystemCard` receives `system` object + `viewMode` string
- `getCategoryIcon(iconName)` in `Home.vue` maps icon names to inline SVG render functions via `h()`

## Known quirks

- **No loading state for categories** — `fetchCategories` does not exist; `loading` only covers the initial portal.json fetch
- **No error boundaries** — fetch error only logs to console, no user-facing error state
- **No pagination** — all data rendered at once
- **No PWA** — `manifest.webmanifest` and service worker files absent despite planning doc mention
- **No mobile nav** — sidebar hidden at ≤768px with no hamburger menu fallback
