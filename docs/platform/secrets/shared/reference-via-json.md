Harness allows you to manage the lifecycle of your secrets independently by referencing JSON secrets in the vault.

For example, you can store a secret in vault with the following JSON.

```json
{
  "key1": "value1",
  "key2": {
    "key21": "value21",
    "key22": "value22"
  },
  "key3": {
    "key31": {
      "key311": "value311"
    }
  }
}

```

To reference a JSON secret and password stored in `/<path>/user`, create a reference secret with the following format: `/<path>/user#database.password`.
