Harness allows you to manage the lifecycle of your secrets independently by referencing JSON secrets in the vault.

For example, you can store a secret in vault with the following JSON.

```json

{
  "username": "sample_user",
  "password": "P@ssw0rd!123",
  "database": {
    "username": "db_user",
    "password": "db_P@ssw0rd!789"
  }
}

```

To reference a JSON secret and password stored in `/<path>/user`, you need to create a reference secret with the following format: `/<path>/user#database.password`.
