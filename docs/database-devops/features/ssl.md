---
title: Secure Database Connectivity with SSL
sidebar_label: Database SSL Support
description: Learn more about how to set up databases with SSL connection using Harness Database DevOps.
sidebar_position: 11
keywords: [database ssl, secure connection, ssl configuration, db ssl, database security, harness dbdevops, ssl setup, ssl certificate, encrypted db connection, database encryption]
tags: [ssl-support, secure-db-connection, database-security, harness-db-devops, ssl-configuration]
slug: /database-devops/use-database-devops/ssl
---

This document explains how to configure SSL certificates for Harness Database DevOps. There are two distinct SSL scenarios you may need to configure, depending on your infrastructure.

## Which SSL Configuration Do You Need?
Database DevOps uses two independent SSL layers. Most customers need only one, but you may need both:

| Your Situation | What You Need | Go To |
|----------------|---------------|-------|
| Default Harness URL (`app.harness.io`) + public certificates everywhere | No SSL configuration needed | You are all set |
| Custom vanity URL (for example, `yourcompany.harness.io`) | **Scenario 1:** mTLS configuration | [Configure mTLS](#configure-mtls-certificates-for-database-devops-scenario-1) |
| Git or database uses self-signed certificates | **Scenario 2:** Third-party SSL | [Configure Third-Party SSL](#configure-ssl-for-third-party-services-git-and-databases---scenario-2) |
| Vanity URL AND self-signed certificates | **Both scenarios** | Configure both sections in order |

## SSL Architecture Overview
**Scenario 1 - mTLS (Harness SaaS Connectivity):**
- Only required when using a custom vanity URL instead of `app.harness.io`
- Authenticates your delegate and build pods to Harness SaaS using client certificates
- Certificates mounted at `/etc/mtls/client.crt` and `/etc/mtls/client.key`
- Requires `MANAGER_HOST_AND_PORT` environment variable

**Scenario 2 - Third-Party SSL (Git and Database Connectivity):**
- Only required when Git repositories or databases use self-signed certificates
- Makes build pods trust your self-signed CAs
- Certificates mounted at `/etc/ssl/certs/dbops/`
- Requires `CI_MOUNT_VOLUMES` to copy certificates from delegate to build pods

:::warning Common Mistake
Many customers configure the wrong scenario. The two scenarios are independent:
- Vanity URL issues → Configure Scenario 1 (mTLS)
- Git or database certificate errors → Configure Scenario 2 (third-party SSL)
- Connection works from delegate but not in pipeline → Likely missing `CI_MOUNT_VOLUMES` in either scenario
:::

## Configure mTLS Certificates for Database DevOps (Scenario 1)

**When to use:** You have a custom vanity URL (for example, `yourcompany.harness.io`) instead of `app.harness.io`.

### Before You Begin

Complete delegate mTLS setup. Go to [mTLS Support via Delegates](/docs/platform/delegates/secure-delegates/delegate-mtls-support) and configure:
- CA and client certificates
- Certificates mounted at `/etc/mtls/` on the delegate  
- `MANAGER_HOST_AND_PORT` environment variable

Verify the delegate connects to your vanity URL before proceeding.

### Add Database DevOps Configuration

Database DevOps runs in ephemeral build pods that do not inherit the delegate's mTLS certificates. Add these environment variables to the delegate:

```yaml
- name: MANAGER_HOST_AND_PORT
  value: "https://<your-subdomain>.agent.harness.io"

- name: ADDITIONAL_CERTS_PATH
  value: "/etc/mtls/ca.crt"

- name: CI_MOUNT_VOLUMES
  value: "/etc/mtls/client.crt:/etc/mtls/client.crt,/etc/mtls/client.key:/etc/mtls/client.key"
```

| Variable | What It Does |
|----------|--------------|
| `MANAGER_HOST_AND_PORT` | Directs build pods to your vanity URL |
| `ADDITIONAL_CERTS_PATH` | Makes delegate trust the mTLS CA |
| `CI_MOUNT_VOLUMES` | Copies `client.crt` and `client.key` from delegate to build pods at `/etc/mtls/` |

:::warning Why CI_MOUNT_VOLUMES is Critical
Without `CI_MOUNT_VOLUMES`, build pods cannot authenticate to your vanity URL. You will see "Connection Reset" errors even though the delegate works fine.

Cannot use `DESTINATION_CA_PATH`: That variable only mounts CA bundles. mTLS requires both certificate and key files at `/etc/mtls/`, which requires `CI_MOUNT_VOLUMES`.
:::

**Verify the configuration:**

```bash
kubectl exec -it <build-pod> -n <namespace> -- ls -l /etc/mtls/
```

You should see `client.crt` and `client.key`. If missing, check that `CI_MOUNT_VOLUMES` is set on the delegate.

Go to [Certificate issues when using vanity URLs](/docs/platform/delegates/troubleshooting/certificate-issues/#certificate-issues-when-using-vanity-urls) for additional troubleshooting guidance.


## Configure SSL for Third-Party Services (Git and Databases - Scenario 2)

**When to use:** Your Git repositories or databases use self-signed certificates.

This section covers mounting third-party SSL certificates into Database DevOps build pods. If you also use a vanity URL, combine this with [Scenario 1](#configure-mtls-certificates-for-database-devops-scenario-1) by merging both `CI_MOUNT_VOLUMES` values with commas.

---

## 1. SSL Support by Third-Party Integration Type

The following table shows which third-party services support SSL when using self-signed certificates with Database DevOps:

| Service Type | SSL Support | Transport Layer | Certificate Mounting | Notes |
| ------------ | ----------- | --------------- | ------------------ | ------------ |
| Git (Schema Cloning)         | ✅ Yes       | HTTPS           | `/etc/ssl/certs/ca-bundle.crt` in build pod | Requires `CI_MOUNT_VOLUMES` configuration |
| Artifactory (Schema Cloning) | ❌ No        | HTTP            | N/A                                            | SSL not supported for Artifactory-based schema cloning |
| Database Connections (JDBC)  | ✅ Yes       | JDBC over SSL   | Certificates imported into Java truststore    | Requires `INIT_SCRIPT` configuration. Go to [Connector Setup Guide](/docs/database-devops/use-database-devops/set-up-connectors) |

:::info How Database DevOps Handles Certificates
Harness Database DevOps reuses the same Kubernetes build infrastructure mechanisms as Harness CI for certificate handling. Certificates must be mounted from the delegate into ephemeral build pods.

If you are unfamiliar with certificate mounting in Kubernetes build pods, go to [Configure a Kubernetes build farm to use self-signed certificates](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates) to understand the underlying architecture.
:::

## 2. Prepare Required Certificates

Before configuring SSL, ensure you have the following certificate files for your third-party services (Git and databases):

**Required Certificates:**

- **CA Bundle** (`ca.bundle` or `ca.crt`): Root and intermediate CA certificates that sign your Git server or database server certificates
  - In most environments, a single CA signs both client and server certificates
  - If separate CAs are used, concatenate both into a single bundle file
  - For databases such as Microsoft SQL Server, ensure you include the complete certificate chain (root + intermediate). A server/leaf certificate alone will result in PKIX path building failures.

- **Client Certificate** (`client.crt`): Your client authentication certificate (required only if your Git or database server requires client certificate authentication)

- **Client Key** (`client.key`): The private key corresponding to the client certificate

:::info Certificate Source
These certificates come from your Git server or database administrator, **not from Harness**. If you need help generating certificates, contact your infrastructure team or go to [Generate client certificates](/docs/platform/delegates/secure-delegates/delegate-mtls-support/#create-a-client-certificate) for OpenSSL examples.

Do not confuse these with mTLS certificates used to connect to Harness SaaS. Those are separate and documented at [mTLS Support via Delegates](/docs/platform/delegates/secure-delegates/delegate-mtls-support).
:::

:::info note
**Minimum versions**
* **db-devops-service** -  `1.32.x`
* **drone-liquibase** -  `plugins/drone-liquibase:1.1.0-4.27`
* **drone-liquibase-mongo** -  `plugins/drone-liquibase:1.1.0-4.27-mongo`
* **drone-liquibase-spanner** -  `plugins/drone-liquibase:1.1.0-4.27-spanner`
:::

:::info How SSL trust is applied
There are three places where certificate configuration can matter:

- **Delegate container trust**: controlled by `ADDITIONAL_CERTS_PATH`
- **Ephemeral build pod / Database DevOps step trust**: controlled by `CI_MOUNT_VOLUMES`
- **JDBC test connection inside the delegate**: may additionally require `INIT_SCRIPT` if client certificates need to be imported into the Java truststore

If SSL works in one place but fails in another, verify which runtime is actually failing before changing the certificate configuration.
:::

## 3. Create the Kubernetes Secret

Create a Kubernetes secret containing all certificates.

```shell
kubectl create secret -n <namespace> generic dbops-ssl-secret \
  --from-file=ca.bundle \
  --from-file=client.crt \
  --from-file=client.key
```

:::info note
Ensure that the key names (`ca.bundle`, `client.crt`, `client.key`) match exactly with what your database client expects. If your database client expects ca.crt instead of ca.bundle:

```shell
kubectl create secret -n <namespace> generic dbops-ssl-secret \
  --from-file=ca.crt=ca.bundle \
  --from-file=client.crt \
  --from-file=client.key
```
:::

## 4. Mount Certificates into the Delegate

1. Modify the delegate manifest file to include a volume mount. Add the following YAML under `spec.template.spec.containers`

```shell
volumeMounts:
  - mountPath: /opt/harness-delegate/ca-bundle/
    name: custom-certs
    readOnly: true
```

2. Add the following under `spec.template.spec`. Add the secret name with the value you used when you created the kubernetes secret.

```shell
securityContext:
  fsGroup: 1001
volumes:
  - name: custom-certs
    secret:
      secretName: dbops-ssl-secret
      defaultMode: 0440
```

`dbops-ssl-secret` is the name of the secret created in the previous step. Ensure that the secret name matches.

3. Set Environment Variables
  - `ADDITIONAL_CERTS_PATH` ensures the delegate trusts the CA
  - `CI_MOUNT_VOLUMES` injects certs into ephemeral build pods
  - **`DESTINATION_CA_PATH` cannot be used because multiple certs must be mounted independently**

:::important warning
**Do not use `DESTINATION_CA_PATH` when using `CI_MOUNT_VOLUMES` to mount certificates into build pods. Instead, use the `ADDITIONAL_CERTS_PATH` environment variable to specify the path to the certificates on the delegate.**
:::

Add the following environment variables to the delegate:

```shell
- name: ADDITIONAL_CERTS_PATH
  value: "/opt/harness-delegate/ca-bundle/ca.bundle"

- name: CI_MOUNT_VOLUMES
  value: "/opt/harness-delegate/ca-bundle/ca.bundle:/etc/ssl/certs/dbops/root_ca.crt,/opt/harness-delegate/ca-bundle/client.key:/etc/ssl/certs/dbops/client.key,/opt/harness-delegate/ca-bundle/client.crt:/etc/ssl/certs/dbops/client.crt"
```

:::info note
When using `CI_MOUNT_VOLUMES`, the mounted file paths must be:
  * `/etc/ssl/certs/dbops/root_ca.crt`
  * `/etc/ssl/certs/dbops/client.crt`
  * `/etc/ssl/certs/dbops/client.key`

These destination paths are required for the Database DevOps step and should not be changed.

Also, you must set the `ADDITIONAL_CERTS_PATH` environment variable when using `CI_MOUNT_VOLUMES`.
:::

:::warning Mount path guidance
Avoid mounting additional certificate secrets as nested directories under `/opt/harness-delegate/ca-bundle/` (for example, `/opt/harness-delegate/ca-bundle/mssql/`) when the delegate is expected to scan/import certificates from that location.

Prefer exposing certificate files directly under `/opt/harness-delegate/ca-bundle/`, or add the required certificate into the existing secret already mounted there.
:::

**Why this matters:**

  - `ADDITIONAL_CERTS_PATH` ensures the delegate trusts the database CA
  - `CI_MOUNT_VOLUMES` injects certs into ephemeral build pods
  - **`DESTINATION_CA_PATH` is not used because multiple certs must be mounted independently**

Restart the delegate after applying all changes.

:::info If Using a Vanity URL
If you also use a custom vanity URL (Scenario 1), combine these third-party SSL certificates with your mTLS configuration. Go to [Configure mTLS Certificates for Database DevOps](#configure-mtls-certificates-for-database-devops-scenario-1) for instructions on combining both scenarios.
:::

## 5. Enable JDBC SSL Truststore Support

Add the following to the delegate environment:

```shell
- name: INIT_SCRIPT
  value: |-

    openssl pkcs12 -export -in /opt/harness-delegate/ca-bundle/client.crt -inkey /opt/harness-delegate/ca-bundle/client.key -out client.p12 -name client_pkcs12 -password pass:changeit

    keytool -importkeystore -destkeystore $JAVA_HOME/lib/security/jssecacerts -srckeystore client.p12 -srcstoretype PKCS12 -alias client_pkcs12 -storepass changeit -srcstorepass changeit -noprompt
```

**What this does ?**
- Combines client cert and key into a PKCS12 file
- Imports it into the Java truststore
- Enables JDBC SSL authentication during test connections

:::info note
* `INIT_SCRIPT` is required because the JDBC Test Connection runs inside the delegate container.
* The delegate automatically imports `ca.bundle` into the default trust store (`$JAVA_HOME/lib/security/cacerts`).
* Learn more: [Override trust store for delegates](https://developer.harness.io/docs/platform/delegates/secure-delegates/trust-store-override-for-delegates/)
:::

### Verification

If the setup is successful, logs in the step will look like below:
![Verification Logs](./static/db-devops-ssl.png)

You can also validate the mounted files inside the delegate pod:

```shell
kubectl exec -it <delegate-pod> -n <namespace> -- printenv | grep -E 'ADDITIONAL_CERTS_PATH|CI_MOUNT_VOLUMES|DESTINATION_CA_PATH'
kubectl exec -it <delegate-pod> -n <namespace> -- ls -l /opt/harness-delegate/ca-bundle/
```

## Troubleshoot Common Issues

| Issue | Likely Cause | Resolution |
| ---- | ---- | ---- |
| SSL handshake failure | CA not trusted | Verify `ADDITIONAL_CERTS_PATH` points to the correct CA bundle |
| JDBC test fails | Client cert not imported | Check `INIT_SCRIPT` configuration |
| JDBC test fails | Client cert not imported | Check `INIT_SCRIPT` configuration |
| Works locally, fails in pipeline | Certs not mounted in build pod | Verify `CI_MOUNT_VOLUMES` and confirm the files exist at `/etc/ssl/certs/dbops/...` |
| Connection reset error with vanity URL | `MANAGER_HOST_AND_PORT` not set or mTLS certs not copied to build pods | Verify `MANAGER_HOST_AND_PORT` is set to `https://<your-subdomain>.agent.harness.io` AND verify `CI_MOUNT_VOLUMES` copies mTLS certificates to `/etc/mtls/` in build pods |
| Build pod connects to wrong Harness endpoint | Missing or incorrect `MANAGER_HOST_AND_PORT` | Ensure `MANAGER_HOST_AND_PORT` is set on the delegate and copies to build pods via environment propagation |
| `keytool` reports `Is a directory` | Mounted path resolves to a directory instead of a file | Check the secret mount layout and avoid nested directory mounts under `/opt/harness-delegate/ca-bundle/` |
| PKIX error persists after mounting certs | Wrong certificate type or incomplete certificate chain | Confirm you are using the correct CA/root/intermediate certificate chain, not only the server certificate |
| Confused which SSL scenario applies | Misunderstanding of mTLS vs third-party SSL | Review the decision guide at the top of this document to identify which scenario applies to your setup |
| Changes not applied | Delegate not restarted | Restart delegate after any configuration changes |
| Confused which SSL scenario applies | Misunderstanding of mTLS vs third-party SSL | Review the decision guide at the top of this document to identify which scenario applies to your setup |
| Changes not applied | Delegate not restarted | Restart delegate after any configuration changes |

## PostgreSQL SSL configuration

PostgreSQL JDBC connections require `ssl=true` and use `sslmode` to control certificate verification:

- `sslmode=require` — encrypts connection without verifying server certificate
- `sslmode=verify-full` — verifies server certificate using CA bundle

**When using `sslmode=verify-full`:**

PostgreSQL JDBC driver defaults to `/root/.postgresql/root.crt` for certificate lookup, ignoring Java's truststore. Add `sslrootcert` to your JDBC URL to specify the mounted certificate location:

```
jdbc:postgresql://<host>:5432/<db>?ssl=true&sslmode=verify-full&sslrootcert=/etc/ssl/certs/dbops/root_ca.crt
```

:::info note
The certificate file must be mounted at `/etc/ssl/certs/dbops/root_ca.crt` in the delegate using `CI_MOUNT_VOLUMES` as described in [step 4](#4-mount-certificates-into-the-delegate). This path is required and should not be changed.
:::

## References
* [Installing Delegates with Custom Certificates](https://developer.harness.io/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs/)
* [Delegate MTLS Support](https://developer.harness.io/docs/platform/delegates/secure-delegates/delegate-mtls-support/)
