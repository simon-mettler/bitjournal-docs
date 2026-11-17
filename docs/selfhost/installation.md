---
sidebar_position: 3
---

# Installation

This sets up bitjournal with Docker Compose. Read the [overview](./overview.md) first if you have not.

## 1. Get the files

On your server: create a directory for the instance and download the compose file and the example configuration:

```bash
mkdir bitjournal && cd bitjournal
curl -O https://raw.githubusercontent.com/simon-mettler/bitjournal/main/deploy/docker-compose.yml
curl -o .env https://raw.githubusercontent.com/simon-mettler/bitjournal/main/.env.example
chmod 600 .env
```

`.env` will contain secrets, so only your user should be able to read it.

## 2. Configure

Open `.env` and set at least the following. All variables are described in [Configuration](./configuration.md).

```ini
# Generate with: python3 -c "import secrets; print(secrets.token_urlsafe(50))"
SECRET_KEY=<long random string>

# Your domain
ALLOWED_HOSTS=bitjournal.example.com
CSRF_TRUSTED_ORIGINS=https://bitjournal.example.com

DB_PASSWORD=<a strong password>

# Port on the server where the app listens. It must be free, i.e. not used by another program
APP_PORT=127.0.0.1:8000

# Pin the version so updates are deliberate
BITJOURNAL_VERSION=0.1.0
```

:::caution
Keep `DEBUG=false`. Never publish your `.env`, and keep a copy of it in your backups. If you lose `SECRET_KEY` or change it, all users are logged out and outstanding password-reset links stop working.
:::

## 3. Start

```bash
docker compose up -d
```

On first start the `app` container waits for the database, applies the database migrations and starts the server. Follow it with:

```bash
docker compose logs -f app
```

When you see `Starting gunicorn...` it is running. Check the health endpoint from the server:

```bash
curl -H "Host: bitjournal.example.com" http://127.0.0.1:8000/api/health/
# {"status":"ok"}
```

(The `Host` header has to match `ALLOWED_HOSTS`, otherwise Django rejects the request.)

## 4. Put HTTPS in front

Set up a reverse proxy with a certificate. See [HTTPS and reverse proxy](./reverse-proxy.md).

## 5. Create your account

See [Users and registration](./users.md). If you are the only user, create your account and then close registration.
