## Redis authentication
:::note
If your Redis server doesn't require authentication, you can directly provide the `ADDRESS` tunable, that refers to the Redis server address. Refer [here](#optional-tunables).
:::

If your application requires a secret or authentication, provide the `ADDRESS`, `PASSWORD` and the TLS authentication certificate. Create a Kubernetes secret and mount it.

The following authentication and connection details reside on the same machine where the chaos infrastructure is executed.

A sample `redis-secret.yaml` file is shown below:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: redis-secret  # Name of the Secret
type: Opaque       # Default Secret type
stringData:
  redis-secret.yaml: |-
    address: 34.136.111.6:6379
    password: mypass
    tlsCertFile: <cert>
components:
  secrets:   # Kubernetes secret mounted
    - name: cloud-secret
      mountPath: /tmp/
```
