# Carpentry Companion (AU)

Carpentry Companion (AU) is a GitHub Pages–deployable, offline-ready study and calculation app for Australian carpentry students. It keeps all educational content original and stores only identifiers + summaries for NCC and Standards references.

## Job Mode

Create job folders to log calculations, materials, references, and attachments. Everything is stored locally in IndexedDB and works offline.

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Build output is in `dist/`.

## Tests

```bash
npm test
```

Playwright smoke tests (requires a running dev server):

```bash
npm run dev
npm run test:e2e
```

## GitHub Pages Deploy

This project uses `HashRouter` and `base: "./"` to stay GitHub Pages–friendly.

1. Push to `main`.
2. In GitHub: **Repo → Settings → Pages → Source = GitHub Actions**.
3. GitHub Actions builds and deploys to Pages.

If you need a custom base path later, update `vite.config.ts` and the `deploy.yml` workflow accordingly.

## PWA Notes

PWA is enabled via `vite-plugin-pwa`. The app caches the shell and core content for offline use, shows an offline indicator, and provides an update prompt when new content is available.

## Data Layer (Local Now, API Later)

UI reads all content via a repository interface:

- `src/data/repository/ContentRepository.ts`
- `src/data/repository/LocalJsonRepository.ts`
- `src/data/repository/ApiRepository.ts`

To migrate to an API later, update `src/data/repository/config.ts` to `"api"` and implement the API calls in `ApiRepository`.

## Content Authoring

See `CONTENT_AUTHORING.md` for how to add formulas, lessons, and references without violating standards or NCC licensing.

## Offline Storage & Privacy

All job data (jobs, calculations, materials, references, attachments) is stored locally in IndexedDB. Nothing is uploaded automatically. You control exports and backups.

## Backup Strategy

Use the in-app **Backup & Restore** screen to export a JSON backup. Restoring overwrites current local data, so keep a copy of your existing backup before restore.

## Export Workflow

From a Job, open the Job Report to print or save as PDF. CSV exports for materials and calculations are available from the report page.

## Report Issues

Set `VITE_ISSUE_URL` in your environment (or `.env`) to enable the “Report an issue” link in the footer.

Example:

```
VITE_ISSUE_URL=https://github.com/OWNER/REPO/issues/new
```
