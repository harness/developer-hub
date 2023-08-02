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


## Latest - July, 18 2023, Harness version 79915, Harness Delegate version 79904

### Deprecation notices

#### Helm 2

import Helmdep from '/release-notes/shared/helm-2-deprecation-notice.md'

<Helmdep />

#### Kustomize 3.4.5

import Kustomizedep from '/release-notes/shared/kustomize-3-4-5-deprecation-notice.md'

<Kustomizedep />

```mdx-code-block
<Tabs>
  <TabItem value="What's new">
```

- The Universal Base Image Minimal used for the Harness Delegate has been upgraded to ubi8-minimal:8.8. This upgrade was necessitated by version 8.7 (ubi8-minimal:8.7) reaching end of life. (PL-39720)

```mdx-code-block
  </TabItem>
  <TabItem value="Early access">
```

This release does not include any new early access features.

```mdx-code-block
  </TabItem>
  <TabItem value="Fixed issues">
```

This release does not include any fixed issues.

```mdx-code-block
  </TabItem>
  <TabItem value="Hotfix release">
```

## Hotfix version 79908

Google Cloud builds failed with the message `Invalid Google Cloud Platform credentials`. (CDS-73352)

This issue is now fixed with a code enhancement to GCP build triggers integration to improve stability.

:::info note
Currently, this feature is behind the feature flag, `GCB_CI_SYSTEM`.
:::


## Hotfix version 79711

Google Cloud builds failed with the message `Invalid Google Cloud Platform credentials`. (CDS-73352)

This issue is now fixed with a code enhancement to GCP build triggers integration to improve stability.

:::info note
Currently, this feature is behind the feature flag, `GCB_CI_SYSTEM`.
:::

```mdx-code-block
  </TabItem>
</Tabs>
```

## Previous releases

<details>
<summary>2023 releases</summary>

### June 28, 2023, Harness version 79714, Harness Delegate version 79707

#### What's new

- When a delegate token is revoked, Harness now sends `SELF_DESTRUCT` to all delegates that are using the revoked token. (PL-38957)

- Upgraded the delegate JRE to 11.0.19_7. (PL-37994) 

#### Early access

This release does not include any new early access features.

#### Fixed issues

- Kubernetes deployments timed out and failed when listing pods. (CDS-71328, ZD-45584)

  This issue is fixed by modifying the delegate's Kubernetes API client timeout. 

  Harness Delegate uses Kubernetes Java client to make programmatic API calls to the Kubernetes server. The API client uses an OkHttp client whose default [read timeout](https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/-builder/read-timeout/) and [connect timeout](https://square.github.io/okhttp/4.x/okhttp/okhttp3/-ok-http-client/-builder/connect-timeout/) values are set to 120 and 60 seconds respectively. These values can be configured by using environment variables, modifying the delegate's container environment. The values must be specified in seconds. 

  The environment variables for these timeouts are:

  - Read timeout: `K8S_API_CLIENT_READ_TIMEOUT`
  - Connect timeout: `K8S_API_CLIENT_CONNECT_TIMEOUT`

- Helm delegate installation failed in Self-Managed Enterprise Edition. (PL-39028)

   This issue is fixed with a code enhancement. The `DELPOY_MODE` is now set to `KUBERNETES_ONPREM` for Self-Managed Enterprise Edition Docker and Helm delegates.

### June 9, 2023, Harness version 79514, Harness Delegate version 79503

#### What's new

- Enhanced the application handling mechanism when the `HARNESS__STATUS__IDENTIFIER` environment variable is not set to `ACTIVE`. (CDS-68821)

  When the `HARNESS__STATUS__IDENTIFIER` environment variable is not set to `ACTIVE` for any of the releases of an application, Harness starts looking for the application that has the same name as the release name. This ensures that the correct active application is always picked in case the `HARNESS__STATUS__IDENTIFIER` is removed.

#### Early access 

This release does not include any new early access features.

#### Fixed issues

- Helm execution failed with `KubernetesClientException` error. (CDS-70386, ZD-45051)

  The Kubernetes GET APIs returned a 400 bad request during steady state check. This was occurring when Harness used a fabric8 client with Kubernetes cluster version < 1.16, or when the feature flag, `HELM_STEADY_STATE_CHECK` is turned off. 

  This issue is fixed.

### May 23, 2023, Harness version 79306, Harness Delegate version 79307

Harness FirstGen release 79306 includes the following feature changes and fixes for the Harness Delegate.

#### What's new

This release does not include any new features.

#### Early access 

This release does not include any new early access features. 

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

### April 22, 2023, Harness version 79111, Harness Delegate version 79106

Harness FirstGen release 79111 includes the following feature changes and fixes for the Harness Delegate.

#### What's new

This release does not include any new features.

#### Early access 

This release does not include any new early access features. 

#### Fixed issues

This release includes the following fixes:

- Updated legacy delegate images `kubectl` version to 1.25.8. (DEL-6087)

- Updated the error message for failed task execution to include the delegate host name or ID. (DEL-6187)

- Removed the `DELEGATE_IMAGE_TAG` version override when immutable delegates are enabled. (DEL-6202)

### March 23, 2023, Harness version 78817, Harness Delegate version 78705

Harness FirstGen release 78817 includes the following feature changes and fixes for the Harness Delegate.

#### What's new

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

#### Early access 

This release does not include any new early access features. 

#### Fixed issues

This release does not include any fixed issues. 

### March 15, 2023, Harness version 78712, Harness Delegate version 78705

Harness FirstGen release 78712 includes the following feature changes and fixes for the Harness Delegate.

#### What's new

This release does not include any new features. 

#### Early access 

This release does not include any new early access features. 

#### Fixed issues

Upgraded org.codehaus.groovy:groovy to 3.0.15 to fix a vulnerability. (DEL-6015)

### March 8, 2023, Harness version 78619, Harness Delegate version 78500

Harness FirstGen release 78619 includes the following feature changes and fixes for the Harness Delegate.

#### What's new

- The secrets manager cache was moved from Redis to the Harness Manager's local pod. (DEL-5884)

  This move further enhances security because the secrets manager configuration no longer goes outside of the Harness Manager's pod.
  
- Harness Delegate task collections were migrated to a new database. (DEL-5831) 

  This migration is controlled through a configuration flag. For a period of time after the migration, any newly created tasks will have an ID with a **- DEL** suffix.

#### Early access 

This release does not include any new early access features. 

#### Fixed issues

API output includes a new field called **Disconnected**, which determines if a delegate is connected. (DEL-5995)

The **Disconnected** field is set to **true** if no heartbeat communications occur between the delegate and the Harness Manager for five minutes. 

### February 23, 2023, Harness version 78507, Harness Delegate version 78500

Harness FirstGen release 78507 includes the following feature changes and fixes for Harness Delegate.

#### What's new

- You can dynamically select delegates by hostname during pipeline runs. To do so, select delegates by hostname from your delegate groups. (DEL-5052)

#### Fixed issues

This release does not include fixed issues for Harness Delegate.

### February 15, 2023, Harness version 78421, Harness Delegate version 78306

Harness FirstGen release 78421 includes the following feature changes and fixes for Harness Delegate.

#### What's new

- The delegate was refactored to remove the `HelmChart` entity from the delegate JAR file. The `HelmChart` entity was replaced with a data transfer object (DTO) that does not include an annotation for MongoDB. The delegate dependency on MongoDB was eliminated. (DEL-5732)

### February 6, 2023, Harness version 78321, Harness Delegate version 78306

Harness FirstGen release 78321 includes the following feature changes and fixes for Harness Delegate.

#### What's new

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

### January 17, 2023, Harness version 78215, Harness Delegate version 78101

Harness FirstGen release 78215 includes no changed features or fixes for Harness Delegate.

</details>
