---
sidebar_position: 10
---

# Troubleshooting

First, look at the state and the logs:

```bash
docker compose ps
docker compose logs --tail 100 <bitjournal-app-name>
docker compose logs --tail 100 <bitjournal-db-name>
```

## Invalid HTTP_HOST header / Bad Request (400)

The host name in the request is not in `ALLOWED_HOSTS`. Add your domain (without scheme or port), apply with `docker compose up -d`, and make sure your reverse proxy passes the original `Host` header.

## Login works but you are logged out immediately

The session cookie is `Secure` and is only sent over HTTPS. Open the site through your HTTPS address, not over plain HTTP or by IP. See [HTTPS and reverse proxy](./reverse-proxy.md).

## "CSRF verification failed" in the admin

Set `CSRF_TRUSTED_ORIGINS` to your full origin, e.g. `https://bitjournal.example.com` and apply it with `docker compose up -d`.

## The app container restarts or is "unhealthy"

- Check `docker compose logs app`. The line `Database not reachable` means it could not connect within `DB_WAIT_TIMEOUT` seconds.
- Make sure `DB_PASSWORD`, `DB_USER` and `DB_NAME` still match what the database volume was created with. See the note in [Configuration](./configuration.md#database).
- The health check calls `/api/health/` with a host from `ALLOWED_HOSTS`. Make sure that variable is set.

## `docker compose` complains "set XXX in .env"

A required variable is empty. Check the variables in `.env`.

## Registration page shows an error or redirects to login

Registration is closed (`REGISTRATION_ENABLED=false`). See [Users and registration](./users.md#closing-registration).

## No password reset email arrives

Email is only active when `RESEND_API_KEY`, `DEFAULT_FROM_EMAIL` and `SITE_URL` are all set, and the sender domain is verified in Resend. Try `docker compose exec app python manage.py sendtestmail you@example.com` and read the output and logs.

## My data is gone after recreating containers

Containers are disposable, the `bitjournal_data` volume is not. Check `docker volume ls`. If you changed `COMPOSE_PROJECT_NAME` or moved the directory, Compose may have created a new, empty volume under a different prefix.
:::warning
Do not blindly run commands and never run `docker compose down -v` unless you want to delete the data.
:::
