---
sidebar_position: 5
---

# HTTPS and reverse proxy

How you set this up depends heavily on your tools and your network: what runs on your server already, whether you use Docker networks, a hosting panel, a router at home, and so on. This page therefore explains the concept and the bitjournal settings that matter, so you can apply it to your own setup.

:::caution
**HTTPS is required**, not just recommended. bitjournal keeps users logged in with a `Secure` cookie, which browsers only send over HTTPS. Without it, you are logged out again right away.
:::

## The concept

The `app` container serves bitjournal over plain HTTP on port 8000. That is fine inside your server, but not on the internet. A **reverse proxy** sits in front of it:

```text
Browser ──HTTPS──> reverse proxy ──HTTP──> bitjournal (port 8000)
```

- The browser connects to your domain over **HTTPS**. The proxy holds the certificate and encrypts the traffic.
- The proxy forwards the requests to bitjournal and returns the answers.
- Certificates are issued for your domain by a certificate authority, and expire regularly. Use a tool or service that **renews them automatically**, and make sure you notice if renewal fails.

:::info
Popular tools for this are [Caddy](https://caddyserver.com), [Traefik](https://traefik.io/traefik), [nginx](https://nginx.org), [Nginx Proxy Manager](https://nginxproxymanager.com) and [Apache](https://httpd.apache.org). Free certificates are commonly issued by [Let's Encrypt](https://letsencrypt.org). Some of them handle certificates automatically, others need an extra tool. Pick one that fits your setup and follow its own documentation.
:::

## Reaching the app

The proxy has to be able to reach the container on port 8000. There are two common ways:

- **Proxy on the same machine, outside Docker.** Use the published port. Set `APP_PORT=127.0.0.1:8000` and forward to `127.0.0.1:8000`. See [Configuration](./configuration.md#docker).
- **Proxy in a container on a shared Docker network.** Attach the `app` container to that network and forward to it by name and port 8000. You then don't need to publish a port. Attach **only `app`** to the shared network, not the database, and give `app` a unique network alias, since names like `app` and `db` can clash with other projects on the same network.

Whichever way you choose, the app should be reachable **only through the proxy**.

## Private networks and tunnels

You can also reach bitjournal through a private network (a VPN or mesh network) or a tunnel service instead of opening ports on your server. That works, but **it doesn't remove the HTTPS requirement.**

Such tools often encrypt the connection themselves, but your browser doesn't know that. If you open bitjournal over plain `http://` using a private IP address or machine name, the browser won't store or send the `Secure` login cookie, so you will be logged out right away.

So make sure the address you actually open in the browser:

- starts with `https://` and has a certificate the browser trusts (many of these tools can issue one for you),
- is the host name you put in `ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS`, and in `SITE_URL` if you use email,
- reaches bitjournal with that `Host` header unchanged.

## Firewall

Only the ports of your proxy (usually 80 and 443) and SSH should be reachable from the internet. Do not publish the database port, and do not leave bitjournal's own port open to the outside.

:::caution
Docker changes firewall rules itself, so a port you publish can be reachable even if a host firewall seems to block it. Bind published ports to `127.0.0.1` (as above) or don't publish them.
:::

## Check it

Open your domain. You should see the login page, and the browser should show a valid certificate. `https://<your domain>/api/health/` should return `{"status":"ok"}`.

If something is off, see [Troubleshooting](./troubleshooting.md).
