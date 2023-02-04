---
title: Delegate
tags: [NextGen, "Delegate"]
date: 2023-01-13T10:00
sidebar_position: 12
---


These release notes document changes to Harness Delegate in Harness NextGen. 

:::note
Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features and fixes that these release notes describe may not be immediately available in your cluster. To identify the cluster that hosts your account, go to the **Account Overview** page. 
:::

For FirstGen SaaS release notes, see [Harness SaaS Release Notes (FirstGen)](/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes). For Self-Managed Enterprise Edition, see [Self-Managed Enterprise Edition release notes](/release-notes/self-managed-enterprise-edition).


## February 6, 2023, version 78321
### Delegate version 78306

Harness NextGen release 783xx includes the following changes for Harness Delegate.

:::note
The repository location of the Helm chart for the NextGen delegate is changing. (DEL-5576)

The repository is being deprecated. Updates to the chart will not be made to https://app.harness.io/storage/harness-download/delegate-helm-chart/ and will not be available from that location. To ensure retrieval of the most recent Helm chart, update your repository references to https://app.harness.io/storage/harness-download/harness-helm-charts/.
:::

### New features and enhancements

This release introduces the following new features and enhancements:

- A REST-based operation to fetch a delegate token value was introduced. The operation requires the Harness user role permission `Delegate: Create/Edit`. For information about other delegate token operations, see [Delegate Token Resource](https://apidocs.harness.io/tag/Delegate-Token-Resource). (DEL-5634)

- The delegate installation UI was changed to include the `helm repo update harness` command as an option on the **Apply YAML and verify connection** page. Use this option to obtain the latest version information on the charts in the Harness Helm repository. For more information about the `update` command, see [Helm Repo Update](https://v3-1-0.helm.sh/docs/helm/helm_repo_update/) in the Helm Docs. (DEL-5540)

### Fixed issues

This release includes the following fixes:

- Added error checking to ensure that delegates immediately reject tasks that are not supported. (DEL-5602)



## January 17, 2023, version 78214
### Delegate version 78101

Harness NextGen release 78214 includes no changed features or fixes for Harness Delegate.
