---
title: Kerberos Authentication for MSSQL and Oracle
sidebar_label: Kerberos Authentication
description: Configure Kerberos authentication for Microsoft SQL Server and Oracle databases in Harness Database DevOps using JDBC and Delegate-based execution.
keywords:
  - kerberos authentication
  - mssql kerberos
  - oracle kerberos
  - jdbc kerberos
  - database devops kerberos
  - harness dbops kerberos
  - integrated security mssql
  - oracle kerberos jdbc
  - keytab configuration
  - krb5.conf setup
tags:
  - harness-db-devops
  - authentication
  - kerberos
  - mssql
  - oracle
  - jdbc
---

Kerberos authentication enables secure, ticket-based authentication between your Harness Delegate and database servers. This guide explains how to configure Kerberos for:
1. Microsoft SQL Server (MSSQL)
2. Oracle Database

It covers Delegate configuration, infrastructure prerequisites, JDBC properties, and connection flow.

## What is Kerberos authentication?
Kerberos is a network authentication protocol that uses tickets to allow nodes to prove their identity securely. When you test a database connection using Kerberos, the Delegate does not send a username and password directly to the database. Instead, it uses Kerberos tickets to prove identity in a secure and standardized way.

The authentication flow happens in a predictable sequence:
1. The Delegate initializes Kerberos configuration using `krb5.conf`.
2. The `kinit` command generates a Ticket Granting Ticket (TGT) using the keytab file or password.
3. The JDBC driver uses the TGT to request a Service Ticket for the target database.
4. The database validates the Service Ticket against its registered SPN.
5. If validation succeeds, the connection is established.

This model improves security and aligns with enterprise identity systems:
- No passwords are transmitted during connection.
- Authentication is validated centrally by the KDC (Active Directory).
- Access control is enforced using standard Kerberos policies.

This approach allows you to integrate database authentication into your DevOps pipelines without compromising security or compliance requirements.

## Prerequisites
Before you begin, ensure you have the following prerequisites in place:
- A Harness account with access to the Database DevOps module.
- Network connectivity between Delegate and:
    - KDC / Active Directory
    - Database server
- Valid Kerberos principal and Keytab file.
- Correct `krb5.conf` configuration.
- Database SPN registered correctly in AD.

## 1. Configure the Delegate for Kerberos
To enable Kerberos authentication, you need to configure the Delegate with the necessary Kerberos files and settings.

Kerberos authentication is executed from the Delegate. The Delegate must:
- Resolve KDC DNS.
- Have `krb5.conf` configured.
- Have access to Keytab file.
- Execute `kinit`.

### 1. DNS resolution (required)
The Delegate must resolve the KDC server hostname. This can be checked by running the following command:

```shell
nslookup <KDC_HOSTNAME>
``` 

This command will attempt to resolve the KDC hostname from the Delegate container. If DNS resolution fails, ensure that the Delegate's network configuration allows access to the KDC and that the correct DNS servers are configured.

### 2. Kerberos configuration
The Delegate needs access to the `krb5.conf` file, which contains Kerberos realm and KDC information. You can provide this file by mounting it as a volume in the Delegate's Kubernetes deployment. Add the following Kerberos startup script to the Delegate YAML under the `INIT_SCRIPT` environment variable:

```yaml
- name: INIT_SCRIPT
  value: |-
    yum install -y krb5-workstation krb5-libs || true
    truncate -s 0 /etc/krb5.conf
    cat <<EOT >> /etc/krb5.conf
    [libdefaults]
        default_realm = DBDEMO.ORG
        dns_lookup_realm = false
        rdns = false
    [realms]
      DBDEMO.ORG = {
        kdc = dc1.dbdemo.org
        admin_server = dc1.dbdemo.org
      }
    [domain_realm]
      .dbdemo.org = DBDEMO.ORG
      dbdemo.org = DBDEMO.ORG
    EOT
    # Use one of the following commands based on your authentication method:
    # kinit -k -t /tmp/user.keytab kerbtest@DBDEMO.ORG   # keytab-based auth
    # echo 'password' | kinit USERNAME@KERBEROS.DOMAIN   # password-based auth
    klist
```
In above script:
- **Principal**: Enter the account name associated with the Kerberos account
- **Realm**: Enter a realm. A realm is a logical network served by a single Kerberos database and a set of Key Distribution Centers (KDCs).
- **TGT Generation**: Select one of the following options:
  - **Key Tab File**: Generates a new TGT from KDC every time you authenticate with the service. Go to [Generate a keytab file](/docs/platform/secrets/add-winrm-keys/#generating-keytab-files) to create the keytab needed for authentication.
  - **Password**: Use Harness encrypted text secrets to save the password and refer to it using this option.

:::info note
Learn how to [generate a Keytab file](https://developer.harness.io/docs/platform/secrets/add-winrm-keys/#generating-keytab-files). Ensure the Keytab file path matches the mounted location in Delegate.
:::

### 3. Mount required files
The Delegate needs access to the Keytab file for authentication. Under `CI_MOUNT_VOLUMES` in Delegate environment, add the following configuration to mount both `krb5.conf` and the Keytab file:

```yaml
- name: CI_MOUNT_VOLUMES
  value: "/etc/krb5.conf:/etc/krb5.conf,/tmp/user.keytab:/tmp/user.keytab"
```

:::info
`CI_MOUNT_VOLUMES` to mount certificates into build pods is needed since the JDBC Test Connection runs inside the delegate container which needs access to keytab files and `krb5.conf`.

`/etc/*:/etc/*` is the default path to mount files in Delegate which **should not be changed**, and `/tmp/*:/tmp/*` is user defined path, but make sure that the destination and source paths match.
:::

### 4. Use a base64 encoded keytab file

If your keytab is a binary file, encode it to base64 before mounting. The Harness DB DevOps plugin reads the file at `PLUGIN_KERBEROS_KEYTAB_FILE_PATH`. If the content is a base64-encoded MIT keytab, the plugin automatically decodes it to a temporary file and runs `kinit` on that decoded file.

:::info Two paths, two roles
`<connector-keytab-path>` is the binary keytab mounted by Kubernetes (for example, `/tmp/user.keytab`). The connector **Keytab file path** field always points at `/tmp/final.keytab.b64`, the base64 output from Step 1. Do not use the same path for both.
:::

**Step 1 - Encode the keytab in `INIT_SCRIPT`:**

Add the following line to your `INIT_SCRIPT` to encode the raw keytab to a base64 file:

```yaml
- name: INIT_SCRIPT
  value: |-
    base64 -w0 <connector-keytab-path> > /tmp/final.keytab.b64
```

Replace `<connector-keytab-path>` with the path where the keytab file is mounted inside the delegate container (placed there via a Kubernetes secret or `volumeMount` in your delegate YAML).

:::info
Make sure that "/tmp/final.keytab.b64" have read permissions for the delegate : `chmod 600 /tmp/final.keytab.b64`
:::

**Step 2 - Mount the base64 file via `CI_MOUNT_VOLUMES`:**

```yaml
- name: CI_MOUNT_VOLUMES
  value: "/etc/krb5.conf:/etc/krb5.conf,/tmp/final.keytab.b64:<connector-keytab-path>"
```

Set the Harness connector **Keytab file path** field to `/tmp/final.keytab.b64`. The plugin reads from that path at runtime.

:::info
The plugin detects base64 content automatically. You do not need to change any connector settings - set `PLUGIN_KERBEROS_KEYTAB_FILE_PATH` to the mounted path and the plugin handles decoding before running `kinit`.
:::

## MSSQL Kerberos configuration
For Microsoft SQL Server, the JDBC URL must include the following properties to enable Kerberos authentication:
```shell
jdbc:sqlserver://<serviceName>.DBDEMO.ORG:1433;databaseName=master;integratedSecurity=true;authenticationScheme=JavaKerberos;encrypt=true;trustServerCertificate=true;
```
Required properties in JDBC URL:
- `integratedSecurity=true`
- `authenticationScheme=JavaKerberos`

Ensure SPN is registered in AD (Active Directory):
```sh
MSSQLSvc/<hostname>:1433@REALM
```
## Oracle Kerberos configuration

### Server-side configuration
Oracle requires additional **server-side configuration** to enable Kerberos authentication at location **`$ORACLE_HOME/network/admin`** or **`$TNS_ADMIN`**:
1. Create `sqlnet.ora` with the following content:
```shell
NAMES.DIRECTORY_PATH = (TNSNAMES, EZCONNECT, ONAMES, HOSTNAME)
SQLNET.AUTHENTICATION_SERVICES = (BEQ, KERBEROS5)
SQLNET.KERBEROS5_KEYTAB = /u01/app/kerb/final.keytab
SQLNET.KERBEROS5_CONF = /etc/krb5.conf
SQLNET.KERBEROS5_CONF_MIT = true
SQLNET.AUTHENTICATION_KERBEROS5_SERVICE = oracle
SQLNET.FALLBACK_AUTHENTICATION = TRUE
SQLNET.KERBEROS5_CLOCKSKEW = 6000
```
:::important note
Most Oracle Kerberos errors originate from incorrect `sqlnet.ora` configuration. Ensure all properties are set correctly and paths match your environment.
:::

2. Create `tnsnames.ora` with the following content:
```shell
freepdb1 =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = oracle-host)(PORT = 1521))
    (CONNECT_DATA =
      (SERVICE_NAME = freepdb1)
    )
  )
```

### JDBC URL for Oracle
The JDBC URL for Oracle with Kerberos authentication should be formatted as follows:
```shell
jdbc:oracle:thin:@//oracle-host:1521/freepdb1
```

## JDBC connection test

To test the connection, complete the following steps in Harness:

1. Select the "JDBC Connector" under "Project Settings" > "Connectors" in Harness.
2. When setting up your database connection in Harness, you need to specify the correct JDBC URL and properties to enable Kerberos authentication:
- Principal
- Realm
- Keytab file path (Mounted path in Delegate) / Password (if using password-based Kerberos). 
![kerberos-jdbc-authentication](./static/dbops-kerberos-jdbc.png)

3. Select the Delegate that has been configured for Kerberos authentication and test the connection. If everything is configured correctly, you should see a successful connection message.
![kerberos-jdbc-test](./static/dbops-kerberos-jdbc-test.png)

## Next steps

You have configured Kerberos authentication for your database connector. You can now run Database DevOps pipelines using Kerberos-authenticated connections.

- Go to [Supported platforms and technologies](/docs/database-devops/dbdevops-supported-platforms) to review which database types support Kerberos authentication.
- Go to [SSL configuration](/docs/database-devops/use-database-devops/ssl) to add transport-layer encryption on top of Kerberos authentication.
- Go to [Troubleshooting](/docs/database-devops/troubleshooting) to resolve common Kerberos connection errors.
