Harness can reference JSON secrets in vault so you can manage your secrets lifecycle independently.

For example, you can store a secret in vault with the following JSON.

```json
path: /<path>/user
value: {
  "username": "sample_user",
  "password": "P@ssw0rd!123",
  "database": {
    "username": "db_user",
    "password": "db_P@ssw0rd!789"
  }
}

```

You can reference the secret path or use XPath for more complex JSON.

```
/<path>/user/database.password
```
