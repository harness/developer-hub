---
title: Use a local Helm Chart
description: This topic describes how to use a Helm chart installed on the Harness Delegate disk.
sidebar_position: 2
helpdocs_topic_id: j5xrnxl5yz
helpdocs_category_id: xot6u3ge9d
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness supports Helm charts stored in a remote Helm Chart Repository, such as ChartMuseum. In some cases, you might be deploying the same Helm chart and version to many clusters/namespaces in parallel. This can cause many identical downloads and performance issues.

To support this use case, Harness includes the option of using a local chart installed on the Harness Delegate local disk.

Harness will check for the existence of the Helm chart on the local Delegate disk, and then proceed to download from the remote repo only if the chart is not found.

Using a local Helm chart eliminates identical downloads and their related performance issues.

New to Helm deployments in Harness? See [Helm Chart Deployment Tutorial](../../onboard-cd/cd-quickstarts/helm-cd-quickstart.md) and [Native Helm Deployment Tutorial](../../onboard-cd/cd-quickstarts/native-helm-quickstart.md). For extensive details, see [Deploy Helm Charts](deploy-helm-charts.md).### Add installation script to the Delegate YAML

1. Install the chart on the Delegate host.  
The Delegate host must have Helm installed on it. Harness installs Helm with the Delegate automatically, so you don't need to do anything unless you have removed Helm for the Delegate host.  
For information on the Helm binaries installed by default, see [Supported platforms and technologies](../../../getting-started/supported-platforms-and-technologies.md).  
You can install the chart manually on the host, but it is easier to install it using the `INIT_SCRIPT` environment variable in the Delegate YAML.
2. Add the `INIT_SCRIPT` environment variable to the StatefulSet (Legacy Delegate) or Deployment (Immutable Delegate) object in the Delegate YAML, and add your Helm chart installation script.  
For information on Delegate types, go to [Install a Kubernetes Delegate](../../../platform/2_Delegates/advanced-installation/install-a-kubernetes-delegate.md) or [Install a Docker Delegate](../../../platform/2_Delegates/install-delegates/install-a-delegate.md).  
For information on using `INIT_SCRIPT`, go to [Build custom delegate images with third-party tools](/docs/platform/2_Delegates/customize-delegates/build-custom-delegate-images-with-third-party-tools.md).  
For information on installing Helm charts, go to Helm's documentation for [Helm Install](https://helm.sh/docs/helm/helm_install/).

### Add HELM\_LOCAL\_REPOSITORY environment variable to Delegate YAML

You need to provide the path to the local chart in the Delegate YAML using the `HELM_LOCAL_REPOSITORY` environment variable.

1. Add the `HELM_LOCAL_REPOSITORY` environment variable to the StatefulSet (Legacy Delegate) or Deployment (Immutable Delegate) object in the Delegate YAML.

The format should be:

`<basePath>/<repoName(encoded)>/<chartName>/<version>/chartName/`

Here's an example:


```
...  
        env:  
        - name: HELM_LOCAL_REPOSITORY  
          value: "./repository/helm/source/69434bd8-4b9d-37d8-a61f-63df65cd8206/nginx/0.1.0/nginx"  
...
```
If the chart version is not included, Harness will fetch the `latest` version.

The `HELM_LOCAL_REPOSITORY` environment variable is the same for both Delegate types.

For information on Delegate types, go to [Install a Kubernetes Delegate](../../../platform/2_Delegates/advanced-installation/install-a-kubernetes-delegate.md) or [Install a Docker Delegate](../../../platform/2_Delegates/install-delegates/install-a-delegate.md).

### Important notes

Please review the following important notes.

#### Use the same Delegate for fetching chart and deployment steps

Chart fetching and deployment is performed by the same step. For example, in a Kubernetes Rolling deployment strategy it is performed by the Rolling step.

You can select a Delegate for a step to use in the step's **Advanced** settings, **Delegate Selector**.

![](./static/use-a-local-helm-chart-00.png)

Ensure that the Delegate(s) selected here is the same Delegate(s) with the local Helm chart install and the Delegate YAML updated accordingly.

#### Version selection

If chart version is left blank, Harness fetches the latest chart the first deployment. Subsequently, Harness checks if the chart the is present in the location specified using this format:

`<basePath>/<repoName(encoded)>/<chartName>/latest/chartName/`

#### Delegate local disk cleanup

If you use a local Helm chart, Harness does not clean up the downloaded files post deployment. You will need to perform any Delegate local disk cleanup.

#### Logs

There is a slight difference in the logs for local and remote Helm charts. For example, if Harness doesn't find the chart in the local Delegate disk at the time of first deployment, the logs include `Did not find the chart and version in local repo`:

![](./static/use-a-local-helm-chart-01.png)

When Harness finds the charts it displays the message `Found the chart at local repo at path`.

#### Support in Harness FirstGen and NextGen

Local Helm charts are supported in both Harness FirstGen and NextGen. There is no difference in setup.

Harness FirstGen does not include Delegate Selectors on many Workflow steps. Typically, you use Infrastructure Definition's Cloud Provider Delegate Selectors to ensure that the Delegate used for deployment has the local Helm chart installed. For more information, go to [Select Delegates with Selectors](../../../first-gen/firstgen-platform/account/manage-delegates/select-delegates-for-specific-tasks-with-selectors.md).

