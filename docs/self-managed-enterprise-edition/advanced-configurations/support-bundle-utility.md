---
title: Support bundle utility plugin
description: This topic describes the support bundle utility plugin for Harness Self-Managed Enterprise Edition.
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Self-Managed Enterprise Edition provides a support bundle utility plugin option that enables you to troubleshoot system issues more efficiently. This feature allows you to collect data from various services on your system. The tool records logs from all pods running in a Kubernetes cluster, relevant ConfigMaps (excluding secrets), HAR files for HTTP traffic, and any application-specific data dumps, if needed. All the gathered data is then compiled into a downloadable bundle that you can use for troubleshooting and customer support purposes.

## Log recording

To keep track of a process, you have the option to set its start and end time. However, keep in mind that the log collection window can't exceed 24 hours. Once you start recording, the tool automatically gathers logs and relevant data from pods and ConfigMaps. It can also collect past logs from the service. Moreover, you can choose the specific service from which you want to collect data.

## Log collection

The support bundle utility retrieves log files from Kubernetes pods, including standard output and error logs, along with timestamp data for each entry.

### ConfigMap log collection

The support bundle utility identifies ConfigMaps that contain log files or directories and includes them in the support bundle. Secrets and sensitive information are excluded.

### Deployment data and manifests

The support bundle utility collects all the deployment, services, ingress, and virtual services manifests, as well as the Helm values configuration.

### HAR file collection (optional)

The process of bundling logs includes collecting relevant HAR files from the system or components responsible for capturing HTTP traffic during the specified period.

## Bundle packaging

All necessary files such as logs, ConfigMaps, and HAR files are bundled together in a compressed format that you can extract and share. The bundle includes appropriate metadata and timestamps following specific naming conventions such as `harness_smp_timestamp.tgz` to indicate the recording period. Upon bundle creation, FTP credentials are generated for you to upload the bundle to Google Cloud.

## Security

The support bundle utility follows security best practices to safeguard sensitive and confidential information. No secrets or sensitive data are collected. The support bundle is encrypted during transit and at rest.

## Performance

The support bundle utility is optimized to minimize any impact on system performance. Harness has efficient log collection mechanisms in place to prevent any excessive resource usage during the recording process.

## Scalability

The support bundle utility scales with the number of pods and ConfigMaps in the system. This process handles large volumes of logs efficiently, with minimal compromise on performance and resource utilization.

## Dependencies

The support bundle utility requires access and permissions to collect logs from pods, ConfigMaps, and HAR files. Compatibility with the underlying infrastructure and systems is ensured for effective log collection.

The interface is accessible through a command-line interface for users to initiate the log bundling process. The CLI accepts user inputs, validates them, and triggers the log bundling process.

## Log collection

The module responsible for collecting logs will communicate with the underlying infrastructure to gather logs from each Harness pod within the Kubernetes cluster. This process makes use of Kubernetes APIs to access pod logs and standard logging mechanisms to capture logs from the pods. The module identifies relevant log files or streams, and aggregates and stores the logs for further processing.

## ConfigMap and override files collection

The ConfigMap collector identifies relevant ConfigMaps containing log files or directories based on predefined criteria and exclude fields containing secrets or sensitive information.

The override file collector component scans the application's directory or defined locations to identify relevant override files.

These override files could be identified based on predefined file extensions or naming conventions.

## Packaging

The support bundle packaging component aggregates the collected logs, ConfigMaps, and override files.

It compresses the bundle into a downloadable format with a standard naming convention for users to access and share with the support team.

Metadata and timestamps are included to indicate the recording period and facilitate troubleshooting analysis.

Encryption and key generation for the support bundle package, so that only the person the customer provides the key to has access to the package.

## Log storage

Harness recommends storing your log output to files within the container. This method provides greater flexibility and completeness of log collection, while ensuring a seamless experience. It seamlessly integrates with the support bundle tool, making log retrieval effortless and enhancing the overall support process. This helps to improve the efficiency and effectiveness of the support process.

## Log file archives

The support bundle utility includes archiving to enable you to manage your log files efficiently.

## Configure support bundle logs

### Log file path

Ensure that logs are directed to `/opt/harness/logs/pod.log` by configuring logging in the module codebase.

### Default log file configuration

Harness has set the following default configuration:

- Maximum individual log file size: 50 MB

- Maximum log retention period: 10 days

- Maximum total size of all log files combined: 1 GB

- Format for archived log filename: `pod.%d{yyyy-MM-dd}.%i.log`

## Installation

### Prerequisites

The following prerequisites are needed.

- Git

- Access to the cluster

- kubectl (optional when using the binary)

- Krew (not required when using the binary)

### Installation options

You can install the support bundle utility using Krew or by downloading the binary. For instructions to install Krew, go to [Installing](https://krew.sigs.k8s.io/docs/user-guide/setup/install/) in the Krew documentation.

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

:::info
Services without file logging have a maximum of 10MB logs available.

:::

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

#### Example manifest

The following example manifest collects Helm values for releases and logs ConfigMap data for the `ng-manager` service.

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

The process of generating the support bundle involves collecting diagnostic information as required by the user. This process involves interacting with various system components to gather logs, ConfigMaps (excluding secrets), and override files. The support bundle generator is optimized to handle concurrent requests from multiple users and ensure efficient use of resources.

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
