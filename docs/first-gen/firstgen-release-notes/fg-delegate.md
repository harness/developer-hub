# Delegate (FirstGen)

These release notes document changes to Harness Delegate in Harness FirstGen.

:::note
Harness deploys changes to Harness SaaS clusters on a progressive basis. This means the features and fixes that these release notes describe might not be immediately available in your cluster. 

To identify the cluster that hosts your account, open Harness FirstGen and go to **Account Settings**. Then click **Overview**. The cluster is listed in **Harness Cluster Hosting Account**.
:::

For FirstGen SaaS release notes, see [Harness SaaS Release Notes (FirstGen)](/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes.md). For Self-Managed Enterprise Edition release notes, see [Self-Managed Enterprise Edition (FirstGen)](/docs/first-gen/firstgen-release-notes/harness-on-prem-release-notes.md).

## March 15, 2023, Harness version 78712, Harness Delegate version 78700

Harness FirstGen release 78712 includes the following feature changes and fixes for the Harness Delegate.

### What's new

This release does not include any new features. 

### Early access 

This release does not include any new early access features. 

### Fixed issues

Upgraded org.codehaus.groovy:groovy to 3.0.15 to fix a vulnerability. (DEL-6015)


## March 8, 2023, Harness version 78619, Harness Delegate version 78500

Harness FirstGen release 78619 includes the following feature changes and fixes for the Harness Delegate.

### What's new

- The secrets manager cache was moved from Redis to the Harness Manager's local pod. (DEL-5884)

  This move further enhances security because the secrets manager configuration no longer goes outside of the Harness Manager's pod.
  
- Harness Delegate task collections were migrated to a new database. (DEL-5831) 

  This migration is controlled through a configuration flag. For a period of time after the migration, any newly created tasks will have an ID with a **- DEL** suffix.

### Early access 

This release does not include any new early access features. 

### Fixed issues

API output includes a new field called **Disconnected**, which determines if a delegate is connected. (DEL-5995)

The **Disconnected** field is set to **true** if no heartbeat communications occur between the delegate and the Harness Manager for five minutes. 

## February 23, 2023, Harness version 78507, Harness Delegate version 78500

Harness FirstGen release 78507 includes the following feature changes and fixes for Harness Delegate.

### What's new

- You can dynamically select delegates by hostname during pipeline runs. To do so, select delegates by hostname from your delegate groups. (DEL-5052)

### Fixed issues

This release does not include fixed issues for Harness Delegate.

## February 15, 2023, Harness version 78421, Harness Delegate version 78306

Harness FirstGen release 78421 includes the following feature changes and fixes for Harness Delegate.

### What's new

- The delegate was refactored to remove the `HelmChart` entity from the delegate JAR file. The `HelmChart` entity was replaced with a data transfer object (DTO) that does not include an annotation for MongoDB. The delegate dependency on MongoDB was eliminated. (DEL-5732)

## February 6, 2023, Harness version 78321, Harness Delegate version 78306

Harness FirstGen release 78321 includes the following feature changes and fixes for Harness Delegate.

### What's new

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


### Fixed issues

This release includes the following fixes.

- Added functionality to explicitly release a lock on the profile (profile.lock file). This resolves a rare case in which there is no running profile but a profile.lock file or profile in a locked state exists. (DEL-5659)

- Added validation to ensure that delegates using the YAML of the Legacy Delegate fail on start with the correct error message. (DEL-5715)

- Changed delegate behavior to ensure that the tasks assigned to a delegate fail if the delegate does not send heartbeats for a period of three minutes. (DEL-5821)


## January 17, 2023, Harness version 78215, Harness Delegate version 78101

Harness FirstGen release 78215 includes no changed features or fixes for Harness Delegate.

