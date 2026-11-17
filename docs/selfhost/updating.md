---
sidebar_position: 8
---

# Updating

:::caution
Updates are your responsibility. Keep bitjournal, Docker, your operating system and your reverse proxy up to date to receive security fixes.
:::

## Before you update

1. **Make a [backup](./backup.md).** Database migrations run automatically when the new version starts, and **you cannot downgrade** afterwards. The backup is your way back.
2. Read the release notes of the new version, for example on the [GitHub releases page](https://github.com/simon-mettler/bitjournal/releases), for changes that need action from you, such as new environment variables.

## Update with the published image

Change the version in `.env`:

```ini
BITJOURNAL_VERSION=0.2.0
```

then pull and restart:

```bash
docker compose pull
docker compose up -d
```

Check that it came up healthy:

```bash
docker compose ps
docker compose logs --tail 50 app
```

:::info
Pinning a version is recommended. If you use `latest`, the version changes whenever you pull, so you never know what you are running.
:::

## Rolling back

If something went wrong, go back to the version you had before **and** restore the backup you made before updating (see [Backup and restore](./backup.md#restore)). Starting an older version against a database that a newer version has already migrated is not supported.

## PostgreSQL upgrades

The compose file pins PostgreSQL to major version 18. Do not change the `postgres` image to another major version in place: PostgreSQL cannot open data files from another major version. To move to a new major version, dump the database, start a fresh volume on the new version, and restore the dump.

## Keep everything else current

- Update the host's operating system regularly, and enable automatic security updates if you can.
- Update Docker and your reverse proxy.
- Rebuild or pull images regularly so base-image fixes reach you.
