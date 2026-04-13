---
title: HTTP Probe
sidebar_position: 2
description: Configure HTTP probes to validate service endpoints during chaos experiments
---

HTTP probe allows you to specify a URL that the experiment uses to determine the health or service availability (or other custom conditions) as part of the entry or exit criteria. The response code or body received is matched against expected values. It supports both HTTP GET and POST methods.

## When to use

- Validate that a service endpoint returns the expected status code (e.g., `200 OK`) during or after fault injection
- Confirm API responses contain expected data before, during, or after chaos
- Check health endpoints to verify service availability across fault boundaries
- Validate authentication-protected or TLS-secured endpoints as part of steady-state checks

## Steps to configure

1. Navigate to **Project Settings** > **Chaos Probes** and click **+ New Probe**

2. Select **HTTP Probe** and provide a name, and optionally a description and tags

3. Under **Variables**, define any reusable values you want to reference in probe properties or run properties. For each variable, specify the type (`String` or `Number`), name, value (fixed or runtime input), and whether it's required at runtime.

4. Under **Probe Properties**, configure:

   | Field | Description |
   |-------|-------------|
   | **URL** | The endpoint to probe (e.g., `http://localhost:8080`) |
   | **Authorization** (optional) | **Type**: `Basic` or `Bearer`. **Credentials**: Base64-encoded `username:password` for Basic, or a bearer token |
   | **TLS Config** (optional) | **CA File**, **Cert File**, **Key File**: file paths for TLS certificates. **Insecure Skip Verify**: toggle to skip validation |
   | **Method** | `GET` or `POST`. For POST, additionally provide the **Body** and **Content Type** |
   | **Header** (optional) | Custom HTTP headers as key-value pairs |

   Then select **Compare Response Code** or **Compare Response Body** and provide:

   | Field | Description |
   |-------|-------------|
   | **Criteria** | Comparison operator. For response code: `==`, `!=`, `>=`, `<=`, `>`, `<`, `oneOf`, `between`. For response body: `contains`, `equal`, `notEqual`, `matches`, `notMatches`, `oneOf` |
   | **Response Code** / **Response Body** | The expected value to compare against (e.g., `200`) |

   :::tip
   Response code and response body comparison are mutually exclusive. Choose one per probe.
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
