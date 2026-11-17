---
sidebar_position: 7
---

# Backup and restore

:::caution
Backups are your responsibility. bitjournal does not make them for you. Make them regularly, copy them **off the server**, and try a restore now and then to make sure they work.
:::

## What to back up

1. **The database**, which holds all journal data.
2. **Your `.env` file**, which holds `SECRET_KEY` and your passwords. Store it somewhere safe and private, as it contains secrets.

Nothing else needs backing up: the app container holds no data.

## Back up the database

Run from the directory containing `docker-compose.yml`:

```bash
docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' | gzip > bitjournal-$(date +%F).sql.gz
```

This takes a consistent snapshot while the app keeps running. Copy the file to another machine or to storage elsewhere.

To run it automatically, put it in a script and schedule it with cron, for example daily at 03:00:

```cron
0 3 * * * cd /srv/bitjournal && docker compose exec -T db sh -c 'pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB"' | gzip > /srv/backups/bitjournal-$(date +\%F).sql.gz
```

Also decide how many backups to keep, and delete old ones.

## Restore

Restore into a fresh, empty database. This **replaces** the data of a running instance, so do it deliberately.

1. Stop the app so nothing writes to the database:

   ```bash
   docker compose stop app
   ```

2. Recreate the database empty (this deletes the current data):

   ```bash
   docker compose exec db sh -c 'dropdb -U "$POSTGRES_USER" "$POSTGRES_DB" && createdb -U "$POSTGRES_USER" "$POSTGRES_DB"'
   ```

3. Load the dump:

   ```bash
   gunzip -c bitjournal-2026-01-01.sql.gz | docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" "$POSTGRES_DB"'
   ```

4. Start the app again:

   ```bash
   docker compose start app
   ```

To restore onto a **new server**, install as described in [Installation](./installation.md) using your saved `.env` (same `SECRET_KEY`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`), start only the database with `docker compose up -d db`, then follow steps 2 and 3 and start the rest with `docker compose up -d`.

:::caution
Always restore a dump into the **same bitjournal version** it was taken with, then update afterwards.
:::

## Volume snapshots

You can also snapshot the whole `bitjournal_data` volume or the disk of the server. A copy of the files of a running database may be inconsistent, so stop the `db` container first, or prefer the `pg_dump` method above.
