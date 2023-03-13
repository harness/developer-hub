---
title: Delegate
tags: [NextGen, "Delegate"]
date: 2023-03-08T10:00
sidebar_position: 12
---


These release notes document changes to Harness Delegate in Harness NextGen. 

:::note
Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features and fixes that these release notes describe may not be immediately available in your cluster. To identify the cluster that hosts your account, go to the **Account Overview** page. 
:::

For FirstGen SaaS release notes, see [Harness SaaS Release Notes (FirstGen)](/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes). For Self-Managed Enterprise Edition, see [Self-Managed Enterprise Edition release notes](/release-notes/self-managed-enterprise-edition).

## March 8, 2023, Harness version 78619, Harness Delegate version 78500

Harness NextGen release 78619 includes the following changes for the Harness Delegate.

### What's new

- The delegate installation UI experience is now updated with a new installation method; the Terraform Helm Provider. In addition, it has been enhanced for existing methods; Helm Chart, Kubernetes Manifest and Docker. This new experience is more developer friendly, for example it enables cutting and pasting of relevant commands, and more automation friendly where the commands can be run in an automated manner using new values when necessary. Additionally, the following new features are available:
  - The **Terraform Helm Provider** method is based on the open source [Terraform Harness Delegate module](https://registry.terraform.io/modules/harness/harness-delegate/kubernetes/latest) and the open source [Harness Delegate Helm chart](https://github.com/harness/delegate-helm-chart). Auto upgrade is set to `OFF` with an option to enable it in the command.
  - The updated method for **Helm Chart** is also powered by the same open source [Harness Delegate Helm Chart](https://github.com/harness/delegate-helm-chart) as the Terraform Helm Provider above. The auto upgrade is set to OFF with an option to enable it in the command. You can also download the [default values.yaml](https://github.com/harness/delegate-helm-chart/blob/main/harness-delegate-ng/values.yaml) for the Helm option and edit that to set your own long-lived configuration values.
  - The updated flow for **Kubernetes Manifest** has two options for creating a manifest YAML file specific to your Harness account. 
    - **Basic** - Provides a “Download YAML” option where the downloaded YAML has all the configuration variables pre-populated with values specific to your Harness account. 
    - **Custom** - Create your own YAML from a [Kubernetes Manifest template](https://github.com/harness/delegate-kubernetes-manifest/blob/main/harness-delegate.yaml) by replacing the placeholders with the values provided in the method.
  Given the need to have a fully qualified YAML, the auto upgrade configuration is set to ON in both the above options. The result is that the delegate version installed will always remain in sync with the version available on the Harness Manager.
  - The **Docker** delegate installation method has now been enhanced to a simple copy and paste of the Docker run command, with the option to modify the pre-populated properties. The auto upgrade is set to OFF for this method with an option to enable it in the command. (DEL-6037)

- The secrets manager cache was moved from Redis to the Harness Manager's local pod. (DEL-5884)

 This move further enhances security because the secrets manager configuration no longer goes outside of the Harness Manager's pod.
 
### Early access

This release does not include any early access features.

### Fixed issues

The new delegate installation wizard is now available in all delegate installation worfklows. (DEL-5989)


## February 23, 2023, Harness version 78507, Harness Delegate version 78500

Harness NextGen release 78507 includes the following changes for the Harness Delegate.

:::note
The repository location of the Helm chart for the NextGen delegate is changing. (DEL-5576)

The repository at https://app.harness.io/storage/harness-download/delegate-helm-chart/ is being deprecated. The Helm chart will no longer be available from the repository at https://app.harness.io/storage/harness-download/delegate-helm-chart/. To ensure retrieval of the most recent Helm chart, update your repository references to https://app.harness.io/storage/harness-download/harness-helm-charts/.
:::

### What's new

This release introduces the following new features and enhancements:

You can dynamically select delegates by hostname during pipeline runs. To do so, select delegates by hostname from your delegate groups. (DEL-5052)

### Fixed issues

This release includes the following fixes:

- Fixed an issue that interfered with the delegate installation process. Delegate API requests did not include the context that was required; organization and project ID information was not being sent with requests. The required context is now included. (DEL-5951)

## February 15, 2023, Harness version 78421, Harness Delegate version 78306

Harness NextGen release 78421 includes the following changes for the Harness Delegate.

:::note
The repository location of the Helm chart for the NextGen delegate is changing. (DEL-5576)

The repository at https://app.harness.io/storage/harness-download/delegate-helm-chart/ is being deprecated. The Helm chart will no longer be available from the repository at https://app.harness.io/storage/harness-download/delegate-helm-chart/. To ensure retrieval of the most recent Helm chart, update your repository references to https://app.harness.io/storage/harness-download/harness-helm-charts/.
:::

### What's new

This release introduces the following new features and enhancements:

- Added the `helm repo update` command to the delegate installer. The command is included in the instructions that apply the delegate manifest. This change reduces the chance of retrieving the wrong file from the repository. (DEL-5540)

### Fixed issues

This release includes the following fixes:

- Resolved a problem that caused SCM log information to be displayed in the Watcher. The information was redirected to the delegate `slf4j` stream for display in the delegate logs. (DEL-5744)


## February 6, 2023, Harness version 78321, Harness Delegate version 78306

Harness NextGen release 78321 includes the following changes for the Harness Delegate.

:::note
The repository location of the Helm chart for the NextGen delegate is changing. (DEL-5576)

The repository is being deprecated. Updates to the chart will not be made to https://app.harness.io/storage/harness-download/delegate-helm-chart/ and will not be available from that location. To ensure retrieval of the most recent Helm chart, update your repository references to https://app.harness.io/storage/harness-download/harness-helm-charts/.
:::

### What's new

This release introduces the following new features and enhancements:

- A REST-based operation to fetch a delegate token value was introduced. The operation requires the Harness user role permission `Delegate: Create/Edit`. For information about other delegate token operations, see [Delegate Token Resource](https://apidocs.harness.io/tag/Delegate-Token-Resource). (DEL-5634)

- The delegate installation UI was changed to include the `helm repo update harness` command as an option on the **Apply YAML and verify connection** page. Use this option to obtain the latest version information on the charts in the Harness Helm repository. For more information about the `update` command, see [Helm Repo Update](https://v3-1-0.helm.sh/docs/helm/helm_repo_update/) in the Helm Docs. (DEL-5540)

### Fixed issues

This release includes the following fixes:

- Added error checking to ensure that delegates immediately reject tasks that are not supported. (DEL-5602)

### Security enhancements

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
  


## January 17, 2023, Harness version 78214, Harness Delegate version 78101

Harness NextGen release 78214 includes no changed features or fixes for the Harness Delegate.
