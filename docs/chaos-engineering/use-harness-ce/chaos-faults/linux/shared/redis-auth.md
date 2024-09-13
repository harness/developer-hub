## Redis authentication
The following authentication and connection details reside on the same machine where the chaos infrastructure is executed. These details are provided in the `/etc/linux-chaos-infrastructure/redis.env` file in the following format:

```
ADDRESS="127.0.0.1:6379"
PASSWORD=XXXXXXXX
TLS_AUTH_CERT="/path/to/tls-cert"
```

:::tip
`ADDRESS` is a mandatory field. You can also include `PASSWORD` and `TLS_AUTH_CERT` fields. You need them only if you have configured your Redis database to facilitate authentication.
:::


| **ENV name**  | **Description**                                                | **Example**        |
|---------------|----------------------------------------------------------------|--------------------|
| ADDRESS       | Location where the Redis server is running.                    | `redis-server.com` |
| PASSWORD      | Password to connect to the Redis database.                     | `password`         |
| TLS_AUTH_CERT | File path to the location where the TLS certificate is stored. | `/path/to/file`    |
