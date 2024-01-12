---
title: Azure 
description: The procedure to set up CCM for Azure by using Harness Self-Managed Enterprise Edition.
# sidebar_position: 2
redirect_from:
  - /docs/cloud-cost-management/getting-started-ccm/ccm-smp/azure-smp
---

# Manage Azure costs by using CCM on Harness Self-Managed Enterprise Edition
This topic walks you through the steps required to set up CCM for Azure in a self-managed platform.

**Figure: Azure CCM Self-Managed Enterprise Edition architecture diagram**

<docimage path={require('./static/azure-smp-arch.png')} width="50%" height="50%" title="Click to view full size image" />

You need to perform the following tasks to set up CCM for Azure. For Step 1, 2 and 3 Sign in to your [Azure Portal](https://portal.azure.com/#home): 

1. [Setup a new Application via App Registration](#setup-a-new-application-via-app-registration).
2. [Create a new Client secret](#create-a-new-client-secret).
3. [Setup a new Storage Account and a new Storage Container](#setup-a-new-storage-account-and-a-new-storage-container).
4. [Deploy workloads via Helm charts](#deploy-workloads-via-helm-charts).
   
## Setup a new Application via App Registration

1. Give it Name like `Harness CCM App`.
2. For Supported account types select: `Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)`.
3. Click on Register. For more information, go to [Quickstart: Register an App](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).

  <docimage path={require('./static/azure-app-registration.png')} width="50%" height="50%" title="Click to view full size image" />


## Create a new Client secret
1. Once you click register, the App Overview Page would be open.
2. From the overview page, Copy and Save following from it:
Copy & Save **Directory (tenant) ID** → `tenantId`
Copy & Save **Application (client) ID** → `clientId`.

  <docimage path={require('./static/azure-client-id-and-tenant-id.png')} width="50%" height="50%" title="Click to view full size image" />

3. Now click on **Certificates & secrets** in the left panel.
4. Go to **Client secrets (0)** tab.
5. Click on **New client secret**.
6. Enter **Description** `Harness CCM Client Secret`.
7. Select **Expires** from the drop down select `730 days (24 months)`(or the maximum allowed time).
8. Click **Add** Button.

  <docimage path={require('./static/azure-client-secret.png')} width="50%" height="50%" title="Click to view full size image" />

9. From the new Client secret, Copy & Save **Value** → `clientSecret`. For more information, go to [Add credentials](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#add-credentials).

:::important note
Make a note of the following: 

- tenantId

- clientId

- clientSecret
:::  

## Setup a new Storage Account and a new Storage Container
1. Select a **Subscription** from the drop down.
2. Select a **Resource Group** from the drop down.
3. Enter **Storage account** name `ccmbillingdatasmp`. Save **Storage account name**  → `storageName`
4. Move to **Advanced** Tab.
5. In **Blob storage** section, enable `Allow cross-tenant replication`
6. Click on Review.

  <docimage path={require('./static/azure-storage-account-creation.png')} width="50%" height="50%" title="Click to view full size image" />

7. Click on **Create**. For more information, go to [Create a storage account](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal).
8. Once the storage account is created, Go to **Containers** in left panel.
9. Click on **+ Container**.
10. Enter **Name** as `billingdatacontainer`. Save **Name** as → `containerName`
11. Click on **Create**. For more information, go to [Create a container](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container).

  <docimage path={require('./static/azure-container-creation.png')} width="50%" height="50%" title="Click to view full size image" />

12. Go to **Shared access signature** in left panel.
13. Check all **Allowed resource types** which are `Service`, `Container` and `Object`.
14. Add 10 years to **End** in **Start and expiry date/time**.
15. Click on **Generate SAS and connection string**.
16. Save **SAS token** → `sasToken` starting from `sv=`, ignore `?` in beginning. For more information, go to [Create your SAS tokens](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/create-sas-tokens?view=doc-intel-4.0.0#use-azure-storage-explorer).

  <docimage path={require('./static/azure-destination-storage-sas-token.png')} width="50%" height="50%" title="Click to view full size image" />

:::important note
Make a note of the following: 

- storageName

- containerName

- sasToken
:::

## Deploy workloads via Helm charts

1. Clone the chart repository.

```
git clone git@github.com:harness/helm-charts.git
cd main/src/harness
```
2. Upgrade charts if you're already using Harness Self-managed Enterprise Edition services. Perform the following steps to update the override files:
     1. Retrieve the current override values provided during the installation or upgrade of the Helm charts.
          ```
          helm get values <chart-name> -n <namespace> > override.yaml
          ```
          
      1. After obtaining the override file, you can make necessary modifications as mentioned below.


<details>
<summary>Override file changes for a connected environment</summary>

```
global:
  ccm:
    enabled: true
  smtpCreateSecret:
    enabled: true
  license:
    ng: <SMP NG License with CCM>
  database:
    clickhouse:
      enabled: true

ccm:
  nextgen-ce:
    cloudProviderConfig:
      AZURE_APP_CLIENT_ID: "<clientId>"
  batch-processing:
    azureConfig:
      AZURE_SMP_ENABLED: true
      AZURE_SMP_REPORT_RETRIES: 5
      AZURE_SMP_HISTORY_TIME_DELTA: 1
      HARNESS_CE_AZURE_CONTAINER_NAME: "<containerName>"
      HARNESS_CE_AZURE_STORAGE_NAME: "<storageName>"
      HARNESS_CE_AZURE_IS_SYNC_JOB_DISABLED: "false"
```
</details>

:::important note
Air-gapped environment for Azure in SMP is not supported as of now
:::

3. After making the necessary updates to the override file, you can proceed with the Helm chart upgrade.  


```
helm upgrade <chart-name> <chart-directory> -n <namespace> -f override.yaml 
```
          
    

## Handling Kubernetes secrets

When installing or upgrading the Helm charts, Kubernetes secrets with default values are created within the cluster. These generated secrets should be updated with the values mentioned above. Before updating the secrets, you need to convert the secret into base64 encoded format. For example, if your **HARNESS_CE_AZURE_CLIENTID** value is "clientId", it would be stored as `Y2xpZW50SWQ==` after encoding.

The following are the secrets specific to CCM services:

- batch-processing


```
kubectl edit secret batch-processing -n <namespace>
```

```
HARNESS_CE_AZURE_CLIENTSECRET: "<clientSecret>"
HARNESS_CE_AZURE_SAS: "<sasToken>"
HARNESS_CE_AZURE_CLIENTID: "<clientId>"
HARNESS_CE_AZURE_TENANTID: "<tenantId>"
```

- cloud-info-secret-mount [config-file]


```
kubectl edit secret cloud-info-secret-mount -n <namespace>
```

```
config-file: <Config file> [In "Config file" provided below: Replace <clientId>, <tenantId> and <clientSecret>]
```

- nextgen-ce


```
kubectl edit secret nextgen-ce -n <namespace>
```

```
AZURE_APP_CLIENT_SECRET: "<clientSecret>"
```
<details>
<summary>Config file</summary>


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

# http address of a Prometheus instance that has AWS spot price metrics via banzaicloud/spot-price-exporter.
# If empty, the cloudinfo app will use current spot prices queried directly from the AWS API.
prometheusAddress = ""

# advanced configuration: change the query used to query spot price info from Prometheus.
prometheusQuery = "avg_over_time(aws_spot_current_price{region=\"%s\", product_description=\"Linux/UNIX\"}[1w])"

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

# base64 encoded credentials in json format (base64 encoded content of the credential file)
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

The following are some secrets from platform-service that you need to update:

- smtp-secret - Required to support budget alerts email.


```
kubectl edit secret smtp-secret -n <namespace> 
```

```
SMTP_HOST: <SMTP_HOST>
SMTP_PASSWORD: <SMTP_PASSWORD>
SMTP_PORT: <SMTP_PORT>
SMTP_USE_SSL: <SMTP_USE_SSL>
SMTP_USERNAME: <SMTP_USERNAME>
```

:::important important
Increase TimescaleDB to 100Gi: `kubectl edit pvc wal-volume-harness-timescaledb-0 -n <namespace>`. Features like Recommendations and Anomalies within CCM services use it.
:::

## Next steps

- [Kubernetes connector setup](https://developer.harness.io/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-kubernetes#create-ccm-connector)
- [Azure connector setup](https://developer.harness.io/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure)
