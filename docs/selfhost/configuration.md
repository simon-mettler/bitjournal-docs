---
sidebar_position: 4
---

# Configuration

bitjournal is configured through environment variables, which Docker Compose reads from the `.env` file next to `docker-compose.yml`. After changing `.env`, apply it with:

```bash
docker compose up -d
```

## Django

| Variable               | Default                         | Description                                                                                                                                                       |
| ---------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SECRET_KEY`           | none, **required**              | Long random secret used to sign tokens and links. Keep it private and stable. Generate one with `python3 -c "import secrets; print(secrets.token_urlsafe(50))"`.  |
| `ALLOWED_HOSTS`        | `localhost` in the example file | Comma-separated host names the app is served under, without scheme or port, e.g. `bitjournal.example.com`. Requests with another `Host` header are rejected.      |
| `CSRF_TRUSTED_ORIGINS` | none                            | Comma-separated origins **with scheme** trusted for form posts, e.g. `https://bitjournal.example.com`. Needed for logging in to the admin behind a reverse proxy. |
| `DEBUG`                | `false`                         | Keep `false` in production. In debug mode, cookies are not marked `Secure` and detailed error pages are shown.                                                    |
| `CORS_ALLOWED_ORIGINS` | empty                           | Only used when `DEBUG=true`, for the frontend dev server. Leave empty.                                                                                            |

## Database

| Variable      | Default            | Description                                                                                               |
| ------------- | ------------------ | --------------------------------------------------------------------------------------------------------- |
| `DB_NAME`     | `bitjournal`       | Database name. Also used to create the database on first start.                                           |
| `DB_USER`     | `bitjournal`       | Database user.                                                                                            |
| `DB_PASSWORD` | none, **required** | Database password. Choose a strong one.                                                                   |
| `DB_HOST`     | `db`               | Only used when running the backend outside Compose. The compose file always connects to the `db` service. |
| `DB_PORT`     | `5432`             | As above.                                                                                                 |

:::caution
`DB_NAME`, `DB_USER` and `DB_PASSWORD` initialise the database **the first time** the volume is created. Changing them later in `.env` does not change the existing database, and the app will no longer be able to connect. To change the password afterwards, change it in PostgreSQL too (`ALTER USER`) and then update `.env`.
:::

## Instance

| Variable               | Default | Description                                                                                      |
| ---------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| `REGISTRATION_ENABLED` | `true`  | Set to `false` to close sign-ups. See [Users and registration](./users.md#closing-registration). |
| `INSTANCE_NOTICE`      | empty   | Optional message for your users, available from `GET /api/config/`.                              |

## Email

Emails are sent through [Resend](https://resend.com). Email is enabled only when **all three** of `RESEND_API_KEY`, `DEFAULT_FROM_EMAIL` and `SITE_URL` are set.

| Variable             | Default | Description                                                                                        |
| -------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | empty   | Your Resend API key.                                                                               |
| `DEFAULT_FROM_EMAIL` | empty   | Sender address. Must be on a domain you verified in Resend.                                        |
| `SITE_URL`           | empty   | Public URL of your instance, e.g. `https://bitjournal.example.com`. Used to build links in emails. |
| `EMAIL_CATCH_ALL`    | empty   | Development only: send every email to this address instead of the real recipient. Leave empty.     |

## Docker

| Variable               | Default        | Description                                                                                                                                                                                                                 |
| ---------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BITJOURNAL_VERSION`   | `latest`       | Image tag the compose file pulls. Pin it, e.g. `0.1.0`.                                                                                                                                                                     |
| `APP_PORT`             | `8000`         | Port on the **server** where the app is published. It must be free (not used by another program). The port inside the container stays 8000. Write it as `127.0.0.1:8000` to accept connections from the server itself only. |
| `WEB_CONCURRENCY`      | `3`            | Number of gunicorn worker processes.                                                                                                                                                                                        |
| `DB_WAIT_TIMEOUT`      | `60`           | Seconds the app waits for the database on start before giving up.                                                                                                                                                           |
| `COMPOSE_PROJECT_NAME` | directory name | Prefix for container and volume names. Do not change it after the first start, or Compose will create a new, empty volume.                                                                                                  |
