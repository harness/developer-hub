---
title: Configure AWS IAM Authentication for Aurora and RDS
sidebar_label: AWS IAM Authentication
description: Configure IAM-based authentication for AWS Aurora and RDS databases in Harness Database DevOps to eliminate static passwords and enable secure, token-based database access.
sidebar_position: 8
keywords:
  - aws iam authentication
  - aurora iam auth
  - rds iam auth
  - database iam token
  - aws rds security
  - harness dbops aws
  - temporary database credentials
  - aws sts token
  - rds-db connect
  - harness database devops
tags:
  - harness-db-devops
  - aws-authentication
  - iam-authentication
  - security
  - aurora
  - rds
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

AWS IAM authentication for Aurora and RDS replaces static database passwords with temporary, cryptographically signed tokens that expire after 15 minutes. This eliminates the need to store database credentials in secrets managers and provides audit trails through AWS CloudTrail. Harness Database DevOps supports IAM authentication for both Aurora clusters and RDS instances running PostgreSQL or MySQL.

## Prerequisites

Ensure you have the following prerequisites in place:

- **AWS Aurora or RDS instance:** PostgreSQL or MySQL engine with IAM authentication enabled. Go to [Enabling and disabling IAM database authentication](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.Enabling.html) to enable IAM authentication on your cluster or instance.
- **Harness Delegate 3.0 on ECS Fargate:** Delegate running on AWS ECS Fargate with a task role that includes `rds-db:connect` permission. Go to [Install Harness Delegate](/docs/platform/delegates/install-delegates/overview) to set up your delegate.
- **Task role ARN configured:** The `HARNESS_ECS_BUILD_TASK_ROLE_ARN` environment variable must be set in the delegate configuration with the ARN of the ECS task role used for IAM authentication.
- **SSL certificates configured:** Custom SSL certificates must be configured in the Delegate 3.0 ECS task definition for secure database connections. Go to [Configure SSL certificates on ECS](#configure-ssl-certificates-on-ecs) to set up certificate mounting.
- **Database user with IAM role:** A database user created with the `rds_iam` role granted. This user will authenticate using IAM tokens instead of passwords.

:::info note
IAM authentication is only supported for PostgreSQL and MySQL engines on Aurora and RDS. Other database engines require username and password authentication. This feature is currently supported only on Harness Delegate 3.0 running on AWS ECS Fargate.
:::

## Understand AWS Aurora and RDS architectures

Before configuring IAM authentication, it is important to understand the difference between RDS and Aurora architectures, as this affects how you configure connection strings and IAM policies.

### AWS RDS (Relational Database Service)

RDS is a managed database service that automates database administration tasks such as backups, patching, and scaling. It follows a traditional single-server model.

- **Engines supported:** PostgreSQL, MySQL, MariaDB, Oracle, SQL Server
- **Architecture:** Single primary instance with optional Multi-AZ standby replica
- **Storage:** Uses EBS (Elastic Block Store) volumes attached to the instance
- **Connection:** Connect directly to the instance endpoint
- **IAM policy scope:** Instance-level resource ARN

### AWS Aurora

Aurora is a cloud-native database engine built specifically for AWS. It uses a distributed storage architecture that separates compute from storage.

- **Engines supported:** MySQL-compatible and PostgreSQL-compatible
- **Architecture:** Always deployed as a cluster with one writer and optional reader instances
- **Storage:** Data replicated 6 times across 3 Availability Zones, self-healing and auto-scaling
- **Connection:** Connect to the cluster endpoint or specific instance endpoints
- **IAM policy scope:** Cluster-level resource ARN (not instance-level)

:::info important
When configuring IAM policies for Aurora, always use the **cluster ARN** in the resource field, not individual instance ARNs. IAM authentication is granted at the cluster level.
:::

## Understand how IAM authentication works

IAM authentication replaces static passwords with temporary authentication tokens that are cryptographically signed by AWS.

### Authentication flow

1. **Token request:** The Harness Delegate requests an authentication token from AWS STS (Security Token Service) using its IAM role.
2. **Token generation:** AWS generates a cryptographically signed token that is valid for 15 minutes. The token includes the database username, cluster identifier, region, and port.
3. **Connection attempt:** The delegate connects to the database using the database username and the token as the password.
4. **Token validation:** The database engine validates the token signature by contacting AWS. If AWS confirms the signature is valid for the specified cluster and username, access is granted.
5. **Token expiration:** After 15 minutes, the token expires and a new token must be generated for subsequent connections.

### Why username is required in the token

The username is cryptographically signed into the authentication token by AWS. When the database validates the token, it verifies that the username in the connection attempt matches the username signed into the token. This prevents token reuse across different database users and provides strong identity binding.

For example - If AWS signs a token for username `harness_iam_user`, you cannot use that token to authenticate as `admin_user`. The database will reject the connection immediately because the token signature does not match the login username.


## Configure ECS task role for IAM authentication

IAM authentication for Aurora and RDS requires configuring an ECS task role with the `rds-db:connect` permission. This task role is used by containers during pipeline execution to generate temporary authentication tokens.

:::info important
The `HARNESS_ECS_BUILD_TASK_ROLE_ARN` environment variable in your Delegate 3.0 configuration specifies which task role ARN is used for IAM authentication. This is the task role that must have the `rds-db:connect` permission, not the delegate task role. The task role is used for delegate initialization, while the task role specified in `HARNESS_ECS_BUILD_TASK_ROLE_ARN` is used for database authentication during pipeline execution.
:::

### Create IAM policy for database access

Create an IAM policy that grants the `rds-db:connect` action at the cluster level for Aurora databases.

:::info important
**Permissions must be granted at the cluster level for Aurora**, not at the individual instance level. Even though Aurora clusters contain multiple instances (writer and readers), IAM authentication is authorized at the cluster resource level only.
:::

**IAM policy structure for Aurora:**

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds-db:connect"
      ],
      "Resource": [
        "arn:aws:rds-db:us-east-1:123456789012:dbuser:cluster-ABCD1234EFGH5678/harness_iam_user"
      ]
    }
  ]
}
```

**Resource ARN format:**
```
arn:aws:rds-db:REGION:ACCOUNT_ID:dbuser:cluster-CLUSTER_RESOURCE_ID/DATABASE_USERNAME
```

### Find your Aurora cluster resource ID

The cluster resource ID is **not** the same as the cluster identifier shown in the AWS console.

**To find the cluster resource ID:**

```bash
aws rds describe-db-clusters \
  --db-cluster-identifier your-cluster-name \
  --query 'DBClusters[0].DbClusterResourceId' \
  --output text
```

### Attach policy to ECS task role

1. In the AWS IAM console, locate the **ECS task role** that will be specified in the `HARNESS_ECS_BUILD_TASK_ROLE_ARN` environment variable.
2. Create a new inline policy or managed policy using the IAM policy JSON above.
3. Replace `REGION`, `ACCOUNT_ID`, `CLUSTER_RESOURCE_ID`, and `DATABASE_USERNAME` with your actual values.
4. Attach the policy to the ECS task role.

### Configure delegate with task role ARN

Set the following environment variable in your **Harness Delegate 3.0 configuration** to specify which task role ARN should be used for IAM authentication:

```bash
HARNESS_ECS_BUILD_TASK_ROLE_ARN=arn:aws:iam::123456789012:role/your-ecs-task-role
```

This environment variable must point to the ECS task role that has the `rds-db:connect` permission attached. During pipeline execution, Harness uses this task role to generate temporary IAM authentication tokens for database connections.

:::warning important
Without the `HARNESS_ECS_BUILD_TASK_ROLE_ARN` environment variable, IAM authentication will fail. This variable is required in Delegate 3.0 configurations to enable IAM token generation during pipeline execution.
:::

## Create database user with IAM authentication

After configuring the IAM policy in AWS, you must create a corresponding database user in your Aurora or RDS database and grant it the special `rds_iam` role. This role is a pre-created PostgreSQL or MySQL role that marks the user as eligible for IAM token authentication. Without this grant, the database will reject all IAM token authentication attempts, even if the IAM policy is correctly configured.

:::info note
This step must be performed by a database administrator using the master user credentials or another user with sufficient privileges to create users and grant roles. The `rds_iam` role already exists in IAM-enabled Aurora and RDS databases. Go to [Creating a database account using IAM authentication](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.DBAccounts.html) to understand how IAM database accounts work in AWS.
:::

Create a database user and grant the `rds_iam` role to enable IAM authentication for that user.

### Using direct SQL commands

Connect to your database using the master user credentials and run:

```sql
-- Create the IAM-enabled user
CREATE USER harness_iam_user;

-- Grant the rds_iam role (required for IAM authentication)
GRANT rds_iam TO harness_iam_user;

-- Grant database and schema privileges
GRANT ALL PRIVILEGES ON DATABASE postgres TO harness_iam_user;
GRANT ALL ON SCHEMA public TO harness_iam_user;
GRANT USAGE ON SCHEMA public TO harness_iam_user;
GRANT CREATE ON SCHEMA public TO harness_iam_user;

-- Grant access to future objects created by other users
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO harness_iam_user;
```

:::info important
The `GRANT rds_iam TO harness_iam_user;` statement is **required** for IAM authentication to work. Without this grant, the database will reject all IAM token authentication attempts.
:::

## Configure shared ownership for multi-user access

If you need both the master user (for example, `postgres`) and the IAM user (for example, `harness_iam_user`) to run Liquibase migrations interchangeably, configure a shared role group to prevent ownership conflicts.

### Why shared ownership is needed

When one user creates the `databasechangelog` and `databasechangeloglock` tables, that user becomes the owner. If the other user tries to update those tables later, it may fail due to insufficient permissions. A shared role group solves this by making both users co-owners.

### Configure shared role group

Run the following SQL commands using the master user credentials to set up shared ownership:

```sql
-- Create shared migration role
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'liquibase_owners') THEN
    CREATE ROLE liquibase_owners;
  END IF;
END $$;

-- Add both users to the shared group
GRANT liquibase_owners TO postgres;
GRANT liquibase_owners TO harness_iam_user;

-- Set group ownership on tracking tables (if they exist)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'databasechangelog') THEN
    ALTER TABLE public.databasechangelog OWNER TO liquibase_owners;
  END IF;
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'databasechangeloglock') THEN
    ALTER TABLE public.databasechangeloglock OWNER TO liquibase_owners;
  END IF;
END $$;

-- Grant schema-wide permissions to the group
GRANT ALL ON SCHEMA public TO liquibase_owners;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO liquibase_owners;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO liquibase_owners;

-- Ensure future objects are accessible by the group
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO liquibase_owners;
```

This approach allows both users to create, modify, and deploy schema changes without ownership conflicts.

## Configure SSL certificates on ECS

When using IAM authentication with Aurora or RDS, the connection requires SSL. If your database uses a custom or private CA certificate, you must mount the certificate into the delegate containers at runtime using ECS secret and volume mappings.

### Add SSL certificate configuration to ECS task definition

Add the following entries to your Harness Delegate 3.0 ECS task definition. These entries pull the CA certificate from AWS Secrets Manager and mount it into the container file system.

**Secrets entry:**

```json
{
  "name": "HARNESS_CERT_0",
  "valueFrom": "arn:aws:secretsmanager:REGION:ACCOUNT_ID:secret:YOUR_SECRET_NAME"
}
```

Replace `REGION`, `ACCOUNT_ID`, and `YOUR_SECRET_NAME` with your actual values.

**Environment variables:**

```json
{
  "name": "HARNESS_SECRET_FILE_MAPPINGS",
  "value": "HARNESS_CERT_0:/etc/ssl/certs/dbops/root_ca.crt"
},
{
  "name": "HARNESS_CI_MOUNT_VOLUMES",
  "value": "/etc/ssl/certs/dbops/root_ca.crt:/etc/ssl/certs/dbops/root_ca.crt"
}
```

### How certificate mounting works

- **`secrets` block:** Pulls the secret value from AWS Secrets Manager at container startup and exposes it as `HARNESS_CERT_0` inside the container.
- **`HARNESS_SECRET_FILE_MAPPINGS`:** Maps a Secrets Manager secret (identified by the `HARNESS_CERT_0` name from the `secrets` block) to a file path inside the container. The value format is `SECRET_NAME:FILE_PATH`.
- **`HARNESS_CI_MOUNT_VOLUMES`:** Propagates the mounted certificate file into spawned build task containers during pipeline execution. The value format is `HOST_PATH:CONTAINER_PATH`. Use the same path on both sides to mount the file at the same location in the build container.

:::info important
The ECS task execution role (not the build task role) must have `secretsmanager:GetSecretValue` permission for the certificate secret ARN. Without this permission, the container fails to start because ECS cannot retrieve the secret during task initialization.
:::

## Configure JDBC connector in Harness

Configure your Harness JDBC connector to use IAM authentication with the AWS JDBC wrapper.

### Connection URL format

The connection URL must use the `aws-wrapper` prefix and include IAM plugin parameters:

**Aurora cluster endpoint:**
```
jdbc:aws-wrapper:postgresql://my-cluster.cluster-abc123.us-east-1.rds.amazonaws.com:5432/postgres?wrapperPlugins=iam&ssl=true&sslmode=require
```

**Aurora instance endpoint:**
```
jdbc:aws-wrapper:postgresql://my-cluster-instance-1.abc123.us-east-1.rds.amazonaws.com:5432/postgres?wrapperPlugins=iam&ssl=true&sslmode=require
```

**RDS instance endpoint:**
```
jdbc:aws-wrapper:postgresql://my-rds-instance.abc123.us-east-1.rds.amazonaws.com:5432/postgres?wrapperPlugins=iam&ssl=true&sslmode=require
```

### Required URL components

- **Prefix:** `jdbc:aws-wrapper:postgresql://` (replaces standard `jdbc:postgresql://`)
- **Parameter:** `wrapperPlugins=iam` (enables IAM authentication plugin)
- **SSL parameters:** `ssl=true&sslmode=require` (IAM authentication requires SSL)

### Configure connector in Harness UI

1. Go to **Database DevOps** > **Connectors** > **New Connector** > **Database**.
2. Select **JDBC** as the connector type.
3. In the **JDBC URL** field, enter the IAM-enabled connection string using the `aws-wrapper` prefix.
4. In the **Authentication** type, select the **Use Delegate Credentials** option.
5. In the **Username** field, enter the database username (for example, `harness_iam_user`). 
6. Select the Harness Delegate that has the task role ARN configured with the correct RDS/Aurora permission (for example `rds-db:connect` permission).
7. Click **Test Connection** to verify the configuration.
8. Click **Save**.

:::info important
The ***Use Delegate Credentials** authentication type instructs Harness to use the IAM role specified in the delegate `HARNESS_ECS_BUILD_TASK_ROLE_ARN` environment variable to generate temporary authentication tokens. The username field is optional when using IAM authentication. No password is required because the AWS JDBC wrapper automatically generates and uses IAM tokens during connection.
:::

## Verify IAM authentication setup

Test your IAM authentication configuration before using it in production pipelines.

### Test connection from delegate

SSH into your Harness Delegate host and verify IAM token generation:

```bash
# Install AWS CLI if not already available
apt-get update && apt-get install -y awscli

# Generate an IAM authentication token
aws rds generate-db-auth-token \
  --hostname my-cluster.cluster-abc123.us-east-1.rds.amazonaws.com \
  --port 5432 \
  --region us-east-1 \
  --username harness_iam_user

# Output should be a long URL-encoded token string starting with the hostname
```

If token generation fails, verify:
- The ECS task role specified in `HARNESS_ECS_BUILD_TASK_ROLE_ARN` has `rds-db:connect` permission
- The hostname, port, region, and username are correct
- The delegate can reach AWS STS endpoints

### Test connection using psql

```bash
# Set the generated token as PGPASSWORD
export PGPASSWORD="$(aws rds generate-db-auth-token \
  --hostname my-cluster.cluster-abc123.us-east-1.rds.amazonaws.com \
  --port 5432 \
  --region us-east-1 \
  --username harness_iam_user)"

# Connect using the token as password
psql "host=my-cluster.cluster-abc123.us-east-1.rds.amazonaws.com \
  port=5432 \
  dbname=postgres \
  user=harness_iam_user \
  sslmode=require"
```

### Verify in Harness pipeline

Create a test pipeline with a Liquibase or Flyway step:

1. Use the IAM-enabled JDBC connector.
2. Run a simple changeset (for example, `SELECT 1`).
3. Check the execution logs for successful connection and authentication.

## Troubleshooting

<Troubleshoot
  issue="Connection fails with 'authentication token could not be generated' error"
  mode="fallback-only"
  fallback="Verify the ECS task role specified in HARNESS_ECS_BUILD_TASK_ROLE_ARN has the rds-db:connect permission in the IAM policy. Check that the cluster resource ID in the IAM policy ARN matches the actual cluster resource ID (not the cluster identifier). Confirm the delegate can reach AWS STS endpoints on port 443."
/>

<Troubleshoot
  issue="Connection fails with 'password authentication failed' error"
  mode="fallback-only"
  fallback="Verify the database user has been granted the rds_iam role using: SELECT rolname FROM pg_roles WHERE oid IN (SELECT roleid FROM pg_auth_members WHERE member = (SELECT oid FROM pg_roles WHERE rolname = 'harness_iam_user')). If rds_iam is not listed, run: GRANT rds_iam TO harness_iam_user;"
/>

<Troubleshoot
  issue="Connection fails with 'SSL connection required' error"
  mode="fallback-only"
  fallback="Add ssl=true&sslmode=require to the JDBC URL query parameters. IAM authentication requires SSL to be enabled. Verify SSL certificates are properly configured in the delegate environment."
/>

<Troubleshoot
  issue="Connection URL is not recognized as IAM-enabled"
  mode="fallback-only"
  fallback="Ensure the JDBC URL starts with jdbc:aws-wrapper:postgresql:// (not jdbc:postgresql://). Verify wrapperPlugins=iam is included in the URL query parameters. The aws-wrapper prefix triggers Harness to use the IAM-enabled plugin image."
/>

<Troubleshoot
  issue="Username mismatch error when connecting"
  mode="fallback-only"
  fallback="The username in the JDBC connector must exactly match the username specified in the IAM policy Resource ARN. Check that both use the same case and spelling. The IAM token is cryptographically bound to the username and cannot be used for a different user."
/>

<Troubleshoot
  issue="Liquibase fails with 'permission denied' on databasechangelog table"
  mode="fallback-only"
  fallback="The IAM user does not have ownership or write access to the Liquibase tracking tables. Implement the shared role group approach to allow both master and IAM users to co-own the tables. Run: ALTER TABLE databasechangelog OWNER TO liquibase_owners; and ALTER TABLE databasechangeloglock OWNER TO liquibase_owners;"
/>

<Troubleshoot
  issue="Token expires during long-running migrations"
  mode="fallback-only"
  fallback="IAM tokens expire after 15 minutes. Break long-running migrations into smaller changesets that complete within the token validity window. Alternatively, structure your pipeline to generate a fresh token before each migration step."
/>

<Troubleshoot
  issue="Image pull error or 'driver not found' error"
  mode="fallback-only"
  fallback="Harness automatically selects the IAM-enabled plugin image when the JDBC URL contains the aws-wrapper prefix. If this fails, verify the connector registry is configured correctly and the delegate can pull the plugins/drone-liquibase image with IAM dependencies."
/>

<Troubleshoot
  issue="ECS delegate: IAM token generation fails with 'Unable to load credentials' error"
  mode="fallback-only"
  fallback="The HARNESS_ECS_BUILD_TASK_ROLE_ARN environment variable is not set or is set incorrectly in the delegate task definition. Verify the environment variable contains the full ARN of the ECS task role that has the rds-db:connect permission. This variable must be set at the delegate level to propagate the task role to runtime containers. Without it, containers spawned during pipeline execution cannot assume the necessary IAM role to generate tokens."
/>

<Troubleshoot
  issue="Connection works with master user password but fails with IAM user"
  mode="fallback-only"
  fallback="This indicates that IAM authentication is not properly configured at the database level or IAM policy level. First, verify the database user has been granted the rds_iam role: SELECT rolname FROM pg_roles WHERE oid IN (SELECT roleid FROM pg_auth_members WHERE member = (SELECT oid FROM pg_roles WHERE rolname = 'harness_iam_user')). Second, verify the IAM policy resource ARN uses the correct cluster or instance resource ID (not the cluster identifier). Third, ensure the JDBC URL uses the aws-wrapper prefix and wrapperPlugins=iam parameter."
/>

## Next steps

Now that you have configured IAM authentication, you can:

- Go to [Harness Database DevOps onboarding guide](/docs/database-devops/use-database-devops/get-started/onboarding-guide) to create your first schema and pipeline.
- Go to [Configure SSL for database connections](/docs/database-devops/use-database-devops/ssl) to learn about SSL certificate management.
- Go to [Automatic and custom rollbacks](/docs/database-devops/concepts-and-features/automatic-and-custom-rollback) to configure rollback strategies for failed migrations.
