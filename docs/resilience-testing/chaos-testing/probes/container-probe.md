---
title: Container Probe
sidebar_position: 5
description: Configure Container probes to execute commands inside containers during chaos experiments
---

Container probe executes commands inside a new container and validates the output. Unlike the Command probe which runs inside the experiment pod (inline mode) or a simple source pod, the Container probe gives you full control over the container specification - image, volumes, security context, resource limits, and more.

:::info
Container probe is only supported on Kubernetes infrastructure driven by Harness Delegate (Kubernetes HD).
:::

## When to use

- Run validation commands that require a specific container image with pre-installed tools (e.g., database clients, custom SDKs)
- Execute checks that need mounted volumes, secrets, or ConfigMaps from the cluster
- Validate application state where the command needs specific security contexts, resource limits, or service account permissions
- Perform checks that must run with specific node affinity, tolerations, or network access

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **Container Probe** and provide a name, and optionally a description and tags

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

4. Under **Probe Properties**, configure:

   | Field | Description |
   |-------|-------------|
   | **Container Image** | The image to use (e.g., `bitnami/kubectl:latest`) |
   | **Command** | The command to execute (e.g., `/bin/sh`, `-c`) |
   | **Arguments** | The script or arguments to pass (e.g., `echo "Hello World"`) |
   | **Environment Variables** (optional) | Name-value pairs passed to the container |
   | **Namespace** | Target Kubernetes namespace (e.g., `default`) |
   | **Image Pull Policy** | `IfNotPresent`, `Always`, or `Never` |

   **Advanced Configuration** (optional):

   | Field | Description |
   |-------|-------------|
   | **Service Account Name** | Service account for the probe pod (e.g., `default`) |
   | **Image Pull Secrets** | Secrets for pulling private container images |
   | **Labels** | Key-value labels for the probe pod |
   | **Annotations** | Key-value annotations for the probe pod |
   | **Node Selector** | Key-value pairs to constrain pod scheduling |
   | **Tolerations** | Tolerations for node taints |
   | **Required/Preferred Node Affinity** | Node affinity rules for pod scheduling |
   | **Resource Limits** | **Limit Memory** and **Limit CPU** for the container |
   | **Resource Requests** | **Request Memory** and **Request CPU** for the container |

   **Volumes** (optional):

   | Field | Description |
   |-------|-------------|
   | **Name** | Volume name (e.g., `my-volume`) |
   | **Type** | Volume type (e.g., `EmptyDir`) |
   | **Medium** | Storage medium for EmptyDir |
   | **Size Limit** | Maximum size (e.g., `1Gi`) |

   **Volume Mounts** (optional):

   | Field | Description |
   |-------|-------------|
   | **Name** | Volume name to mount |
   | **Mount Path** | Path inside the container (e.g., `/mnt/data`) |
   | **Sub Path** / **Sub Path Expression** | Subpath within the volume |
   | **Mount Propagation** | Mount propagation mode |
   | **Read Only** | Whether the mount is read-only |

   **Security Configuration** (optional):

   | Field | Description |
   |-------|-------------|
   | **Host Network**, **HostPID**, **Host IPC** | Toggle access to host namespaces |
   | **Allow Privilege Escalation** | Allow container process to gain more privileges |
   | **Read Only Root Filesystem** | Mount root filesystem as read-only |
   | **Privileged** | Run container in privileged mode |
   | **Run As Non Root** | Require the container to run as a non-root user |
   | **Run as user** / **Run as group** | UID/GID for the container process (e.g., `1000`) |
   | **FS Group** | Filesystem group for volumes (e.g., `2000`) |

   **Data Comparison**:

   | Field | Description |
   |-------|-------------|
   | **Type** | Data type of the output: `String`, `Int`, or `Float` |
   | **Comparison Criteria** | Comparison operator: `matches`, `==`, `!=`, `>`, `<`, `>=`, `<=` |
   | **Value** | The expected value to compare against (e.g., `Hello World`) |

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
