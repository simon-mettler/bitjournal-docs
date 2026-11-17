---
sidebar_position: 6
---

# Users and registration

## Creating your account

The simplest way is to register through the app: open your instance and use the **Register** page. Registration is open by default.

You can also create an administrator from the command line. This account can use the app like any other, and additionally log in to the Django admin at `/admin/`:

```bash
docker compose exec app python manage.py createsuperuser
```

It asks for your email address (which is your login) and a password.

## Closing registration

Anyone who can reach your instance can create an account while registration is open. Once you and the people you want have accounts, close it by setting this in `.env`:

```ini
REGISTRATION_ENABLED=false
```

and applying it:

```bash
docker compose up -d
```

From then on the register endpoint returns `403 Forbidden`, and the app's register page redirects to the login page. Existing accounts are not affected.

To let someone new in later, either open registration briefly (set `REGISTRATION_ENABLED=true`, run `docker compose up -d`, let them register, then close it again), or create the account from the command line:

```bash
docker compose exec app python manage.py shell -c "from django.contrib.auth import get_user_model; get_user_model().objects.create_user(email='person@example.com', password='choose-a-password')"
```

The person should change that password after their first login. Note that the password ends up in your shell history.

:::caution
**Do not add users in Django.**
The Django admins add-user form does not hash passwords. Accounts created there cannot log in correctly. Use registration or the command above.
:::

## Passwords

Users can change their password in the app, and log out of all devices. Passwords must pass Django's standard checks: a minimum length, not too common, not only digits, and not too similar to the email address.

### If a user forgot their password

- **With email configured**, the login page offers a password reset link, which is valid for one hour.
- **Without email**, reset it yourself from the command line:

  ```bash
  docker compose exec app python manage.py changepassword person@example.com
  ```

## Email

Email is optional. Configure it with the variables in [Configuration](./configuration.md#email) to get:

- password reset links,
- confirmation emails when a user changes their address (valid for 24 hours),
- notices that a password or address was changed.

Without email, password reset by link is unavailable and an address change takes effect immediately. To check your setup, send a test mail:

```bash
docker compose exec app python manage.py sendtestmail you@example.com
```

## Deleting accounts

Users can delete their own account in the app, which permanently removes all their signals, boards, events and dashboards. As the operator you can also delete users in the Django admin.
