# bitjournal-web

Website and documentation for [bitjournal](https://github.com/simon-mettler/bitjournal), live at [bitjournal.me](https://bitjournal.me). Built with [Docusaurus](https://docusaurus.io).

- `docs/usage/`: how to use the app
- `docs/selfhost/`: how to self-host it
- `src/pages/`: landing, pricing and legal pages

## Contributing

Contributions to the docs are welcome: typo fixes, corrections, clearer wording, and missing or improved guides. Open a pull request, or an issue if you are unsure. For larger additions, open an issue first. Please keep docs accurate to the [bitjournal](https://github.com/simon-mettler/bitjournal) source.

## Development

```bash
npm ci
npm start            # dev server with live reload
npm run typecheck    # type-check
npm run build        # production build into build/
```

The build fails on broken links.

## Deployment

The site is built and served by nginx in Docker.

```bash
docker compose up -d --build
```
