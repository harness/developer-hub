---
title: Command Probe
sidebar_position: 3
description: Configure Command probes to run shell commands and validate output during chaos experiments
---

Command probe allows you to run shell commands and match the output as part of the entry or exit criteria. Use it to implement custom validation logic that goes beyond what HTTP or K8S probes offer.

The probe supports two execution modes:
- **Inline mode** (default): The command runs inside the experiment pod. Best for simple shell commands.
- **Source mode**: The command runs in a separate pod with a custom image. Best when application-specific binaries are needed.

## When to use

- Query a database to verify data integrity during chaos (e.g., `mysql -e "SELECT count(*) FROM orders"`)
- Parse application logs or JSON output to confirm expected behavior
- Run custom health checks that require application-specific CLIs or binaries (use source mode)
- Validate file system state, environment variables, or process status on the target system

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **Command Probe** and provide a name, and optionally a description and tags

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

4. Under **Probe Properties**, configure:

   | Field | Description |
   |-------|-------------|
   | **Command** | The shell command to execute (e.g., `echo "Hello World"`) |

   Under **Data Comparison**, provide the expected output criteria:

   | Field | Description |
   |-------|-------------|
   | **Type** | Data type of the output: `String`, `Int`, or `Float` |
   | **Comparison Criteria** | For string: `contains`, `equal`, `notEqual`, `matches`, `notMatches`, `oneOf`. For int/float: `>=`, `<=`, `==`, `!=`, `>`, `<`, `oneOf`, `between` |
   | **Value** | The expected value to compare against (e.g., `Hello World`) |

   Optionally, enable **Source** mode to run the command in a separate pod. This is preferred when application-specific binaries are required.

   | Field | Description |
   |-------|-------------|
   | **Source** (optional) | Toggle to enable source mode |
   | **Environment Variables** (optional) | Name-value pairs passed to the source pod |

   :::info
   When source mode is enabled, environment variables are not supported directly. You can reference values from ConfigMaps and Secrets instead.
   :::

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

---

## Command Probe on Windows

The Windows command probe extends the standard command probe to support Windows Command Prompt (cmd) and PowerShell execution contexts.

### Prerequisites

- [Setup Windows chaos infrastructure](/docs/resilience-testing/chaos-testing/infrastructure/types/legacy-infra/windows)
- [Windows chaos faults](/docs/chaos-engineering/faults/chaos-faults/windows/)

### Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **Windows** as your target infrastructure type, then select **Command Probe**

3. Enter a name, and optionally a description and tags

4. Enter the **Command**, **Type**, **Comparison Criteria**, and the **Value**

5. Provide values for **Timeout**, **Interval**, **Attempt**, **Polling Interval**, and **Verbosity**. Click **Create Probe**

6. Your Windows command probe is now ready to be attached to chaos experiments
