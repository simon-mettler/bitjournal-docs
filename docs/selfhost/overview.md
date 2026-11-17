---
sidebar_position: 1
slug: /selfhost/overview
---

# Self-hosting overview

This guide takes you from an empty server to a running instance, and covers the things you will need to do afterwards.

:::warning

## You are the operator

When you self-host bitjournal, **you** are responsible for running it safely. Nobody does it for you. That includes:

- **Security**: keeping the server, Docker, the operating system and your TLS certificates up to date and the machine locked down.
- **Updates**: installing new bitjournal versions, and reading what they change before you do.
- **Backups**: making them regularly, storing them somewhere else, and testing that you can restore them. If the server dies and you have no backup, your journal is gone.
- **Availability and monitoring**: noticing when it is down and fixing it.
- **Your users' data**: if other people have accounts on your instance, their data is your responsibility too.

If you would rather not do this, use the [hosted version](/pricing) instead.
:::

## How it is built

bitjournal runs as two containers:

| Container | What it does                                                                                                                                                                            |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app`     | The web app and its API, served by one process (Django with gunicorn). It serves the built frontend as well, so there is no separate web server for the frontend. Listens on port 8000. |
| `db`      | A PostgreSQL database that holds all your data.                                                                                                                                         |

You put a reverse proxy with HTTPS in front of the `app` container. Data lives in a Docker volume called `bitjournal_data`.

bitJournal is open source under the GPL-3.0 license. The source is at [github.com/simon-mettler/bitjournal](https://github.com/simon-mettler/bitjournal).

## The guide

1. [Requirements](./requirements.md)
2. [Installation](./installation.md): get an instance running
3. [Configuration](./configuration.md): every environment variable
4. [HTTPS and reverse proxy](./reverse-proxy.md)
5. [Users and registration](./users.md): create your account, close sign-ups, reset passwords
6. [Backup and restore](./backup.md)
7. [Updating](./updating.md)
8. [Security checklist](./security.md)
9. [Troubleshooting](./troubleshooting.md)
