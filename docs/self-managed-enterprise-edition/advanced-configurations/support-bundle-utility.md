---
title: Support bundle utility
description: This topic describes the support bundle utility for Harness Self-Managed Enterprise Edition.
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Self-Managed Enterprise Edition offers a useful support bundle utility feature. This feature allows you to gather data from various services on your system. The tool records logs from all pods running in a Kubernetes cluster, relevant ConfigMaps (excluding secrets), HAR files for HTTP traffic, and any application-specific data dumps, if required. All the collected data is compiled into a downloadable bundle that you can use for troubleshooting and customer support purposes.

## Command for log recording

You can set the start and end time for a process you want to keep track of, but please note that the log collection window must not exceed 24 hours. Once you start recording, the tool will automatically gather logs and relevant data from pods and ConfigMaps. Additionally, it can also collect past logs from the service. Furthermore, you can specify the particular service from which you want to collect the data.

## Pod logs collection

The support bundle utility collects relevant log files from all Kubernetes pods running within the cluster, including both standard output and error logs. Timestamp data is included for each log entry.

## ConfigMap logs collection

The support bundle utility identifies ConfigMaps that contain log files or directories and includes them in the support bundle. Secrets and sensitive information are excluded.

## Deployment data and manifests

The Support Bundle Utility collects all the deployment, services, ingress, and virtual services manifests, as well as the Helm values configuration.

## HAR file collection (optional)

The process of bundling logs includes collecting relevant HAR files from the system or components responsible for capturing HTTP traffic during the specified period.

## Bundle packaging

All the logs, ConfigMaps, HAR files, and any other necessary files are combined into a bundle that can be easily downloaded. The bundle is compressed using a format that is easily shareable and extractable. To indicate the recording period, appropriate metadata and timestamps is included in the bundle by following specific naming conventions, such as harness_smp_timestamp.tgz. Once the bundle is created, FTP credentials will be generated for the user to upload it to Google Cloud.

## Configure log outputs

Allow log level configurable through the charts - platform + ci services

## Security

The support bundle utility adheres to security best practices to protect sensitive or confidential information.

User secrets and sensitive information must not be collected by the service.

Special steps must be taken to ensure any sensitive or confidential data is present in the collected samples (eg: service logs printing out secrets, etc) is redacted.

The support bundle is encrypted or secured during transit and at rest.

## Performance

The support bundle utility is optimized to minimize any impact on system performance. Harness has efficient log collection mechanisms in place to prevent any excessive resource usage during the recording process.

## Scalability

The support bundle utility scales with the number of pods and ConfigMaps in the system. This process handles large volumes of logs efficiently, with minimal compromise on performance and resource utilization.

Dependencies and Assumptions

The support bundle utility would require access and permissions to collect logs from pods, ConfigMaps, and HAR files.

Integration with the relevant components of the system would be necessary.

Compatibility with the underlying infrastructure and systems is ensured for effective log collection.

The interface is accessible through a command-line interface for users to initiate the log bundling process.

It accepts user inputs, validate them, and trigger the log bundling process.

## Support bundle generator

The support bundle generation will be responsible for collecting the necessary diagnostic info when prompted by the user.

It will interact with different system components to gather logs, ConfigMaps (excluding secrets), and override files.

The generator is designed to handle concurrent requests from multiple users and ensure proper resource utilization.

## Log collection

The log collection module will interact with the underlying infrastructure to gather logs from all Harness pods in the Kubernetes cluster.

It leverages Kubernetes APIs to access pod logs and utilize standard logging mechanisms to capture logs from pods.

Relevant log files or streams are identified, and the logs are aggregated and stored for further processing.

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

Incomplete logs due to truncation

Limited capability to retrieve logs for specific durations

Lack of flexibility and completeness in the current log collection process

No control over log file sizes

Improved Logging Implementation

In addition to the console output of logs, storing log output to files on the container is advised. This strategic shift enhances the overall flexibility and completeness of log collection while ensuring a frictionless experience. The integration of this solution facilitates effortless log retrieval through the support bundle tool, contributing to a more efficient and effective support process.

## Logging configurations

### Log file path

Configure logging within your module codebase to direct logs to the designated file

`/opt/harness/logs/pod.log`

### Log file archives

Implement log file archiving to manage log files efficiently.

Use the following configurations:

- Maximum individual log file size: 50 MB

- The maximum retention period for logs: 10 days

- Maximum total size of all log files combined: 1 GB

- Format for archived log filename: `pod.%d{yyyy-MM-dd}.%i.log`

Troubleshoot.sh by Replicated will be used for collecting support bundles.

## Installation

### Prerequisites

The following prerequisites are needed.

- kubectl (optional when using the binary)

- Access to cluster

### Installation options

You can install the support bundle utility using Krew or by downloading the binary.

To install the plugin using Krew, run the following.

```
kubectl krew install support-bundle
```

To download the binary, do the following:

1. Download the applicable `collect_*.tar.gz` or `collect_*.zip` file for your OS from [Replicated's GitHub](https://github.com/replicatedhq/troubleshoot/releases).

2. Run the following to unpack the archive, replacing `ARCHIVE_NAME` with the name of your `collect_*.tar.gz` or `collect_*.zip` file.

   ```
   tar -xzf <ARCHIVE_NAME>
   ```

## Support bundle manifest

To collect data, we need to create a CRD manifest and provide the data we need to collect.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
```

Here are some examples of collectors

### Log collection

There are two ways to collect logs

For services that have file logging enabled, we exec into the pod and fetch the log files. Using this script we can provide how many log files we want to copy over.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: supportbundle
spec:
  collectors:
    - exec:
        name: logs/<name-of-service>
        selector:
          - app.kubernetes.io/name=<name-of-service>
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

For a service that doesn’t have file logging, we can collect Kubernetes logs. The drawback is that only 10MB of logs are available.

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: supportbundle
spec:
  collectors:
    - logs:
        selector:
          - app.kubernetes.io/name=<name-of-service>
```

### Helm release values collection

To collect Helm release data and values. For more information, go to [Helm](https://troubleshoot.sh/docs/collect/helm/) in the Troubleshoot documentation.

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

### ConfigMaps collection

To collect ConfigMap data. For more, refer here

```yaml
apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle
metadata:
  name: supportbundle
spec:
  collectors:
    - configMap:
        selector:
          - <your-app-selector-label>
```

:::info note
The tool by default redacts any password or secrets with common regex patterns. To redact custom patterns, refer to Section 4.5
:::

#### Example Manifest

Here is an example manifest that collects Helm values for the release and logs, ConfigMap data for the `ng-manager` service.

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
        namespace: akashs
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

For more example manifests, refer here: link-to-be-updated

Supported Collectors
Many more types of collectors are supported by the tool.

List of collectors: All Collectors 

Redacting Data
Redactors are used to define logic for redacting sensitive data from the support bundle. We can define custom regex patterns or values to redact them.

Collecting Support Bundle
Based on the way you installed the tool

If you have installed using the Krew package manager

```
kubectl support-bundle /path/to/support-bundle.yaml
```

If you downloaded the binary

`./collect /path/to/support-bundle.yaml`

This will generate an archived file named support-bundle-*, unzip that archive and that will contain the collected data

Helm release data will be inside the helm folder

Cluster resources data will be inside the cluster-resource folder, which contains the deployment, sts, pod, etc. data.

Logs will be inside the logs folder (assuming you used the example manifest), or it will be inside the folder based on the name of the collector in the manifest.

The utility detects errors or crashes in the system and automatically creates a support bundle for sharing.

A support bundle tool for Kubernetes that can collect a variety of data defined using a yaml manifest

Can also generate dynamic data like running a pod and collecting the data produced by that pod. Good for when we want to run some debug tests.

Has support for a variety of collector specs: here

Can also analyze data as per requirements: here

Automatically redacts any sensitive data and can also provide custom logic for redaction: here

Support Tools script

Minimal shell script to collect Kubernetesx data (specifically logs)

Can be used as a reference when developing

Rancher Support bundle kit

Kit to extract data from rancher deployments

Has a mechanism to replicate the customer environment using the extracted data by passing the data to the simulator.
