---
sidebar_position: 2
---

# Requirements

## Server

- A Linux server or VM that you can reach over SSH and keep running around the clock.
- **Docker Engine** with the **Compose plugin** (`docker compose`, version 2). See the [Docker install docs](https://docs.docker.com/engine/install/).
- Disk space for the database and your backups.

## Network

- A **domain name** pointing at the server, for example `bitjournal.example.com`.
- **HTTPS is required.** Logins are kept alive by a `Secure` cookie, which browsers only send over HTTPS. Without it you will be logged out again straight away. See [HTTPS and reverse proxy](./reverse-proxy.md).

## Optional

- For emails: a [Resend](https://resend.com) account and a verified sending domain, if you want password-reset and notification emails.

  :::note
  For selfhosters, bitjournal works fine without email, see [Users and registration](./users.md#email).
  :::
