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

Here are sample outputs for the respective JSONPath from the above JSON file:

`test-secret` (without any # key)
 
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

`test-secret#key1`

 ```
 "value1"
 ```

`test-secret#key2`

 ```
{
   "key21": "value21",
   "key22": "value22"
}
```

`test-secret#key3`

 ```
{
   "key31": {
     "key311": "value311"
  }
}
 ```

`test-secret#key3.key31`

 ```
{
   "key311": "value311"
}
```

`test-secret#key3.key31.key311`
 
 ```
  "value311"
 ```

:::important notes

You cannot use a JSON XPath in expressions that reference pre-existing secrets in Vault using a fully-qualified path. For example, `<+secrets.getValue("account.hashicorpvault://myVault/harness/testpath/example")>`.

Harness provides limited support for keys that include dots. Keys with dots only work when the key is present at first level in the JSON. For example:

```json
{
  "key.abc": "some-value",
  "key": {
    "nested.key1": "some-value"
  },
  "key.pqr": {
    "nestedKey": "some-value"
  },
  "pqr.xyz": "some-value",
  "pqr": {
    "xyz": "some-nested-value"
  }
}
```

Here are sample outputs for the respective JSONPath from the above JSON file:

- `/path/to/secret#key.abc` returns `some-value`.
- `/path/to/secret#key.pqr` returns `{"nestedKey": "some-value"}`.
- `/path/to/secret#key.nested.key1` and `key.pqr.nestedKey` are not supported.
- `/path/to/secret#pqr.xyz` returns `some-nested-value` and not `some-value`. (Hierarchical paths take precedence over keys with dots.)

:::

:::warning

Harness does not recommend using keys that include dots and might deprecate support in future releases.

:::
