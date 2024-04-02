---
title: Support bundle utility plugin
description: This topic describes the support bundle utility plugin for Harness Self-Managed Enterprise Edition.
sidebar_position: 28
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Self-Managed Enterprise Edition provides a support bundle utility plugin option that enables you to troubleshoot system issues more efficiently. This feature allows you to collect data from various services on your system. The tool records logs from all pods running in a Kubernetes cluster and relevant ConfigMaps (excluding secrets). All the gathered data is then compiled into a downloadable bundle that you can use for troubleshooting and customer support purposes.

:::info
This utility does not collect any sensitive information, as Harness is committed to safeguarding your data privacy.
:::

## Installation

### Prerequisites

The following prerequisites are needed.

- Git (optional when using the binary)

- Access to the cluster

- kubectl (optional when using the binary)

- Krew (not required when using the binary)

### Installation options

You can install the support bundle utility using the Krew package manager or by downloading the binary. For instructions to install Krew, go to [Installing](https://krew.sigs.k8s.io/docs/user-guide/setup/install/) in the Krew documentation.

#### Install using Krew

To install the plugin using Krew, run the following command.

```
kubectl krew install support-bundle
```

#### Install by downloading the binary

To download the binary, do the following:

1. Download the applicable `collect_*.tar.gz` or `collect_*.zip` file for your OS from [Replicated's GitHub](https://github.com/replicatedhq/troubleshoot/releases).

2. Run the following to unpack the archive, replacing `ARCHIVE_NAME` with the name of your `collect_*.tar.gz` or `collect_*.zip` file.

   ```
   tar -xzf <ARCHIVE_NAME>
   ```

## Support bundle manifest

To collect data, you must create a Custom Resource Definition (CRD) manifest and configure the data you want to collect.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
```

### Collect logs

There are two ways Harness collects logs:

- For services with file logging enabled, Harness fetches the log files. You can use the following script to configure the number of log files.

   ```yaml
   apiVersion: troubleshoot.sh/v1beta2
   kind: SupportBundle
   metadata:
     name: supportbundle
   spec:
     collectors:
       - exec:
           name: logs/<SERVICE_NAME>
           selector:
             - app.kubernetes.io/name=<SERVICE_NAME>
           namespace: <your-namespace>
           command:
             - "/bin/bash"
             - "-c"
             - |
               logs_path="/opt/harness/logs"
               num_files=2 # <--- define number of files required

               for file in $(ls $logs_path/pod*.log | sort -n -k1,1 | tail -n $num_files); do
                   echo "==> $file &lt;=="
                   cat "$file"
                done
            timeout: 100s
   ```

- For services without file logging, Harness collects Kubernetes logs.

   ```yaml
    apiVersion: troubleshoot.sh/v1beta2
    kind: SupportBundle
    metadata:
      name: supportbundle
    spec:
      collectors:
       - logs:
           selector:
             - app.kubernetes.io/name=<SERVICE_NAME>
   ```

### Collect Helm release value data

The support bundle utility plugin allows you to collect Helm release data and values. For more information, go to [Helm](https://troubleshoot.sh/docs/collect/helm/) in the Troubleshoot.sh documentation.

To collect Helm release values, use the following configuration.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: supportbundle
spec:
  collectors:
    helm:
      includeValues: true # <--- if this is set to false, helm values will not be collected
      namespace: <namespace> # <-- Optional, if not provided it will search in all namespaces
      release-name: <name of the release> # <-- Optional. Note: If this is provided, namespace is mandatory
```

### Collect ConfigMap data

To collect ConfigMap data, use the following configuration.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: supportbundle
spec:
  collectors:
    - configMap:
        selector:
          - <YOUR_APP_SELECTOR_LABEL>
```

:::info note
The tool by default redacts any password or secrets with common regex patterns.

:::

### Download the example manifest

An example support bundle manifest is available in the [Harness Helm chart repo](https://github.com/harness/helm-charts/tree/main/support-bundle-manifests#readme).

After you have [installed the utility](#installation-options), download and prepare your support bundle manifest.

#### Pre-requisite

`yq` v4 or above. For installation instructions, go to [Install](https://github.com/mikefarah/yq?tab=readme-ov-file#install).

To download the support bundle manifest and prepare it for use, do the following:

- Run the following command applicable for your OS.

   **Linux**

   ```bash
   bash <(curl -sSL https://raw.githubusercontent.com/harness/helm-charts/main/support-bundle-manifests/scripts/linux.sh) <YOUR_NAMESPACE> <YOUR_RELEASE_NAME>
   ```

   **MacOS**

   ```bash
   bash <(curl -sSL https://raw.githubusercontent.com/harness/helm-charts/main/support-bundle-manifests/scripts/macos.sh) <YOUR_NAMESPACE> <YOUR_RELEASE_NAME>
   ```
<!--
   **Windows**

   ```bash
   bash <(curl -sSL https://raw.githubusercontent.com/harness/helm-charts/main/support-bundle-manifests/scripts/windows.ps1) <YOUR_NAMESPACE> <YOUR_RELEASE_NAME>
   ```
  --->

   This will create a `support-bundle.yaml` file in the current directory. You can use this file to collect the support bundle information from all of your running services.

### Download a module-specific manifest

- To download a module-specific manifest, you can use the following command.

   ```bash
   bash <(curl -sSL https://raw.githubusercontent.com/harness/helm-charts/main/support-bundle-manifests/linux.sh) <YOUR_NAMESPACE> <YOUR_RELEASE_NAME> <MODULE_NAME>
   ```

   **Time Since**

   You can provide time since for the logs to be collected.

   ```bash
   bash <(curl -sSL https://raw.githubusercontent.com/harness/helm-charts/main/support-bundle-manifests/scripts/linux.sh) <YOUR_NAMESPACE> <YOUR_RELEASE_NAME> --last 1 hours
   ```

   Supported values are:

   - x minutes
   - x hours
   - x days

   **Time Range**

   You can provide a time range for the logs to be collected. Provide the start and end date in YYYY-MM-DD format.

   ```bash
   bash <(curl -sSL https://raw.githubusercontent.com/harness/helm-charts/main/support-bundle-manifests/scripts/linux.sh) <YOUR_NAMESPACE> <YOUR_RELEASE_NAME> --between 2021-01-01 2021-01-02
   ```

   **Number of Files**

   You can provide the number of files to be collected for the logs. The default value is 2. This is exclusive to the `--last` and `--between` flags, if either is provided, this will not be used.

   ```bash
   bash <(curl -sSL https://raw.githubusercontent.com/harness/helm-charts/main/support-bundle-manifests/scripts/linux.sh) <YOUR_NAMESPACE> <YOUR_RELEASE_NAME> --num-files 10
   ```

   **File Path**

   If you are use a different file path for your logs, you can provide the path using the following command. Adding `*.log` or any extension you have provided for the file is important. If you have provided the file path as `/logs/service.txt`, then provide the path in the flag as `/logs/service*.txt`.

   ```bash
   bash <(curl -sSL https://raw.githubusercontent.com/harness/helm-charts/main/support-bundle-manifests/scripts/linux.sh) <YOUR_NAMESPACE> <YOUR_RELEASE_NAME> --filepath /path/to/logs*.log
   ```

#### Example manifest

The following example manifest collects Helm values for releases, logs, and ConfigMap data for the `ng-manager` service.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: supportbundle
spec:
  collectors:
    - clusterResources:
        exclude: true
    - exec:
        name: logs/platform/ng-manager
        selector:
          - app.kubernetes.io/name=ng-manager
        namespace: YOUR_NAMESPACE
        command:
          - "/bin/bash"
          - "-c"
          - |
            logs_path="/opt/harness/logs"
            num_files=2

            for file in $(ls $logs_path/pod*.log | sort -n -k1,1 | tail -n $num_files); do
                echo "==> $file &lt;=="
                cat "$file"
            done
        timeout: 100s
```

## Generate the support bundle

The process of generating the support bundle involves collecting diagnostic information as required by the user. This process involves interacting with various system components to gather logs, ConfigMaps (excluding secrets), and override files. The support bundle generator is optimized to use minimum resources to collect all the required data without having an effect on running services.

### Methods to generate the bundle

The command to generate the support bundle varies based on the installation type.

- If you have installed the tool using Krew package manager, then run the following command to generate the support bundle.

   ```
   kubectl support-bundle /path/to/support-bundle.yaml
   ```

- If you have installed the tool by downloading the binary, then run the following command to generate the support bundle.

   ```
   ./collect /path/to/support-bundle.yaml
   ```

This command will generate a compressed file named `support-bundle-*.tar.gz`. Extract the file to access collected data.

### Location of collected data

The data collected using the provided example manifest will be stored in the directories listed below.

- Helm release data is included the `helm` folder.

- Cluster resources data is inside the `cluster-resource` folder. This includes the deployment, sts, and pod data.

- Logs are inside the `logs` folder.

## Send logs to Harness

To send your log bundle files to Harness, do the following:

1. Go to [Harness secure file drop](https://harness.sendsafely.com/d/support).
2. Enter your email address, and then select **Submit**.
3. Complete the MFA.
4. Drag your file(s) or click to add the file manually for upload.
5. Select **Submit**.


## Use in an air gap environment

To use the support bundle utility in an air gap environment, do the following:

1. Download the tool binary.
2. Download the manifest.
3. Transfer the manifest to the jumpbox VM if the VM doesn't have internet access. If the VM has internet access, you can run the above commands directly on the VM.
4. Follow the remaining steps in [Generate the bundle](#generate-the-support-bundle).
