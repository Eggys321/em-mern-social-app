# EM — client

React 18 + Vite front end for the EM social app. See the [repo root README](../README.md) for the full-stack overview.

## Setup

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` to point the app at a different API (defaults to the deployed API — see `VITE_API_URL` in `.env.example`).

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — ESLint

## Notable conventions

- **API calls** go through `src/api/client.js` (`get`/`post`/`patch`/`del`) instead of raw `fetch()` — it resolves the base URL from `VITE_API_URL`, attaches the auth token, and normalizes errors into a thrown `ApiError`.
- **Routing** (`src/App.jsx`) is code-split with `React.lazy`; authenticated routes are gated by `src/components/ProtectedRoute.jsx`.
- **Per-page SEO** (title/description/indexability) goes through `src/components/Seo.jsx` instead of `document.title`.
- **Design tokens + shared utility classes** (`.avatar`, `.card-surface`, `.btn-icon`, `.sr-only`, focus states, dark-mode variables) live in `src/index.css`.
