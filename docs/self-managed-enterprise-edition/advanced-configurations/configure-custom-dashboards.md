---
title: Custom Dashboards on Self-Managed Enterprise Edition
description: Learn how to configure a Harness Custom Dashboards on Self-Managed Enterprise Edition.
sidebar_label: Configure Custom Dashboards
sidebar_position: 20
---


### Prerequisites  

:::info
    To proceed with a custom dashboard, you may need a Looker license key. Reach out to [Harness support](mailto:support@harness.io) for assistance
:::

Dashboards application uses [Looker](https://cloud.google.com/looker), a third-party tool that needs its own domain name to work properly.  

To set it up:  
1. Create a DNS CNAME entry for Looker.  
2. Use **looker.your-domain.tld** as the domain name.  
3. Point the Looker CNAME to the existing A record for your installation.  

### Configuration 

To enable dashboards the following is the minimum configuration required.

Looker is required for custom dashboards but is not enabled by default. To enable this feature, you can find `lookerPubDomain` in your DNS settings and the Looker license key from [Harness support team](mailto:support@harness.io)

```yaml
  global:
    # required if SMP is installed in airgapped mode
    airgap: true
    ngcustomdashboard:
      enabled: true
  ng-custom-dashboards:
    config:
      lookerPubDomain: 'looker.domain.tld'
  looker:
    secrets:
      lookerLicenseKey: XXXXXXXXXXXXXXXXXXXX
      # required if SMP is installed in airgapped mode
      lookerLicenseFile: |
        XXXXXXXXXXXXXXXXXXXXXXXXXX
        XXXXXXXXXXXXXXXXXXXXXXXXXX
```

#### For Non-Air Gap Packages

Harness will provide an access token to pull the Looker image from Docker Hub, along with a Looker license key and Docker Hub credentials to update your `override.yaml` file. You must replace your Looker license after deployment.

Create a new secret and replace [YOUR-SECRET-NAME] in the YAML:

```yaml
  looker:
    # -- replace looker license at runtime (after deployment)
    image:
      imagePullSecrets: [YOUR-SECRET-NAME]
```
For more details, refer to [documentation](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#create-a-secret-by-providing-credentials-on-the-command-line) on pulling images from a private registry.

#### For Air Gap Packages

Harness no longer includes the Looker image in air gap bundles. You can still request onboarding for custom dashboards. Upon request, Harness will generate an access token for pulling the Looker image from Docker Hub. Following this, Harness will provide you with the Looker license key and Docker Hub credentials.

Harness has updated the `harness-airgap-images.sh` script in the Helm chart repository to support pushing the Looker image to a private registry. The script will prompt:
  - Whether you want to install custom dashboards (`ng-dashboard`).
  - Your Docker Hub credentials and image details.

To get DOCKERHUB_USERNAME and DOCKERHUB_PASSWORD, contact [Harness Support](mailto:support@harness.io). When asked for RELEASE_VERSION, enter the desired Helm chart version (e.g., 0.17.0). The script will then push the Looker image to your private repository.


### Looker Ingress/Istio Configuration  

Looker requires a dedicated domain name, which makes its Ingress/Istio configuration slightly different from other Harness charts.  

Key considerations:  
- The examples provided include only the additional configuration required for this chart. Ensure to merge them with existing `values.yaml` overrides.  
- Pay close attention when merging the global sections to prevent conflicts.  
- All examples assume TLS is enabled. To ensure `looker.domain.tld` functions correctly, update TLS certificates to include this domain.  
- Alternatively, try to generate a separate certificate and reference it in the configuration.  

#### Ingress 

    ```yaml
    global:
        ngcustomdashboard:
            enabled: true

    ng-custom-dashboards:
        config:
            lookerPubDomain: 'looker.domain.tld'

    looker:
        ingress:
            hosts:
            - 'looker.domain.tld'
            tls:
            secretName: 'looker-tls'

    secrets:
        lookerLicenseKey: XXXXXXXXXXXXXXXXXXXX
    ```

### Istio Configuration Options  

There are three ways to configure Istio for Looker:  

1. The Istio gateway is created and managed by you.  
2. The Istio gateway is automatically created by Harness at a global level.  
3. The Istio gateway is created specifically for this chart.  

#### Using a Customer-Managed Istio Gateway  

If you are managing your own Istio gateway, you will need to update your gateway configuration to route traffic for `looker.domain.tld`.

    ```yaml
    global:
        istio:
            virtualService:
                gateways:
                - istio-namespace/gateway-name
    looker:
        istio:  
            gateway:
                create: false
            virtualService:
                enabled: true
                hosts:
                - looker.domain.tld
    ```

### Istio - Gateway Created by Harness  

If you are using the Istio gateway managed by Harness, you only need to add the Looker domain to the list of hosts in your existing `global.istio` configuration.  

#### Example Configuration:  

```yaml
global:
  istio:
    gateway:
      create: true
    hosts:
      - looker.domain.tld
looker:
  istio:
    gateway:
      create: false
    virtualService:
      enabled: true
      hosts:
        - looker.domain.tld
```

### Istio - Gateway Created by This Chart  

If you prefer to configure the Istio gateway within this chart, you can define the settings in your `values.yaml` override.  

#### Example Configuration:  

```yaml
looker:
  istio:
    gateway:
      create: true
      port: 443
      protocol: HTTPS
    hosts:
      - looker.domain.tld
    tls:
      mode: SIMPLE
      credentialName: 'looker-tls'
    virtualService:
      enabled: true
      hosts:
        - looker.domain.tld
```

By selecting the appropriate method, you can ensure seamless integration of Looker with your existing Istio setup.

### Global Configuration

| **Key**         | **Type** | **Default** | **Description**                                                                      |
| --------------- | -------- | ----------- | ------------------------------------------------------------------------------------ |
| `global.airgap` | string   | `"false"`   | Indicates if the deployment is in an air-gapped environment with no internet access. |

### Looker Configuration

| **Key**                                    | **Type** | **Default**                   | **Description**                                                                              |
| ------------------------------------------ | -------- | ----------------------------- | -------------------------------------------------------------------------------------------- |
| `looker.secrets.lookerLicenseKey`          | string   | `""`                          | **Required.** Defines looker license key.                                                    |
| `looker.secrets.lookerLicenseFile`         | string   | `""`                          | Defines looker license file (**Required if** harness is installed in air-gapped environment) |
| `looker.affinity`                          | object   | `{}`                          | Defines node/pod affinity rules for scheduling.                                              |
| `looker.clickhouseSecrets.password.key`    | string   | `"admin-password"`            | Secret key used to retrieve the ClickHouse admin password.                                   |
| `looker.clickhouseSecrets.password.name`   | string   | `"clickhouse"`                | Name of the Kubernetes secret storing the ClickHouse password.                               |
| `looker.config.clickhouseConnectionName`   | string   | `"smp-clickhouse"`            | Connection name for ClickHouse used by Looker.                                               |
| `looker.config.clickhouseDatabase`         | string   | `"ccm"`                       | Name of the ClickHouse database used for CCM.                                                |
| `looker.config.clickhouseHost`             | string   | `"clickhouse"`                | Hostname of the ClickHouse database instance.                                                |
| `looker.config.clickhousePort`             | string   | `"8123"`                      | HTTP port for ClickHouse queries.                                                            |
| `looker.config.clickhouseUser`             | string   | `"default"`                   | Username for authenticating with ClickHouse.                                                 |
| `looker.config.email`                      | string   | `"harnessSupport@harness.io"` | **Required.** Email address for Looker admin user.                                           |
| `looker.config.firstName`                  | string   | `"Harness"`                   | First name for the initial Looker admin user.                                                |
| `looker.config.lastName`                   | string   | `"Support"`                   | Last name for the initial Looker admin user.                                                 |
| `looker.config.projectName`                | string   | `"Harness"`                   | Name of the Looker project being created.                                                    |
| `looker.config.timescaleDatabase`          | string   | `"harness"`                   | Name of the TimescaleDB database used by Looker.                                             |
| `looker.ingress.hosts`                     | list     | `[]`                          | **Required if ingress is enabled.** Specifies the DNS domain for Looker.                     |
| `looker.persistentVolume.storage.database` | string   | `"20Gi"`                      | Disk size allocated for Looker's internal database storage.                                  |
| `looker.persistentVolume.storage.models`   | string   | `"2Gi"`                       | Disk size allocated for Looker model files.                                                  |

### NG Custom Dashboard Configuration

| **Key**                                               | **Type** | **Default**              | **Description**                                         |
| ----------------------------------------------------- | -------- | ------------------------ | ------------------------------------------------------- |
| `ng-custom-dashboards.config.lookerApiVersion`        | string   | `"4.0"`                  | Looker API version for compatibility with SDK.          |
| `ng-custom-dashboards.config.lookerHost`              | string   | `"hrns-looker-api"`      | Internal hostname for Looker API.                       |
| `ng-custom-dashboards.config.lookerPort`              | string   | `"19999"`                | Port number used by Looker API.                         |
| `ng-custom-dashboards.config.lookerPubDomain`         | string   | `""`                     | **Required.** Public domain where Looker is accessible. |
| `ng-custom-dashboards.config.lookerTimeout`           | string   | `"120"`                  | Timeout (in seconds) for Looker API requests.           |
| `ng-custom-dashboards.config.redisHost`               | string   | `"harness-redis-master"` | Redis instance hostname.                                |
| `ng-custom-dashboards.config.redisPort`               | string   | `"6379"`                 | Redis service port.                                     |
| `ng-custom-dashboards.config.redisSentinel`           | string   | `"true"`                 | Indicates if Redis Sentinel mode is enabled.            |
| `ng-custom-dashboards.config.redisSentinelMasterName` | string   | `"harness-redis"`        | Name of the master node in Redis Sentinel mode.         |
