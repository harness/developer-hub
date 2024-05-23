## Redis authentication
The following authentication and connection details reside on the same machine where the chaos infrastructure is executed. These details are provided in the `/etc/linux-chaos-infrastructure/redis.env` file in the following format:

```
ADDRESS="/path/to/redis/server"
PASSWORD="password"
TLS_AUTH_CERT="/path/tp/tls-cert"
```

:::tip
`PASSWORD` and `TLS_AUTH_CERT` are optional, whereas `ADDRESS` is a mandatory field. You need them only if you have configured your Redis database to facilitate it.
:::


| **ENV name**  | **Description**                                                | **Example**                |
|---------------|----------------------------------------------------------------|----------------------------|
| ADDRESS       | Location where the Redis server is running.                    | `https://redis-server.com` |
| PASSWORD      | Password to connect to the Redis database.                     | `password`                 |
| TLS_AUTH_CERT | File path to the location where the TLS certificate is stored. | `/path/to/file`            |