---
title: Support bundle utility
description: This topic describes the support bundle utility for Harness Self-Managed Enterprise Edition.
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Self-Managed Enterprise Edition includes the ability to create a support bundle. The support bundle utility is a tool that enables you to record and gather data from different services on your system. This includes logs from all pods running in a Kubernetes cluster, relevant config maps (excluding secrets), HAR files for HTTP traffic, and any application-specific dumps (if necessary). The data collected is then compiled into a downloadable bundle that you can use for troubleshooting and customer support purposes.

## Command for log recording

Users should be able to specify the start and end time for the process, with the maximum window for log collection being 24 hours. 

The commands for this should be easy to use and intuitive.

As users initiate the recording, log collection and bundling of relevant data from pods and config maps take place.

Utility should be able to collect past logs from the service.

Users should be able to define which service they want to collect the data from.

## Pod logs collection

The support bundle utility collects relevant log files from all Harness pods running within the Kubernetes cluster.

Log collection would support both standard output and standard error logs.

Every log entry should have timestamp data.

Each pod should have its log file.

## ConfigMap logs collection

The support bundle utility should collect relevant logs from config maps within the system.

Configmaps containing log files or directories should be identified and included in the support bundle whereas secrets or sensitive information should be excluded.

## Deployment data and manifests

The support bundle utility should collect deployment history.

Collect all the deployment, services, ingress, and virtualServices manifests.

It should also collect the helm values configuration.

## HAR file collection (optional)

The log bundling process should include the collection of HAR files relevant to the period of log recording. 

HAR files should be collected from the system or components responsible for capturing the HTTP traffic.

## Bundle packaging

The collected logs, config maps, HAR files and all other files should be packaged into a downloadable bundle.

The bundle should be compressed or archived in a format that is easily shareable and extractable.

It should include appropriate metadata and timestamps to indicate the recording period, by following certain naming conventions for the bundle. (Eg: harness_smp_timestamp.tgz)

Once a bundle is created, FTP credentials will be generated for the user to upload on Google Cloud.

## Configure log outputs

Allow log level configurable through the charts - platform + ci services

## Security

The support bundle utility should adhere to security best practices to protect sensitive or confidential information.

User secrets and sensitive information must not be collected by the service.

Special steps must be taken to ensure any sensitive or confidential data is present in the collected samples (eg: service logs printing out secrets, etc) is redacted.

The support bundle should be encrypted or secured during transit and at rest.

## Performance

The support bundle utility is optimized to minimize any impact on system performance. Harness has efficient log collection mechanisms in place to prevent any excessive resource usage during the recording process.

## Scalability

The support bundle utility scales with the number of pods and config maps in the system. This process handles large volumes of logs efficiently, with minimal compromise on performance and resource utilization.

Documentation and Resources

Comprehensive documentation and instructions should be provided to guide users on how to use the feature, and how to start and stop the log bundling process.

Instructions on properly sharing the collected logs to utilize the feature for troubleshooting and support should be included.

Dependencies and Assumptions

The support bundle utility would require access and permissions to collect logs from pods, config maps, and HAR files.

Integration with the relevant components of the system would be necessary.

Compatibility with the underlying infrastructure and systems should be ensured for effective log collection.

The interface should be accessible through the Harness UI or a command-line interface (initial cut) for users to initiate the log bundling process.

It should accept user inputs, validate them, and trigger the log bundling process.

## Support bundle generator

The support bundle generation will be responsible for collecting the necessary diagnostic info when prompted by the user.

It will interact with different system components to gather logs, config maps (excluding secrets), and override files.

The generator should be designed to handle concurrent requests from multiple users and ensure proper resource utilization(?).

## Log collection

The log collection module will interact with the underlying infrastructure to gather logs from all Harness pods in the Kubernetes cluster.

It should leverage Kubernetes APIs to access pod logs and utilize standard logging mechanisms to capture logs from pods.

Relevant log files or streams should be identified, and the logs should be aggregated and stored for further processing.

## Configmap and override files collection

The config map collector should identify relevant config maps containing log files or directories based on predefined criteria and exclude fields containing secrets or sensitive information.

The override file collector component scans the application's directory or defined locations to identify relevant override files.

These override files could be identified based on predefined file extensions or naming conventions.

## Packaging

The support bundle packaging component aggregates the collected logs, config maps, and override files.

It should compress or archive the bundle into a downloadable format with some standard naming convention for users to access and share with the support team.

Metadata and timestamps should be included to indicate the recording period and facilitate troubleshooting analysis.

Encryption and key generation for the support bundle package, so that only the person the customer provides the key to has access to the package.

## Log storage

Current Logging Implementation
Drawbacks

Incomplete logs due to truncation

Limited capability to retrieve logs for specific durations

Lack of flexibility and completeness in the current log collection process

No control over log file sizes

Improved Logging Implementation

In addition to the console output of logs, storing log output to files on the container is advised. This strategic shift enhances the overall flexibility and completeness of log collection while ensuring a frictionless experience. The integration of this solution facilitates effortless log retrieval through the support bundle tool, contributing to a more efficient and effective support process.

Logging Configurations

Log File Path

Configure logging within your module codebase to direct logs to the designated file

/opt/harness/logs/pod.log

Log File Archiving

Implement log file archiving to manage log files efficiently.

Use the following configurations:

Maximum individual log file size: 50 MB

The maximum retention period for logs: 10 days

Maximum total size of all log files combined: 1 GB

Format for archived log filename: pod.%d{yyyy-MM-dd}.%i.log

Usage

Tool

Troubleshoot.sh by replicated will be used for collecting support bundles.

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

Support Bundle Manifest

To collect data, we need to create a CRD manifest and provide the data we need to collect

apiVersion: troubleshoot.sh/v1beta2
kind: SupportBundle

Here are some examples of collectors

Log Collection
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

Configmaps Collection

To collect Config map data. For more, refer here

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

Example Manifest

Here is an example manifest that collects helm values for the release and logs, config map data for the ng-manager service

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

For more example manifests, refer here: <link-to-be-updated>

Supported Collectors
Many more types of collectors are supported by the tool.

List of collectors: All Collectors 

Redacting Data
Redactors are used to define logic for redacting sensitive data from the support bundle. We can define custom regex patterns or values to redact them.

Documentation: Redacting Data 

4.6 Collecting Support Bundle
Based on the way you installed the tool

If you have installed using the Krew package manager

kubectl support-bundle /path/to/support-bundle.yaml

If you downloaded the binary

./collect /path/to/support-bundle.yaml

This will generate an archived file named support-bundle-*, unzip that archive and that will contain the collected data

Helm release data will be inside the helm folder

Cluster resources data will be inside the cluster-resource folder, which contains the deployment, sts, pod, etc. data.

Logs will be inside the logs folder (assuming you used the example manifest), or it will be inside the folder based on the name of the collector in the manifest.


The utility should be able to detect errors or crashes in the system and automatically create a support bundle for sharing (if we use a continuously running approach).

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
