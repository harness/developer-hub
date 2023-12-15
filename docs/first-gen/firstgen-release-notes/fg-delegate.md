---
title: Delegate Release Notes (FirstGen)
description: These release notes document changes to Harness Delegate in Harness FirstGen.
sidebar_position: 30
---
```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

These release notes document changes to Harness Delegate in Harness FirstGen.

Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.

:::info note
Harness deploys changes to Harness SaaS clusters on a progressive basis. This means the features and fixes that these release notes describe might not be immediately available in your cluster.

To identify the cluster that hosts your account, open Harness FirstGen, go to **Account Settings**, and then select **Overview**. The cluster is listed in **Harness Cluster Hosting Account**.
:::

For FirstGen SaaS release notes, go to [Harness SaaS Release Notes (FirstGen)](/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes.md). For Self-Managed Enterprise Edition release notes, go to [Self-Managed Enterprise Edition (FirstGen)](/docs/first-gen/firstgen-release-notes/harness-on-prem-release-notes.md).

import Deleos from '/docs/platform/shared/delegate-legacy-eos.md'

<Deleos />

## Important notice - action required

:::info caution
Please make the updates below as soon as possible. If you need assistance, contact [Harness Support](mailto:support@harness.io), and a member of the engineering team will assist you.

If you do not make the required image and AMI upgrades, your legacy delegate upgrades will be paused, which can lead to pipeline execution failures when Harness SaaS releases newer versions.

:::

Harness upgraded to the Java Runtime Environment (JRE) version 17 with the Harness Delegate FirstGen release 81202 to address potential security vulnerabilities. Harness includes the Watcher JAR file and startup scripts in the legacy delegate image *`latest`*. The `start.sh` file used to include the hardcoded Watcher version, but later, Harness started fetching the Watcher version at runtime. The new Watcher version, 80505, includes a feature to determine the correct JRE version and download it at runtime.

Harness has learned that some customers are starting their delegates in ways that cause them to start with an earlier version of Watcher. The following scenarios lead to delegates starting with an earlier Watcher version:

- Copying the *`latest`* image of the FirstGen legacy delegate to your repository, which may utilize older, less secure Secure Hash Algorithms (SHAs) for your delegates.
- Creating a custom image when using the legacy delegate image with the *`latest`* tag.
- Creating your Amazon Machine Images (AMI) with old startup scripts, which might include a `start.sh` with an earlier Watcher version.

If any of these scenarios occur and you start new delegates or bounce the existing delegate with a Watcher version < 80505, then your delegates will not start.

**Solution**

To resolve this issue, do the following:

- If you copied the image to your repo, Harness recommends that you use `harness/delegate:latest` directly in your delegate or pull the image monthly from `harness/delegate:latest`.
- If you created a custom image, rebuild the custom image. Harness recommends that you rebuild the custom image monthly.
- If you created your AMI for your shell delegate with startup scripts, Harness recommends that you rebuild the AMI monthly and apply it to your delegate.

#### Deprecation notice

**Kustomize 3.4.5**

import Kustomizedep from '/release-notes/shared/kustomize-3-4-5-deprecation-notice.md'

<Kustomizedep />

## December 2023

### Harness version 81812, Harness Delegate version 23.12.81803

#### Fixed issues

- Fixed the `java.io.InterruptedIOException` message in delegate logs by adding the source URL and removing duplicate error logs. (PL-40118)

## November 2023

### Harness version 81609, Harness Delegate version 23.11.81601

#### Fixed issues

- Fixed the following issues:

   - The delegate Stackdriver logger didn't work if the delegate token was base64-encoded format.
   - When the `DELEGATE_TYPE` was `KUBERNETES` and the delegate wasn't deployed in Kubernetes, the delegate failed to start. (PL-42452)

### Harness version 81401, Harness Delegate version 23.11.81403

#### Fixed issue

- Instance Sync V1 in Harness FirstGen did not update the count of Helm pod instances after the instances were removed from your environment. (CDS-82385, ZD-52612)

  This issue occurred when the following feature flags were configured as shown:
  - `INSTANCE_SYNC_V2_CG`. Disabled
  - `MOVE_CONTAINER_INSTANCE_SYNC_TO_PERPETUAL_TASK`. Enabled
  - `STOP_INSTANCE_SYNC_VIA_ITERATOR_FOR_CONTAINER_DEPLOYMENTS`. Enabled

  For synchronizing the instances of Native Helm deployments, the assigned container validation tasks returned a null because the delegate could not pick up the task. Consequently, Harness did not update the instance count.

  This issue has been resolved. Instance Sync V1 will now show the actual instance count after you have redeployed the service. However, Harness might require about 10 min to show the updated instance count. 

  This item requires Harness Delegate version 81403. For information about features that require a specific delegate version, go to the [Delegate release notes](/release-notes/delegate).

## October 2023

### Harness version 81200, Harness Delegate version 23.10.81202

#### Fixed issue

- Fixed an issue related to the decryption of secrets with curly braces in their value. (PL-41943, ZD-52075)

### Harness version 81009, Harness Delegate version 23.10.81010

#### New features and enhancements

- Added support for referencing JSON secret keys with dots at the top level. Nested keys with dots are not supported. (PL-41715, ZD-51757)

#### Fixed issue

- OAuth sign-up emails were stored without being converted to lowercase. This caused duplicate emails in Harness with different cases. The issue was fixed by storing OAuth sign-up emails with lowercase. (PL-39331, ZD-47425)

### Harness version 80810, Harness Delegate version 23.09.80804

#### Fixed issue

- You can no longer update `DelegateIP` or `DelegateName` using the delegate update API. (PL-40795, ZD-44419)

### Harness version 80504, Harness Delegate version 23.09.80505

#### New features and enhancements

- The OWASP Java HTML Sanitzer version is upgraded to 20220608.1. (PL-40807)

- The Spring Boot library is upgraded to version 2.7.14. (PL-40810)

#### Fixed issues

- Fixed an issue when using multiple HTTP Helm Chart repositories that could lead to an increase in CPU utilization on the delegate due to background connector validation tasks. This was caused by running the Helm repository update during the validation tasks. (CDS-76433, ZD-48363)

- With an earlier update, delegates tried to create a Kubernetes runner, which created an API client using the Kubernetes config. Shell delegates tried to fetch the local config. GKE configurations with expired credentials resulted in an error. (PL-40631, ZD-48998, ZD-49702)

   This issue is fixed. Harness catches the exception and continues with delegate startup.

## August 2023

### Harness version 80308, Harness Delegate version 23.08.80308

Harness FirstGen release 80308 includes the following changes for the Harness Delegate.

#### New features and enhancements

- If you use the App Role authentication method in the Hashicorp Vault connector, you can choose to cache the vault token. The token is cached on the Harness Delegate for a time duration equal to the TTL of the vault token, with 1% leeway. 

  By default, caching is enabled for all existing connectors. To disable caching, go to the connector's YAML configuration and set the `enableCache` parameter to `false`. Harness UI support to enable and disable caching will be added in a subsequent release. (PL-39821)

#### Fixed issues

- Fixed an issue observed in Canary deployments where the rollback stage could not identify and delete the canary workload in some clusters. (CDS-76240)

- Fixed the delegate task *acquire call* retry flow in Harness Manager. Harness Manager returned NPEs when retrying acquire calls because `taskDataV2` was not copied to `taskData` in the *acquire call* retry flow. Tasks timed out because the delegate couldn't acquire the data. To fix this issue, the 'taskData' field in Harness Manager is now populated. (PL-40646)

### Harness version 80120, Harness Delegate version 23.08.80104

#### Fixed issue

Earlier, even though you could use the `JAVA_OPTS` environment variable to specify JVM options for the delegate, you could not override the default JVM options that Harness used, namely `-XX:MaxRAMPercentage=70.0` and `-XX:MinRAMPercentage=40.0`. The option to override the defaults was unavailable because the value of JAVA_OPTS was prepended to the default JVM options. (PL-38839)

This issue has been fixed. The value of JAVA_OPTS is now appended to the default JVM options, thus allowing you to override the default options.

#### Hotfix version 79910

The delegate stopped trying to reconnect to the WebSocket if the infrastructure experienced a network outage for over five minutes. (PL-40547)

This issue is fixed. The delegate keeps trying to reconnect to the WebSocket until it's successful.

#### Hotfix version 23.07.79908

Google Cloud builds failed with the message `Invalid Google Cloud Platform credentials`. (CDS-73352)

This issue is now fixed with a code enhancement to GCP build triggers integration to improve stability.

:::info note
Currently, this feature is behind the feature flag, `GCB_CI_SYSTEM`.
:::

#### Hotfix version 23.07.79711

Google Cloud builds failed with the message `Invalid Google Cloud Platform credentials`. (CDS-73352)

This issue is now fixed with a code enhancement to GCP build triggers integration to improve stability.

:::info note
Currently, this feature is behind the feature flag, `GCB_CI_SYSTEM`.
:::

## July 2023

### Harness version 79915, Harness Delegate version 23.07.79904

#### New features and enhancements

- The Universal Base Image Minimal used for the Harness Delegate has been upgraded to ubi8-minimal:8.8. This upgrade was necessitated by version 8.7 (ubi8-minimal:8.7) reaching end of life. (PL-39720)

## June 2023

### Harness version 79714, Harness Delegate version 23.06.79707

#### New features and enhancements

- When a delegate token is revoked, Harness now sends `SELF_DESTRUCT` to all delegates that are using the revoked token. (PL-38957)

- Upgraded the delegate JRE to 11.0.19_7. (PL-37994)

#### Fixed issues

- Kubernetes deployments timed out and failed when listing pods. (CDS-71328, ZD-45584)

  This issue is fixed by modifying the delegate's Kubernetes API client timeout. 

  Harness Delegate uses Kubernetes Java client to make programmatic API calls to the Kubernetes server. The API client uses an OkHttp client whose default [read timeout](https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/-builder/read-timeout/) and [connect timeout](https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/-builder/connect-timeout/) values are set to 120 and 60 seconds respectively. These values can be configured by using environment variables, modifying the delegate's container environment. The values must be specified in seconds. 

  The environment variables for these timeouts are:

  - Read timeout: `K8S_API_CLIENT_READ_TIMEOUT`
  - Connect timeout: `K8S_API_CLIENT_CONNECT_TIMEOUT`

- Helm delegate installation failed in Self-Managed Enterprise Edition. (PL-39028)

   This issue is fixed with a code enhancement. The `DELPOY_MODE` is now set to `KUBERNETES_ONPREM` for Self-Managed Enterprise Edition Docker and Helm delegates.

### Harness version 79514, Harness Delegate version 23.06.79503

#### New features and enhancements

- Enhanced the application handling mechanism when the `HARNESS__STATUS__IDENTIFIER` environment variable is not set to `ACTIVE`. (CDS-68821)

  When the `HARNESS__STATUS__IDENTIFIER` environment variable is not set to `ACTIVE` for any of the releases of an application, Harness starts looking for the application that has the same name as the release name. This ensures that the correct active application is always picked in case the `HARNESS__STATUS__IDENTIFIER` is removed.

#### Fixed issue

- Helm execution failed with `KubernetesClientException` error. (CDS-70386, ZD-45051)

  The Kubernetes GET APIs returned a 400 bad request during steady state check. This was occurring when Harness used a fabric8 client with Kubernetes cluster version < 1.16, or when the feature flag, `HELM_STEADY_STATE_CHECK` is turned off. 

  This issue is fixed.

## May 2023

### Harness version 79306, Harness Delegate version 23.05.79307

#### Fixed issues

- Executions were failing with `Canary failed: [Canary Deployment failed - NoSuchMethodError: org.yaml.snakeyaml.constructor.SafeConstructor: method 'void <init>()' not found ]` error message. (CDS-68293, ZD-43753, ZD-43769)
  
  The Fabric8 library used by Harness is upgraded from version 5.x to 6.x. Harness was explicitly using snake.yaml version 2.x due to vulnerabilities present in the 1.x version.
  
  Harness' usages of Fabric8 library were throwing the above mentioned because Fabric8 library version 5.12.1 uses the old snake.yaml library version 1.x.

  Customers who were using the following were affected:
    - FirstGen Kubernetes deployments that contain Istio's VirtualService/DestinationRule objects.
    - FirstGen Traffic Split step.
    - FirstGen Native Helm deployments with Kubernetes cluster version 1.16 or earlier.
    - NextGen Kubernetes deployments that contain Istio's VirtualService/DestinationRule objects.
    - NextGen Native Helm deployments with Kubernetes cluster version 1.16 or earlier.

  This change does not create any behavioral changes.

- Secret decryption failures were not included in logs. (PL-31517)

  A code enhancement to return runtime errors from secret managers during decryption fixed this issue.

- The org.json:json is upgraded from version 20160810 to 20230227 to address vulnerabilities. (PL-37905)

## April 2023

### Harness version 79111, Harness Delegate version 23.04.79106

#### Fixed issues

- Updated legacy delegate images `kubectl` version to 1.25.8. (DEL-6087)

- Updated the error message for failed task execution to include the delegate host name or ID. (DEL-6187)

- Removed the `DELEGATE_IMAGE_TAG` version override when immutable delegates are enabled. (DEL-6202)

## March 2023

### Harness version 78817, Harness Delegate version 23.03.78705

#### New features and enhancements

Users can override the delegate image for their account using an endpoint. (DEL-6024)

Use the following endpoint: 

/version-override/delegate-tag

Pass the arguments in query param:

1- accountIdentifier : String

2- delegate image tag : String

Optional arguments:

1- validTillNextRelease : Boolean

2- validForDays : int

Use an api-key with account edit permission in the API header.

### Harness version 78712, Harness Delegate version 23.03.78705

#### Fixed issue

Upgraded `org.codehaus.groovy:groovy` to 3.0.15 to fix a vulnerability. (DEL-6015)

### Harness version 78619, Harness Delegate version 23.03.78500

#### New features and enhancements

- The secrets manager cache was moved from Redis to the Harness Manager's local pod. (DEL-5884)

  This move further enhances security because the secrets manager configuration no longer goes outside of the Harness Manager's pod.
  
- Harness Delegate task collections were migrated to a new database. (DEL-5831) 

  This migration is controlled through a configuration flag. For a period of time after the migration, any newly created tasks will have an ID with a **- DEL** suffix.

#### Fixed issue

API output includes a new field called **Disconnected**, which determines if a delegate is connected. (DEL-5995)

The **Disconnected** field is set to **true** if no heartbeat communications occur between the delegate and the Harness Manager for five minutes. 

## February 2023

### Harness version 78507, Harness Delegate version 23.02.78500

#### New features and enhancements

- You can dynamically select delegates by hostname during pipeline runs. To do so, select delegates by hostname from your delegate groups. (DEL-5052)

### Harness version 78421, Harness Delegate version 23.02.78306

#### New features and enhancements

- The delegate was refactored to remove the `HelmChart` entity from the delegate JAR file. The `HelmChart` entity was replaced with a data transfer object (DTO) that does not include an annotation for MongoDB. The delegate dependency on MongoDB was eliminated. (DEL-5732)

### Harness version 78321, Harness Delegate version 23.02.78306

##### New features and enhancements

This release introduces the following security enhancements:

- The immutable delegate image was refreshed with updated versions of client tools. This reduces security vulnerabilities for the delegate and enhances security. The following table details the updates. (DEL-5688)
  
  | **Third-party tool** | **78101 and earlier** | **78306 and later** |
  | :-- | :-: | :-: |
  | kubectl | 1.13.2 | 1.24.3 |
  | | 1.19.2 | |
  | go-template | 0.4 | 0.4.1 |
  | | 0.4.1 | |
  | harness-pywinrm | 0.4-dev | 0.4-dev |
  | helm | 2.13.1 | 2.13.1 |
  | | 3.1.2 | 3.1.2 |
  | | 3.8.0 | 3.8.0 |
  | chartmuseum | 0.12.0 | 0.15.0 |
  | | 0.8.2 | |
  | tf-config-inspect | 1.0 | 1.1 |
  | | 1.1 | |
  | oc | 4.2.16 | 4.2.16 |
  | kustomize | 3.5.4 | 4.5.4 |
  | | 4.0.0 | |
  | scm | The Harness-generated library and version are changed with every fix. | The Harness-generated library and version are changed with every fix. |
  
- The `org_mongodb_mongodb_driver_sync` and `org_mongodb_mongodb_driver_legacy` libraries were removed from the delegate to eliminate their vulnerabilities. (DEL-5721) 

#### Fixed issues

This release includes the following fixes.

- Added functionality to explicitly release a lock on the profile (profile.lock file). This resolves a rare case in which there is no running profile but a profile.lock file or profile in a locked state exists. (DEL-5659)

- Added validation to ensure that delegates using the YAML of the Legacy Delegate fail on start with the correct error message. (DEL-5715)

- Changed delegate behavior to ensure that the tasks assigned to a delegate fail if the delegate does not send heartbeats for a period of three minutes. (DEL-5821)

## January 2023

### Harness version 78215, Harness Delegate version 23.01.78101

Harness FirstGen release 78215 includes no changed features or fixes for Harness Delegate.
