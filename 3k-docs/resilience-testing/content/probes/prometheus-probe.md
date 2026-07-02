Prometheus probe allows you to run Prometheus queries and match the resulting output against specific conditions. The probe runs the query on a Prometheus server and checks whether the output satisfies the specified criteria.

## When to use

- Track response latency or error rates via PromQL while injecting faults (e.g., verify p99 latency stays below a threshold during pod-delete)
- Validate custom application metrics exposed to Prometheus as steady-state indicators
- Define metrics-based SLOs declaratively and use them as experiment pass/fail criteria

## Prerequisites

* A running Prometheus server
* Access to the Prometheus API endpoint from the Kubernetes execution plane
* Proper configuration of your application to expose metrics to Prometheus

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **APM Probe**, provide a name, and select **Prometheus** under APM Type

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

4. Under **Prometheus Connector**, select an existing connector or click **+ New Connector** to create one. Provide the Prometheus server URL, configure the delegate, verify the connection, and click **Finish**.

5. Under **Probe Properties**, configure:

   | Field | Description |
   |-------|-------------|
   | **Query** | PromQL query to retrieve the desired metrics. All double quotes must be escaped. <br /> Example: `avg_over_time(probe_duration_seconds{job=\"prometheus-blackbox-exporter\"}[60s:1s])*1000`. See [PromQL documentation](https://prometheus.io/docs/prometheus/latest/querying/basics/) |
   | **TLS Config** (optional) | TLS certificate validation for the Prometheus server. See [Prometheus TLS configuration](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#tls_config) |
   | **CA File** (optional) | File path of the CA certificates for server TLS verification |
   | **Cert File** (optional) | File path of the client certificates for TLS verification |
   | **Key File** (optional) | File path of the client key for TLS verification |
   | **Insecure Skip Verify** (optional) | Toggle to skip TLS certificate checks |

   Under **Prometheus Data Comparison**, provide:

   | Field | Description |
   |-------|-------------|
   | **Type** | Data type for comparison: `Float` or `Int` |
   | **Comparison Criteria** | Comparison operator: `>=`, `<=`, `==`, `!=`, `>`, `<`, `oneOf`, `between` |
   | **Value** | The expected value to compare against the query result |

6. Provide the **Run Properties**:

   | Field | Description |
   |-------|-------------|
   | **Timeout** | Maximum time for probe execution (e.g., `10s`) |
   | **Interval** | Time between successive executions (e.g., `2s`) |
   | **Attempt** | Number of retry attempts (e.g., `1`) |
   | **Polling Interval** | Time between retries (e.g., `30s`) |
   | **Initial Delay** | Delay before first execution (e.g., `5s`) |
   | **Verbosity** | Log detail level |
   | **Stop On Failure** (optional) | Stop the experiment if the probe fails |

7. Click **Create Probe**
