---
title: Splunk Enterprise probe
sidebar_position: 4
description: Features and specification of the Splunk Enterprise probe
---

The Splunk Enterprise probe allows you to run search queries against a Splunk Enterprise instance and compare the results against specified criteria. This probe connects directly to the Splunk Enterprise REST API to execute searches and retrieve field values for validation.

### Prerequisites
To use the Splunk Enterprise probe, you need:

* An active Splunk Enterprise instance
* Access to the Splunk Enterprise REST API from the Kubernetes execution plane
* A Splunk Enterprise authentication token or credentials with search permissions

### Steps to configure

1. In Resilience probe section under chaos module, click on **New Probe** button

2. Select the **APM Probe**

3. Provide the name of the probe and select **Splunk Enterprise** under APM Type

4. Under Probe Properties, provide the required parameters:
   * **Search Query**:
     * The Search Query input is a Splunk search query string used to retrieve data from your Splunk Enterprise instance. It follows the Splunk Search Processing Language (SPL) syntax
     * **Example query**: `index=main sourcetype=access_combined | stats avg(response_time) as avg_response_time`
     * For more details, refer to [Splunk Search Reference documentation](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/WhatsInThisManual)
   * **Field to Fetch**:
     * Specifies the field name from the search results to extract the value for comparison
     * **Example**: `_raw`, `avg_response_time`, `count`
   * **Lookback Window (in minutes)**:
     * The lookback window refers to the time range from a specified number of minutes ago up to the current moment, over which the search query is executed
   * **Insecure Skip Verify**:
     * Toggle this option to skip TLS certificate verification when connecting to the Splunk Enterprise instance. This is useful for development environments with self-signed certificates

5. Provide the comparison criteria under Splunk Enterprise Data Comparison:
   * **Type**: Select the data type for comparison (e.g., Float, Int)
   * **Comparison Criteria**: Select the comparison operator (e.g., `>=`, `<=`, `==`, `!=`, `>`, `<`)
   * **Value**: Enter the expected value to compare against the fetched field result

6. Provide the Run Properties:
   * **Timeout**: Set the timeout duration for the probe execution (e.g., 10s)
   * **Interval**: Set the interval between probe executions (e.g., 2s)
   * **Attempt**: Number of attempts for the probe (e.g., 1)
   * **Polling Interval**: Time between successive probe polls (e.g., 30s)
   * **Initial Delay**: Delay before the first probe execution (e.g., 5s)
   * **Verbosity**: Set the verbosity level for probe logs
   * **Stop On Failure** (Optional): Toggle to stop the experiment if the probe fails

7. Then click on **Create Probe**
