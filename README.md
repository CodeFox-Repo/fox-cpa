# Fox CPA

A deliberately small, single-file Web UI (React + TypeScript) for the **CLI Proxy API** Management API. It is tailored for local OAuth account pools: only **Auth Files** and **Quota Management** are exposed.

[中文文档](README_CN.md)

**Upstream CLI Proxy API**: https://github.com/router-for-me/CLIProxyAPI
**Example URL**: https://remote.router-for.me/  
**Minimum Required Version**: ≥ 7.1.0 (recommended latest)

Since version 6.0.19, the Web UI ships with the main program; access it via `/management.html` on the API port once the service is running.

## Scope

- This repository is the Web UI only. It talks to the CLI Proxy API **Management API** (`/v0/management`).
- The main navigation and client routes are intentionally limited to **Auth Files** and **Quota Management**. All other panel routes redirect to Auth Files.
- It is **not** a proxy and does not forward traffic.

## Original project

Fox CPA is a focused fork of [Cli-Proxy-API-Management-Center](https://github.com/router-for-me/Cli-Proxy-API-Management-Center). The upstream project remains the source for the complete management UI.

## Quick start

### Option A: Use the Web UI bundled in CLI Proxy API (recommended)

1. Start your CLI Proxy API service.
2. Open: `http://<host>:<api_port>/management.html`
3. Enter your **management key** and connect.

The address is auto-detected from the current page URL; manual override is supported.

### Option B: Run the dev server

```bash
bun install --frozen-lockfile
bun run dev
```

Open `http://localhost:5173`, then connect to your CLI Proxy API backend instance.

### Option C: Build a single HTML file

```bash
bun install --frozen-lockfile
bun run build
```

- Output: `dist/index.html` (all assets are inlined).
- For CLI Proxy API bundling, the release workflow renames it to `management.html`.
- To preview locally: `bun run preview`

Tip: opening `dist/index.html` via `file://` may be blocked by browser CORS; serving it (preview/static server) is more reliable.

## Connecting to the server

### API address

You can enter any of the following; the UI will normalize it:

- `localhost:8317`
- `http://192.168.1.10:8317`
- `https://example.com:8317`
- `http://example.com:8317/v0/management` (also accepted; the suffix is removed internally)

### Management key (not the same as API keys)

The management key is sent with every request as:

- `Authorization: Bearer <MANAGEMENT_KEY>` (default)

This is different from the proxy `api-keys` you manage inside the UI (those are for client requests to the proxy endpoints).

### Remote management

If you connect from a non-localhost browser, the server must allow remote management (e.g. `allow-remote-management: true`).  
Check the CLI Proxy API server documentation/config comments for the full authentication rules, server-side limits, and edge cases.

## Included pages

- **Auth Files**: inspect, upload, download, or delete OAuth credential files, plus per-account OAuth exclusions and model aliases.
- **Quota Management**: inspect the provider quota limits and usage that CPA reports.

## Tech Stack

- React 19 + TypeScript 6.0
- Vite 8 (single-file build)
- Zustand (state management)
- Axios (HTTP client)
- react-router-dom v7 (HashRouter)
- Motion (animations)
- CodeMirror 6 (YAML editor)
- SCSS Modules (styling)
- i18next (internationalization)

## Internationalization

Currently supports four languages:

- English (en)
- Simplified Chinese (zh-CN)
- Traditional Chinese (zh-TW)
- Russian (ru)

The UI language is automatically detected from browser settings and can be manually switched from the login page or header language menu.

## Browser Compatibility

- Build target: `ES2020`
- Supports modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive layout for mobile and tablet access

## Build & release notes

- Vite produces a **single HTML** output (`dist/index.html`) with all assets inlined (via `vite-plugin-singlefile`).
- To replace the local CPA panel, copy the built file to CPA's `static/management.html` and set `remote-management.disable-auto-update-panel: true` in CPA's config.

## Security notes

- The management key is stored in browser `localStorage` using a lightweight obfuscation format (`enc::v1::...`) to avoid plaintext storage; treat it as sensitive.
- Use a dedicated browser profile/device for management. Be cautious when enabling remote management and evaluate its exposure surface.

## Troubleshooting

- **Can’t connect / 401**: confirm the API address and management key; remote access may require enabling remote management in the server config.
- **Repeated auth failures**: the server may temporarily block remote IPs.
- **Logs page missing**: enable “Logging to file” in Basic Settings; the navigation item is shown only when file logging is enabled.
- **Some features show “unsupported”**: the backend may be too old or the endpoint is disabled/absent (common for model lists per auth file, excluded models, logs).
- **OpenAI provider test fails**: the test runs in the browser and depends on network/CORS of the provider endpoint; a failure here does not always mean the server cannot reach it.

## Development

```bash
bun run dev        # Vite dev server
bun run build      # tsc + Vite build
bun run preview    # serve dist locally
bun run test       # Bun test suite
bun run lint       # ESLint (fails on warnings)
bun run verify     # test + lint + build
bun run format     # Prettier
bun run type-check # tsc --noEmit
```

## Contributing

Issues and PRs are welcome. Please include:

- Reproduction steps (server version + UI version)
- Screenshots for UI changes
- Verification notes (`bun run verify`, plus `bun run type-check` when run separately)

## License

MIT
