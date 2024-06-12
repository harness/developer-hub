<!-- details>
<summary>Instance scan settings</summary -->

These settings apply to Custom Scan steps when both of these conditions are true:

1. The `policy_type` is `orchestratedScan` or `dataLoad`.
2. The `scan_type` is `instance`.

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Instance domain](#instance-domain)
- [Instance path](#instance-path)
- [Instance protocol](#instance-protocol)
- [Instance port](#instance-port)
- [Instance username](#instance-username)
- [Instance password](#instance-password)

<!-- TOC end -->


#### Instance domain

##### Key
```
instance_domain
```

##### Value
Domain of the application instance to scan. You can include the full path to the app in this field, or split the full path between the `instance_domain` and the `instance_path` settings. Example: `https://myapp.io/portal/us`

#### Instance path

##### Key
```
instance_path
```

##### Value
Path to append to the application instance domain, if you're splitting the full path between the `instance_domain` and the `instance_path` settings. For example, you might specify the domain as `https://myapp.io` and the path as `/portal/us`.

#### Instance protocol

##### Key
```
instance_protocol
```

##### Value
One of the following: `HTTPS` is the default.
```
HTTPS
```
```
HTTP
```

#### Instance port

##### Key
```
instance_port
```

##### Value

The TCP port used by the scanned app.

#### Instance username

##### Key
```
instance_username
```

##### Value

The username for authenticating with the scanned app.

#### Instance password

##### Key
```
instance_password
```

##### Value

You should create a Harness text secret with your encrypted password and reference the secret using the format `<+secrets.getValue("container-access-id")>`. For more information, go to [Add and reference text secrets](/docs/platform/secrets/add-use-text-secrets).
