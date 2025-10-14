### Mount Custom Certificates on Windows Build VMs

:::note
This configuration applies to Harness CI VM Runners used for Windows build VMs.
:::

You can make custom CA certificates available inside all build step containers (including the `drone/git` clone container) on **Windows build VMs** by setting the `DRONE_RUNNER_VOLUMES` environment variable when starting the VM runner.

#### Example

```bash
docker run -d \
  -v /runner:/runner \
  -p 3000:3000 \
  -e DRONE_RUNNER_VOLUMES=/custom-cert:/git/mingw64/ssl/certs \
  <your_registry_domain>/drone/drone-runner-aws:latest \
  delegate --pool /runner/pool.yml
```

#### Notes

* The certificate file inside `/custom-cert` must be named **`ca-bundle.crt`**.
* The `drone-git` container on Windows expects the certificate to be available at
  **`C:\git\mingw64\ssl\certs\ca-bundle.crt`**.
* The `DRONE_RUNNER_VOLUMES` path must use **Linux-style syntax** — use `/` as the path separator and omit the drive letter (`C:`), even though the build VM runs Windows.

