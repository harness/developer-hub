---
title: Setting Up JDBC Connectors
sidebar_label: Setting Up JDBC Connectors
description: Learn how to set up and configure connectors in Harness DB DevOps to securely link databases, artifact registries, and secret managers.
sidebar_position: 40
keywords:
  - harness connectors
  - database connectors
  - dbops connector setup
  - configuring connectors
  - secret manager integration
  - connector configuration
  - dbops integration
  - database devops setup
  - harness dbops
  - secure database connection
tags:
  - harness-db-devops
  - connector-setup
  - integration
  - secret-management
  - database-connectivity
---

This topic describes how to set up JDBC Connectors within Harness DB DevOps. 

## Set up JDBC connectors

### JDBC connectors

A JDBC connector connects Harness to your database instance. The connector accepts the following:  
- **JDBC URL**: The database URL (**string**)  
- **Username**: Username (**string / secret**)  
- **Password**: Password (**secret**)  

It performs a test connection using a delegate with a delegate selector or any available delegate. Ensure the delegate has network access to the database.  

The JDBC connector is used for connecting to your database instance.

<DocVideo src="https://app.tango.us/app/embed/88d2d030-448f-473a-a73f-889de8f0621b?skipCover=false&defaultListView=false&skipBranding=true&makeViewOnly=true&hideAuthorAndDetails=true" title="Create JDBC Connector in Harness"/>

#### URL examples

| Database           | JDBC URL Format                                                                                                                  |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------|
| **ORACLE**         | `jdbc:oracle:thin:@//{host}:{port}/{servicename}`                                                                                |
| **POSTGRES**       | `jdbc:postgresql://{host}:{port}/{dbName}?sslmode=disable`                                                                       |
| **COCKROACHDB**    | `jdbc:postgresql://{host}:{port}/{dbName}`                                                                                       |
| **SQLSERVER**      | `jdbc:sqlserver://{host}:{port};trustServerCertificate=true;databaseName={dbName}`                                               |
| **MYSQL**          | `jdbc:mysql://{host}:{port}/{dbName}`                                                                                            |
| **MONGODB**        | `mongodb://{host}:{port}/{dbName}?authSource=admin`                                                                              |
| **MongoDB Atlas**  | `mongodb+srv://{username}:{password}@{cluster}/{dbName}?authSource=admin`                                                        |
| **GOOGLE SPANNER** | `jdbc:cloudspanner:/projects/{project-id}/instances/{instance-id}/databases/{database-name}?lenient=true`                        |
| **GOOGLE ALLOYDB** | `jdbc:postgresql://{host}:{port}/{dbName}`                                                                                       |
| **SNOWFLAKE**      | `jdbc:snowflake://{host}/?warehouse={wh}&db={dbName}&schema={dbSchema}&role={authRole}`                                          |
| **MongoDB SSL**    | `mongodb://{host}:{port}/{dbName}?tls=true&authSource=admin`                                                                     |
| **POSTGRES SSL**   | `jdbc:postgresql://{host}:{port}/{dbName}?ssl=true`                                                                              |
| **SQLSERVER SSL**  | `jdbc:sqlserver://{host}:{port};databaseName={dbName};encrypt=true;trustServerCertificate=false;`                                |
| **MYSQL SSL**      | `jdbc:mysql://{host}:{port}/{dbName}?useSSL=true`                                                                                |
| **ORACLE SSL**     | `jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCPS)(HOST={host})(PORT={port}))(CONNECT_DATA=(SERVICE_NAME={servicename})))` |
| **COCKROACHDB SSL**| `jdbc:postgresql://{host}:{port}/{dbName}?sslmode=require`                                                                       |
| **DocumentDB**     | `mongodb://{host}:{port}/{dbName}?tls=true&tlsAllowInvalidHostnames=true&directConnection=true&retryWrites=false&authSource=admin` |
| **BIGQUERY**       | `jdbc:bigquery://https://www.googleapis.com/bigquery/v2:443;ProjectId={project-id};DefaultDataset={dataset-name};Location={region};` |
| **DB2 LUW**        | `jdbc:db2://{host}:50000/{dbName}` |
| **DB2 LUW SSL**    | `jdbc:db2://{host}:50000/{dbName}?sslConnection=true` |
| **DB2 for i**      | `jdbc:as400://{host}/{library};translate binary=true;date format=iso` |
| **DB2 z/OS**       | `jdbc:db2://{host}:446/{locationName}` |
| **DB2 z/OS SSL**   | `jdbc:db2://{host}:446/{locationName}?sslConnection=true` |

---

## Set up MongoDB connectors

MongoDB connections in Harness DB DevOps support both self-hosted and cloud-based MongoDB instances.

### Prerequisites for MongoDB

Configure the following before connecting:

1. **Connection format:**  
   - Use `mongodb+srv://` for MongoDB Atlas and cloud instances.
   - Use `mongodb://` for self-hosted instances.

2. **Authentication**:  
   - **Username/password:** Database user credentials
   - **authSource:** Must be specified (typically `admin`)
   - **Database:** Target database name must be included in the URL

3. **Network access:**  
   - Ensure the delegate has network connectivity to the MongoDB cluster
   - For MongoDB Atlas, whitelist the delegate's IP address

### MongoDB URL requirements

The following requirements apply when constructing your MongoDB connection string:

- The connection string **must** include `+srv` for cloud instances
- The target `database` must be specified in the URL path
- The database user must have appropriate read/write permissions on the target database

---

## Set up Google Spanner connectors

Google Spanner uses a unique JDBC URL format and does not require a traditional password for authentication. Instead, authentication is handled via Google Service Account (GSA) credentials or Keyless authentication.

### Prerequisites for Google Spanner
Harness DB DevOps supports two authentication methods for Google Spanner:
1. **Google Service Account (GSA)** json key file authentication.
   - Provide a Google Service Account (GSA) JSON key
   - The service account must have the following IAM roles:
     - `roles/spanner.databaseAdmin`  
     - `roles/spanner.databaseUser`

2. **Keyless Authentication** using Workload Identity Federation (WIF) or other supported methods.
   - Uses Workload Identity (GKE) or IAM-based authentication
   - No JSON key is required
   - The Harness Delegate inherits permissions via the mapped **Kubernetes Service Account (KSA)** mapped to a **Google Service Account (GSA)**.
      
   Requirements:
   - Configure IAM binding between the KSA (used by the delegate) and the GSA with the same roles:
     - `roles/spanner.databaseAdmin`
     - `roles/spanner.databaseUser`

:::info note
**Why use keyless authentication?** This approach improves security by eliminating long-lived credentials and reducing operational overhead.
:::

:::warning PostgreSQL not supported for Spanner
The PostgreSQL dialect for Spanner is not currently supported and will cause pipeline failures with an image pull error.
Use the standard Cloud Spanner GQL.
:::

---
## Set up AlloyDB connectors

AlloyDB connections in Harness DB DevOps require a **Host**, **Port**, and **Database**. The username and password are also required for authentication.

### Prerequisites for AlloyDB

Configure the following before connecting to AlloyDB:

1. **Connection format:** Use `jdbc:postgresql://{HOST}:{PORT}/{DBNAME}` for AlloyDB instances.
2. **Authentication:** Database user credentials (username and password).
3. **Network access:**  
   - Ensure the Harness Delegate has network connectivity to the AlloyDB instance. (Both are in same VPC, which is also default behavior in GCP).

---

## Set up Snowflake connectors {#setting-up-snowflake}
Snowflake connections in Harness DB DevOps require a specific JDBC URL format that includes the account identifier, warehouse, database, schema, and role. If the role is not specified, the default role for the user will be used. In addition, PKI authentication is required to authenticate to Snowflake.

### Prerequisites for Snowflake
To connect to Snowflake, you need to provide the following information:
 - **PKI Authentication**: Use Public Key Infrastructure (PKI) authentication by providing the username, private key file reference, and an optional private key passphrase reference while configuring the JDBC connector. 

The private key file reference is a secret file, and the passphrase reference is a secret text. If your private key is encrypted, you can provide the passphrase to decrypt it. For example:

```text
"username": "john_doe",
         "privateKeyFileRef": "snowflake-trial-private-key",
         "privateKeyPassphraseRef": "snowflake-trial-passphrase"
```

:::info note
Username and Password authentication method for the snowflake is deprecated, and The preferred method for service accounts using public/private key cryptography.
:::

---

## Set up Amazon DocumentDB connectors

Amazon DocumentDB is supported via the **MongoDB Native Executor**. DocumentDB clusters run in private VPC subnets and require an SSH tunnel through an EC2 instance for external access.

### Prerequisites for DocumentDB

Before connecting to DocumentDB, ensure you have the following:

- **DocumentDB cluster**: Running cluster in AWS VPC
- **EC2 instance**: Instance in the same VPC as your DocumentDB cluster with SSH access enabled (port 22)
- **Amazon RDS CA certificate**: [Download the global bundle](https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem)
- **Network access**: Delegate must have SSH connectivity to the EC2 instance

### Set up the SSH tunnel

Establish an SSH tunnel from your delegate to DocumentDB via the EC2 instance:

```bash
ssh -L 27017:YOUR-DOCDB-CLUSTER-ENDPOINT:27017 \
    ec2-user@YOUR_EC2_PUBLIC_IP \
    -i ~/path/to/your-key.pem \
    -N
```

Replace `YOUR-DOCDB-CLUSTER-ENDPOINT` with your cluster endpoint and `YOUR_EC2_PUBLIC_IP` with the EC2 public IP.

:::info note
Add the Amazon RDS CA certificate to your trust store to enable SSL connections to DocumentDB. Go to [Enable JDBC SSL truststore support](/docs/database-devops/use-database-devops/ssl/#5-enable-jdbc-ssl-truststore-support) to add the Amazon RDS CA certificate to your delegate environment.
:::

---

## Set up BigQuery connectors {#setting-up-bigquery}

BigQuery connections in Harness DB DevOps support OIDC authentication using Workload Identity Federation for keyless authentication.

### Prerequisites for BigQuery

Enable the following GCP APIs and IAM roles before connecting.

**Required GCP APIs:**
- **BigQuery API** (`bigquery.googleapis.com`): Core BigQuery data access
- **IAM Service Account Credentials API** (`iamcredentials.googleapis.com`): Generates service account access tokens from workload tokens
- **Security Token Service API** (`sts.googleapis.com`): Exchanges Harness JWT for GCP workload access token

Enable the APIs:
```bash
gcloud services enable bigquery.googleapis.com \
  iamcredentials.googleapis.com \
  sts.googleapis.com \
  --project=YOUR_PROJECT_ID
```

**Required IAM roles for the service account:**
- `roles/bigquery.dataViewer` (read-only) or `roles/bigquery.admin` (full access)
- `roles/bigquery.jobUser` (required to run queries and schema operations)
- `roles/iam.serviceAccountTokenCreator` (for OIDC token exchange)
- `roles/iam.workloadIdentityUser` (for Workload Identity Pool binding)

**BigQuery JDBC URL format:**
```text
jdbc:bigquery://https://www.googleapis.com/bigquery/v2:443;ProjectId=PROJECT_ID;DefaultDataset=DATASET_NAME;Location=REGION;
```

**Example:**
```text
jdbc:bigquery://https://www.googleapis.com/bigquery/v2:443;ProjectId=cd-play;DefaultDataset=Step_execution_data;Location=asia-south1;
```

**Required parameters:**
- `ProjectId`: Your GCP project ID where BigQuery datasets reside
- `DefaultDataset`: The default BigQuery dataset for schema operations
- `Location`: The BigQuery dataset location (for example, `us-central1`, `asia-south1`)

:::info important
BigQuery uses OIDC authentication with Workload Identity Federation. Do not include `OAuthType` or `OAuthAccessToken` parameters in the URL when using OIDC. The Simba BigQuery JDBC driver is included in Harness Database DevOps plugin images.

Go to [Configure OIDC authentication for GCP databases](/docs/database-devops/features/oidc-authentication) to set up keyless authentication for BigQuery.
:::

---

## Set up IBM DB2 connectors

IBM DB2 is a family of data management products that includes three variants, each running on different platforms and requiring different JDBC drivers and connection formats.

Harness DB DevOps supports:
- **DB2 LUW**: DB2 for Linux, Unix, and Windows
- **DB2 for i**: DB2 for iSeries (AS/400)
- **DB2 z/OS**: DB2 for IBM Mainframe

:::info note
Go to [Set up IBM DB2](/docs/database-devops/use-database-devops/set-up-db2-connector) for detailed prerequisites, license requirements, and configuration instructions for each DB2 variant.
:::

### DB2 JDBC URL quick reference

| Variant | JDBC URL Format |
|---------|----------------|
| **DB2 LUW** | `jdbc:db2://{host}:50000/{dbName}` |
| **DB2 LUW (SSL)** | `jdbc:db2://{host}:50000/{dbName}?sslConnection=true` |
| **DB2 for i** | `jdbc:as400://{host}/{library};translate binary=true;date format=iso` |
| **DB2 z/OS** | `jdbc:db2://{host}:446/{locationName}` |
| **DB2 z/OS (SSL)** | `jdbc:db2://{host}:446/{locationName}?sslConnection=true` |

:::warning DB2 z/OS license requirement
DB2 z/OS requires a customer-provided IBM DB2 Connect license JAR (`db2jcc_license_cisuz.jar`). Go to [Set up IBM DB2](/docs/database-devops/use-database-devops/set-up-db2-connector#providing-the-db2-zos-license-jar) to configure the license.
:::

---

## Connector FAQ

The following FAQs cover common connector configuration questions.

### Why can I not connect to my Oracle database with a &nbsp; `sys as sysdba` &nbsp; username?

Sometimes, users want to login to their database using the `sys as sysdba` username. To do so properly with Harness:

1. Your **JDBC URL** should have the query parameter `internal_logon=sysdba`
2. Your **Username** should be `sys`.

Go to [Oracle's documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/jjdbc/data-sources-and-URLs.html#GUID-44572C63-10D2-478A-BB2E-ACF6674C59CC) for information about logging on as `sys`.

### IBM DB2 setup instructions

Go to [Set up IBM DB2](/docs/database-devops/use-database-devops/set-up-db2-connector) for detailed instructions on configuring DB2 LUW, DB2 for i, and DB2 z/OS connectors, including license provisioning for z/OS.

## Next steps

- Go to [Set up IBM DB2 connector](/docs/database-devops/use-database-devops/set-up-db2-connector) to configure DB2 LUW, DB2 for i, and DB2 z/OS connections including license provisioning.
- Go to [Secure database connectivity with SSL](/docs/database-devops/use-database-devops/ssl) to enable encrypted connections for your database.
- Go to [Create a pipeline in Database DevOps](/docs/database-devops/gitops/create-a-pipeline) to use your connector in a deployment pipeline.
