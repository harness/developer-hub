## Redis authentication
:::note
If your Redis server doesn't require authentication, you can directly provide the `ADDRESS` tunable, that refers to the Redis server address. Refer [here](#optional-tunables).
:::

If your application requires a secret or authentication, provide the `ADDRESS`, `PASSWORD` and the TLS authentication certificate. Create a Kubernetes secret (say `redis-secret`) in the namespace where the fault executes. A sample is shown below.

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
```

After creating the secret, mount the secret into the experiment, and reference the mounted file path using the `SECRET_FILE_PATH` environment variable in the experiment manifest. A sample is shown below.

```yaml
apiVersion: litmuschaos.io/v1alpha1
kind: K8sFault
metadata:
  name: redis-cache-penetration
spec:
  definition:
    chaos:
      env:
        ...  # other env
        ...  # other env
        - name: SECRET_FILE_PATH
          value: "/tmp/redis-secret.yaml"
      components:
        secrets:   # Kubernetes secret mounted
          - name: cloud-secret
            mountPath: /tmp/
```

