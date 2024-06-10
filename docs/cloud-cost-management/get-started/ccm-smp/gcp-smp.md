---
title: GCP 
description: The procedure to set up CCM for GCP by using Harness Self-Managed Enterprise Edition.
# sidebar_position: 2
redirect_from: 
- /docs/cloud-cost-management/getting-started-ccm/ccm-smp/gcp-smp
---

# Manage GCP costs by using CCM on Harness Self-Managed Enterprise Edition
This topic walks you through the steps required to set up CCM for GCP in a self-managed platform.

**Figure: GCP CCM Self-Managed Enterprise Edition architecture diagram**

<DocImage path={require('./static/gcp-smp-arch.png')} width="90%" height="90%" title="Click to view full size image" />

## Major Components
- **K8s Job:** In the cloud-hosted infra, a K8s Job is configured to run daily. This job performs all necessary steps to ingest GCP billing data from BigQuery to ClickHouse, utilizing a GCS bucket as an intermediary and then eventually to ClickHouse table.
- **BigQuery:** The GCP project's billing data resides in a BigQuery table.
- **Google Cloud Storage (GCS):** Billing data is stored in the parquet format in GCS bucket. Parquet, as a column-oriented format, represents a better interchange format since it is inherently compressed and faster for BigQuery to export and ClickHouse to query.
- **ClickHouse:** Serves as the datastore where GCP billing data is finally ingested.
- **Service Account Key:** It is a JSON file that contains the information needed to authenticate and authorize requests made by an application or a service.
- **HMAC Key:** HMAC (Hash-based Message Authentication Code) keys are used for authentication and ensuring the integrity of requests made to GCS.

## Data Flow

**Steps**
1. Authenticate and initialize clients for BigQuery, GCS and ClickHouse using **SA and HMAC** keys.
2. Create a dedicated **GCS** bucket to store billing data in **Parquet** format. The sub-folders will be organized based on timestamps or dates to precisely track when each bucket was created.
3. Initiate an export query to transfer data from **BigQuery** to the **GCS** bucket in **Parquet** format with GZIP compression. The export query employs a **SELECT** statement, resulting in charges based solely on the data scan.
4. Check if the billing table exists in **ClickHouse**; create it if not.
5. Initiate an insert query to efficiently move data from the **GCS** bucket to the **ClickHouse table** in batch.

You need to perform the following tasks to set up CCM for GCP: 

1. [Create Service Account](#step-1-create-service-account)
2. [Create HMAC Key](#step-2-create-hmac-key)
3. [Deploying workloads via Helm Charts](#deploying-workloads-via-helm-charts)
4. [Handling Kubernetes Secrets](#step-3-handling-kubernetes-secrets)

## GCP Setup
   
### Step 1: Create Service Account

A GCP service account is needed to be able to authenticate and perform operations on the customer’s BQ and GCS buckets.You will need one SA and its JSON key during onboarding.
1. Before creating a Service Account, you have to create Custom Role and provide necessary permissions to it. Follow [these](https://cloud.google.com/iam/docs/creating-custom-roles#creating) steps to create Custom Role and add below permissions:

```
bigquery.datasets.create
bigquery.datasets.get
bigquery.datasets.getIamPolicy
bigquery.jobs.create
bigquery.tables.create
bigquery.tables.export
bigquery.tables.get
bigquery.tables.getData
bigquery.tables.list
storage.buckets.create
storage.buckets.get
storage.objects.list
storage.objects.create
storage.objects.get
```


2. Follow [these](https://cloud.google.com/iam/docs/service-accounts-create#creating) steps to create Service Account and add the above IAM custom role to it.
3. Follow [these](https://developers.google.com/workspace/guides/create-credentials#create_credentials_for_a_service_account) steps to create Service Account Credential Key.

Please refer [this](https://www.cloudquery.io/blog/creating-cross-project-service-accounts-in-gcp#how-do-you-set-up-a-service-account-in-gcp?) doc if you encounter any difficulties understanding the process. It provides a comprehensive explanation of all steps accompanied by screenshots.

### Step 2: Create HMAC Key
To be able to make use of ClickHouse methods to ingest data from GCS, you will need HMAC key.

1. Follow [these](https://cloud.google.com/storage/docs/authentication/managing-hmackeys#create) steps to create HMAC key for the Service Account created above.

## Deploying workloads via Helm charts

### Step 1: Clone chart repository

```
git clone git@github.com:harness/helm-charts.git
cd main/src/harness
```

### Step 2: Already using harness services OnPrem? Upgrade charts

```
helm get values <chart-name> -n <namespace> > override.yaml

# update override.yaml with ccm specific configuration provided below
helm upgrade <chart-name> <chart-directory> -n <namespace> -f override.yaml

```
Example: ```helm upgrade ccm . -n harness -f old_values.yaml```

```
global:
  ccm:
    enabled: true
    gcpProjectId: "<gcpServiceAccountProjectId>"
  smtpCreateSecret:
    enabled: true
  license:
    ng: <SMP NG License with CCM>
  database:
    clickhouse:
      enabled: true

ccm:
  ce-nextgen:
    cloudProviderConfig:
      GCP_SERVICE_ACCOUNT_EMAIL: "<gcpServiceAccountEmail>"
  batch-processing:
    serviceAccount:
      create: true
      annotations: {}
      name: "batch-processing-default"
    gcpConfig:
      GCP_SMP_ENABLED: true
      bucketNamePrefix: "harness-ccm-%s-%s" # Update the bucket name prefix if you want, but keep double %s for project and region
```

### Step 3: Handling Kubernetes Secrets

On installing/upgrading charts you will see K8s secrets created with default value in the cluster. You need to update these secrets with the above noted values. Before updating the secrets you need to convert the secret into base64 encoded, let say the `HMAC_ACCESS_KEY` value is: `accessKey`, then it would it be stored as ``YWNjZXNzS2V5``. After changing secrets, we will provide directives to `kubectl delete` the corresponding pods in order for your release to inherit new changes.

Command: ```echo -n "accessKey" | base64```

The -n option with echo prevents the trailing newline character from being included in the output. To encode service account credential JSON file, use below command:

```base64 -i service-account.json -o service-account-base64-encoded.txt```

Following are the secrets specific to CCM services:

**1. batch-processing**
    ```kubectl edit secret batch-processing -n <namespace>```

    ```
    HMAC_ACCESS_KEY: <hmacAccessKey>
    HMAC_SECRET_KEY: <hmacSecretKey>
    ```

**2. batch-processing-secret-mount**
    ```kubectl edit secret batch-processing-secret-mount -n <namespace>```

    ```
    ce-gcp-home-project-creds: <gcpServiceAccountCredentials>
    ce-batch-gcp-credentials: <gcpServiceAccountCredentials>
    ```
    
**3. cloud-info-secret-mount [config-file]**
    ```
    kubectl edit secret cloud-info-secret-mount -n <namespace>
    ```

<details>
<summary>config.toml.dist</summary>

```
environment = "production"
debug = false
shutdownTimeout = "5s"

[config.vault]
enabled = false
address = ""
token = ""
secretPath = ""

[log]
format = "json"
level = "info"

[metrics]
enabled = false
address = ":9090"

[jaeger]
enabled = false

# Configure either collectorEndpoint or agentEndpoint.
# When both are configured collectorEndpoint will take precedence and the exporter will report directly to the collector.

collectorEndpoint = "http://localhost:14268/api/traces?format=jaeger.thrift"
agentEndpoint = "localhost:6831"
# username = ""
# password = ""

[app]
address = ":8000"
basePath = "/"

[scrape]
enabled = true
interval = "24h"

[provider.amazon]
enabled = false

# See available regions in the documentation:
# https://aws.amazon.com/about-aws/global-infrastructure/regions_az
# region = "us-east-1"
# Static credentials
# accessKey = ""
# secretKey = ""
# Shared credentials
# sharedCredentialsFile = ""
# profile = ""
# IAM Role ARN to assume
# assumeRoleARN = ""
# http address of a Prometheus instance that has AWS spot price metrics via
banzaicloud/spot-price-exporter.
# If empty, the cloudinfo app will use current spot prices queried directly from
the AWS API.

prometheusAddress = ""
# advanced configuration: change the query used to query spot price info from
Prometheus.

prometheusQuery = "avg_over_time(aws_spot_current_price{region=\"%s\",
product_description=\"Linux/UNIX\"}[1w])"

# Amazon pricing API credentials (optional)
# Falls back to the primary credentials.

[provider.amazon.pricing]
# See available regions in the documentation:
# https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/using-pelong.html
# region = "us-east-1"
# Static credentials
# accessKey = ""
# secretKey = ""
# Shared credentials
# sharedCredentialsFile = ""
# profile = ""
# IAM Role ARN to assume
# assumeRoleARN = ""

[provider.google]
enabled = false
# base64 encoded credentials in json format (base64 encoded content of the
credential file)
# credentials = ""
# credentialsFile = ""
# project = ""

[provider.alibaba]
enabled = false
# region = ""
# accessKey = ""
# secretKey = ""

[provider.oracle]
enabled = false
# tenancy = ""
# user = ""
# region = ""
# fingerprint = ""
# privateKey = ""
# privateKeyPassphrase = ""
# configFilePath = ""
# profile = ""

[provider.azure]
enabled = true

# subscriptionId = ""
# Client credentials
clientId = "<clientId>"
clientSecret = "<clientSecret>"
tenantId = "<tenantId>"
[provider.digitalocean]
enabled = false

[provider.vsphere]
enabled = false
# accessToken = ""

[management]
enabled = true
address = ":8001"

[serviceloader]
serviceConfigLocation = "./configs"
serviceConfigName = "services"
format = "yaml"

[store.redis]
enabled = false
host = "localhost"
port = 6379

[store.cassandra]
enabled = false
hosts = "localhost"
port = 9042
keyspace = "cloudinfo"
table = "products"

[store.gocache]
expiration = 0
cleanupInterval = 0
```

</details>

```
config-file: <config-file>
gcp-creds: <gcpServiceAccountCredentials>
```

```
# In config.toml.dist provided below:
[provider.google]
enabled = true

# base64 encoded credentials in json format (base64 encoded content of the credential file)
# credentials = ""

credentialsFile = "/config/gcp-creds.json"
project = "<gcpServiceAccountProjectId>"
```


**4. ceng-secret-mount**

    ```kubectl edit secret ceng-secret-mount -n <namespace>```

    ```ceng-gcp-credentials: <gcpServiceAccountCredentials>```

Following are some secrets from platform-service that you will need to update:
1. **smtp-secret** [Required to support budget alerts E-mail]
    
    ```kubectl edit secret smtp-secret -n <namespace>```

    ```
    SMTP_HOST: <SMTP_HOST>
    SMTP_PASSWORD: <SMTP_PASSWORD>
    SMTP_PORT: <SMTP_PORT>
    SMTP_USE_SSL: <SMTP_USE_SSL>
    SMTP_USERNAME: <SMTP_USERNAME>
    ```

:::info
Run `kubectl edit pvc wal-volume-harness-timescaledb-0 -n <namespace>` and increase to 100Gi. It is used by recommendations and anomalies features within CCM services.
:::


## GCP Connector Setup

### Authorize Service Account to access BigQuery and GCS buckets in other projects

In the **Grant Permissions** step of GCP Connector flow, follow below steps:
1. Create same Custom Role with different name in the project for which you are setting up the billing report (refer Step 1 of GCP Setup for creating Custom Role).
2. Follow [these](https://gtseres.medium.com/using-service-accounts-across-projects-in-gcp-cf9473fef8f0) steps to grant role to Service Account to access other project.
3. Click on **Continue** to test the connection.

Please refer [this](https://developer.harness.io/docs/cloud-cost-management/get-started/ccm-smp/gcp-smp#step-3-handling-kubernetes-secrets) doc if you encounter any difficulties understanding the process. It provides a comprehensive explanation of all steps accompanied by screenshots.

:::info
Not supporting **GCP Inventory management** in the **Choose Requirements** step of GCP Connector flow.
:::

### Troubleshooting
If in case the K8s secrets expire, the secrets will have to be set again. First you would have to update the secrets in respective `secret.yaml` and then delete the pod. We recommend to `kubectl delete` the following pods:

- `batch-processing`
- `ce-nextgen`
- `cloud-info`

and then follow the [same steps](https://developer.harness.io/docs/cloud-cost-management/get-started/ccm-smp/azure-smp#handling-kubernetes-secrets) to set the keys. After the new keys are set, verify the changes by looking at the `configs` for the pods.