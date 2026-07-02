The Splunk Enterprise probe allows you to run search queries against a Splunk Enterprise instance and compare the results against specified criteria. This probe connects directly to the Splunk Enterprise REST API to execute searches and retrieve field values for validation.

## When to use

- Validate log-based metrics or search results from Splunk Enterprise during fault injection
- Use Splunk search queries as steady-state indicators for chaos experiments
- Monitor application logs, events, or computed fields in Splunk Enterprise while running chaos on the underlying infrastructure

## Prerequisites

* An active Splunk Enterprise instance
* Access to the Splunk Enterprise REST API from the Kubernetes execution plane
* A Splunk Enterprise authentication token or credentials with search permissions

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **APM Probe**, provide a name, and select **Splunk Enterprise** under APM Type

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

4. Under **Probe Properties**, configure:

   | Field | Description |
   |-------|-------------|
   | **Search Query** | Splunk SPL query to retrieve data from your Splunk Enterprise instance. <br /> Example: `index=main sourcetype=access_combined \| stats avg(response_time) as avg_response_time`. See [Splunk Search Reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/WhatsInThisManual) |
   | **Field to Fetch** | Field name from the search results to extract for comparison (e.g., `_raw`, `avg_response_time`, `count`) |
   | **Lookback Window (in minutes)** | Time range from the specified number of minutes ago to now, over which the search query is executed |
   | **Insecure Skip Verify** (optional) | Toggle to skip TLS certificate verification. Useful for development environments with self-signed certificates |

   Under **Splunk Enterprise Data Comparison**, provide:

   | Field | Description |
   |-------|-------------|
   | **Type** | Data type for comparison: `Float` or `Int` |
   | **Comparison Criteria** | Comparison operator: `>=`, `<=`, `==`, `!=`, `>`, `<`, `oneOf`, `between` |
   | **Value** | The expected value to compare against the fetched field result |

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
