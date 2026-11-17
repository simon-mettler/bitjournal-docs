---
sidebar_position: 9
---

# Security checklist

Running a service on the internet means attackers will find it. Use this as a minimum. It is not a complete security guide.

## Configuration

- `DEBUG=false`.
- `SECRET_KEY` is long, random and unique to this instance.
- `DB_PASSWORD` is strong and not reused anywhere.
- `.env` is readable only by its owner (`chmod 600 .env`), and not committed to a repository.
- `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` list only your own domain.
- `BITJOURNAL_VERSION` is pinned to a version you have chosen.
- `REGISTRATION_ENABLED=false` unless you really want strangers to sign up.

## Network

- The app is only reachable through HTTPS, with a valid certificate that renews automatically.
- `APP_PORT=127.0.0.1:8000`, so the app is not directly reachable from outside.
- The database port is not published.
- A firewall allows only SSH, 80 and 443. Remember Docker's own firewall rules, see [HTTPS and reverse proxy](./reverse-proxy.md#firewall).
- SSH uses keys, not passwords, and root login is disabled.

## Accounts

- Use a strong, unique password for your own account and for any administrator account.
- Limit who has an administrator account (`/admin/` gives full access to all data). If you do not need it, consider blocking `/admin/` in your reverse proxy.

## Operations

- Backups run automatically, are stored off the server, and a restore has been tested. See [Backup and restore](./backup.md).
- The host operating system, Docker, the reverse proxy and BitJournal are kept up to date. See [Updating](./updating.md).
- You notice when the instance is down, for example with an uptime monitor on `/api/health/`.
- You know where the logs are: `docker compose logs app`.

## Reporting a vulnerability

If you find a security problem in bitjournal itself, please report it privately through the [GitHub repository](https://github.com/simon-mettler/bitjournal/security) rather than in a public issue.
