---
title: Kubernetes Probe
sidebar_position: 4
description: Configure Kubernetes probes to verify resource state during chaos experiments
---

K8s Probe verifies the desired state of Kubernetes resources by allowing you to define the resource GVR (group-version-resource) with appropriate filters (field selectors or label selectors). The probe supports three operations:

- **present**: Checks that matching Kubernetes resources exist
- **absent**: Checks that matching Kubernetes resources do not exist
- **delete**: Deletes matching Kubernetes resources

## When to use

- Verify that pods remain in `Running` state during a fault (use `present` with field selector `status.phase=Running`)
- Confirm that a Kubernetes resource (e.g., PVC, ConfigMap) is cleaned up after a fault (use `absent`)
- Delete specific resources as part of experiment teardown (use `delete`)
- Validate that custom resources or operator-managed resources maintain their expected state under failure conditions

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **Kubernetes Probe** and provide a name, and optionally a description and tags

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

4. Under **Probe Properties**, configure:

   | Field | Description |
   |-------|-------------|
   | **Kubernetes Resource Group** | The API group of the resource (leave empty for core resources like pods, services) |
   | **Version** | The API version (e.g., `v1`, `v1alpha1`) |
   | **Resource** | Kind of resource (e.g., `pods`, `deployments`, `persistentvolumeclaims`) |
   | **Resource Names** (optional) | Comma-separated resource names to target |
   | **Namespace** | The namespace to target (e.g., `default`) |
   | **Field Selector** (optional) | Filter by field values (e.g., `status.phase=Running`) |
   | **Label Selector** (optional) | Filter by labels (e.g., `app=nginx`) |
   | **Operation** | The operation type: `present`, `absent`, or `delete` |

5. Provide the **Run Properties**:

   | Field | Description |
   |-------|-------------|
   | **Timeout** | Maximum time for probe execution (e.g., `10s`) |
   | **Interval** | Time between successive executions (e.g., `2s`) |
   | **Attempt** | Number of retry attempts (e.g., `1`) |
   | **Polling Interval** | Time between retries (e.g., `30s`) |
   | **Initial Delay** | Delay before first execution (e.g., `5s`) |
   | **Verbosity** | Log detail level |
   | **Stop On Failure** (optional) | Stop the experiment if the probe fails |

6. Click **Create Probe**
