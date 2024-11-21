---
title: Traceable step configuration
description: Scan application instances with Traceable.
sidebar_label: Traceable step configuration
sidebar_position: 401
---

<DocsTag  text="Orchestration" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/run-an-orchestrated-scan-in-sto"  />
<DocsTag  text="Extraction" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/extraction-scans" />
<DocsTag  text="Ingestion" backgroundColor= "#e3cbf9" textColor="#5c0bad" link="/docs/security-testing-orchestration/get-started/key-concepts/ingest-scan-results-into-an-sto-pipeline" />
<br/>
<br/>

The Traceable step in Harness STO enables API testing by connecting with your Traceable account. Depending on your requirements, you can choose from the following three STO scan modes for Traceable step, follow the appropriate documentation for each mode.

- [**Orchestration Mode**](#orchestration-mode-configuration): This mode allows you to initiate a scan within an existing Traceable suite. The scan results are then automatically saved in STO.

- [**Ingestion Mode**](#ingestion-mode-configuration): You can use Ingestion mode to read the scan results from a data file and feed them into STO. This also covers how to fetch the results from Traceable for Ingestion.

- [**Extraction Mode**](#extraction-mode-configuration): Use Extraction mode to retrieve the latest scan data of a specific Traceable suite and feed the results into STO.


:::info
- You can utilize custom STO scan images and pipelines to run scans as a non-root user. For more details, refer [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
- STO supports three different approaches for loading self-signed certificates. For more information, refer [Run STO scans with custom SSL certificates](/docs/security-testing-orchestration/use-sto/secure-sto-pipelines/ssl-setup-in-sto/#supported-workflows-for-adding-custom-ssl-certificates).


import StoMoreInfo from '/docs/security-testing-orchestration/sto-techref-category/shared/_more-information.md';

<StoMoreInfo />
:::

## Orchestration mode configuration
The Orchestration mode in the Traceable step allows you to initiate a scan within an existing Traceable suite. In this mode, you cannot create a new suite or define the API endpoints; it is currently limited to initiating the scan and having the scan results in STO. Here's how you can do it.

Search for and add the **Traceable** step to your pipeline. This step can be used in either the **Build** stage or the **Security** stage. In the step configuration, set the following fields:

1. **Scan Mode**: Set the **Scan Mode** to **Orchestration**.
2. **Target**: Under **[Target](#target)**, for **[Target and Variant Detection](#target-and-variant-detection)**, it's recommended to use the **[Auto](#auto)** option. Alternatively, you can manually define **Name** and **Variant** using the **Manual** option.
3. **Authentication**: Provide your Traceable **[Domain](#domain)** and pass your Traceable **[Access Token](#access-token)** as a Harness secret, for example: `<+secrets.getValue("traceable_api_token")>`.
4. **Scan Tool**: Enter your **[Suite ID](#suite-id)** and configure the **[Runner Selection](#runner-selection)** field.

<DocImage path={require('./static/traceable-orchestration.png')} width="40%" height="40%" title="Click to view full size image" />

These are the essential settings for performing an Orchestration scan using the Traceable step. For more features and configuration options, see the [Traceable Step Settings](#traceable-step-settings) section.

## Ingestion mode configuration
With the Ingestion mode in the Traceable step, you can read scan results from a data file and import them into STO. To do this, you need the scan results saved in a supported format. This section explains how to fetch and save the scan results in `JSON` format, then use Ingestion mode in the Traceable step to feed the data into STO.

If you already have the scan results in the supported format and just need to configure Ingestion mode, skip ahead to [Configure the Traceable Step for Ingestion](#configure-the-traceable-step-for-ingestion).

### Fetch and save scan results in JSON format
Search and add a **Run** step in your pipeline and add the following command in the step.

<details>

<summary>Command to fetch scan results and save in JSON format</summary>

```
#!/bin/sh

# Variables
API_URL="https://api.traceable.ai/graphql"  
API_TOKEN="YOUR_API_TOKEN" 
SCAN_ID="scan_id_test"  
OUTPUT_FILE="/harness/vulnerabilities.json"  # File to store the result

# GraphQL Query - Using HEREDOC for better readability
get_vulnerabilities_query=$(cat <<EOF
{
  "query": "query GetVulnerabilities {
    vulnerabilitiesV3(
      filter: {
        logicalFilter: {
          operator: AND,
          filters: [
            {
              relationalFilter: {
                key: SCAN_ID,
                operator: EQUALS,
                value:  \"${SCAN_ID}\"
              }
            }
          ]
        }
      }
    ) {
      results {
        name: selection(key: DISPLAY_NAME) {
          value
          type
        }
        description: selection(key: DESCRIPTION) {
          value
          type
        }
        category: selection(key: VULNERABILITY_SUB_CATEGORY) {
          value
          type
        }
        cvss_score: selection(key: CVSS_SCORE) {
          value
          type
        }
        severity: selection(key: SEVERITY) {
          value
          type
        }
        mitigation: selection(key: MITIGATION) {
          value
          type
        }
        impact: selection(key: IMPACT) {
          value
          type
        }
        references: selection(key: REFERENCES) {
          value
          type
        }
        cve: selection(key: CVE) {
          value
          type
        }
        cwe: selection(key: CWE) {
          value
          type
        }
        path: selection(key: ENTITY_NAME) {
          value
          type
        }
      }
      count
      total
    }
  }"
}
EOF
)

# Execute GraphQL query and save the response
response=$(curl -s -X POST "$API_URL" \
  -H "Authorization: $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$get_vulnerabilities_query")

# Check for valid response
if [ -z "$response" ]; then
  echo "No response from API"
  exit 1
fi

# Print the raw response for debugging
echo "Raw API response:"
echo "$response"



# Sanitize the response to escape control characters (if necessary)
sanitized_response=$(echo "$response" | tr -d '\r' | tr -d '\n' | tr -d '\t')

# Format the response
formatted_response=$(echo "$sanitized_response" | jq '.data.vulnerabilitiesV3.results | { issues: . }')

# Check if jq executed successfully
if [ $? -ne 0 ]; then
  echo "Error formatting the response with jq."
  exit 1
fi

# Check if issues are empty
if [ "$(echo "$formatted_response" | jq '.issues | length')" -eq 0 ]; then
  echo "No vulnerabilities found for SCAN_ID: $SCAN_ID"
else
  # Save to the output file
  echo "$formatted_response" > "$OUTPUT_FILE"
  echo "Vulnerabilities stored in $OUTPUT_FILE"
  
  # Print the content of the output file
  echo "Content of $OUTPUT_FILE:"
  cat "$OUTPUT_FILE"
fi

```
</details>

- In the above command, make sure to replace the variables **API_TOKEN** and **SCAN_ID** with your own values. You may also use Harness Secrets for enhanced security.
- If you want to save the output file to a different path than `/harness` (used in the example command), you need to configure the shared path. Go to the **Overview** tab of the stage and, under **Shared Paths**, enter the desired path, such as `/shared/scan_results`. This will be the location where the Run step saves the scan results.


### Configure the Traceable Step for Ingestion
Search for and add the **Traceable** step to your pipeline.

1. **Scan Mode**: Set the **Scan Mode** to **Ingestion**.
2. **Target**: Under **[Target](#target)**, for **[Target and Variant Detection](#target-and-variant-detection)**, define the **Name** and **Varient** manually.
3. **Ingestion File**: For the field [**Ingestion File**](#ingestion-file), enter the path where the JSON scan results file is saved. In our example, if you haven’t changed the **OUTPUT_FILE** variable in the shared command, you can use `/harness/vulnerabilities.json` or specify the path you updated it to.

<DocImage path={require('./static/traceable-ingestion.png')} width="40%" height="40%" title="Click to view full size image" />

These are the essential settings for performing an Ingestion scan using the Traceable step. For more features and configuration options, see the [Traceable Step Settings](#traceable-step-settings) section.

## Extraction mode configuration
The Extraction mode in Traceable step allows you to retrieve the latest scan data of a specific Traceable suite and feed the results into STO. Here's how you can do it.

Search for and add the **Traceable** step to your pipeline. This step can be used in either the **Build** stage or the **Security** stage. In the step configuration, set the following fields:

1. **Scan Mode**: Set the **Scan Mode** to **Extraction**.
2. **Target**: Under **[Target](#target)**, for **[Target and Variant Detection](#target-and-variant-detection)**, it's recommended to use the **[Auto](#auto)** option. Alternatively, you can manually define **Name** and **Variant** using the **Manual** option.
3. **Authentication**: Provide your Traceable **[Domain](#domain)** and pass your Traceable **[Access Token](#access-token)** as a Harness secret, for example: `<+secrets.getValue("traceable_api_token")>`.
4. **Scan Tool**: Enter your **[Suite ID](#suite-id)**.

<DocImage path={require('./static/traceable-extraction.png')} width="40%" height="40%" title="Click to view full size image" />

These are the essential settings for performing an Extraction scan using the Traceable step. For more features and configuration options, see the [Traceable Step Settings](#traceable-step-settings) section.

## Traceable step settings
The following are the details of each field in the Traceable step.
### Scan Mode
The Traceable step in STO supports three scan modes: Orchestration, Ingestion, and Extraction. Refer to the documentation specific to each mode for details and configuration instructions.

### Scan Configuration
The predefined configuration used for the scan. The Traceable step currently supports only the default scan configuration.

### Target
#### Type
The type is set to **Instance** by default, which is used to scan a running application

#### Target and Variant Detection
You can configure the details of your scan instance by setting its name and variant. These are the labels assigned to the target you’re scanning. You can choose to set them manually by selecting the **Manual** option or have them configured automatically by selecting Auto. When Auto is chosen, the values are set as follows:

#### Auto
When selected **Auto**, the step sets these values as:
- **Name**: The Suite ID is used as the name of the target.
- **Variant**: The Variant is set to "Instance."

Note the following:
- **Auto** is not available when the **Scan Mode** is Ingestion. 
- **Auto** is the default selection for new pipelines. **Manual** is the default for old pipelines, but you might find that neither radio button is selected in the UI.
- You should carefully consider the [baseline you want to specify](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/set-up-baselines) for your instance target. Every target needs a baseline to enable the full suite of STO features. Here are a few options:

  - Specify a RegEx baseline that captures timestamps. This ensures that every new scan compares issues in the new scan vs. the previous scan. Then it updates the baseline to the current scan.

    You can use this RegEx to capture timestamps: `\d{2}/\d{2}/\d{4}\,\s\d{2}\:\d{2}\:\d{2}`
    
  - Specify a fixed baseline. 
    1. Scan the instance using a manual variant name.
    2. Select the baseline as a fixed value. 
    3. Update the step to use auto-detect for future scans. 
    
    This ensures that future scans get compared with one fixed baseline.

### Authentication

#### Domain 

The fully-qualified URL to the scanner. 
#### Access Token

The access token used to log in to a specific product in the scanner. This is required for some scans. In most cases, this is a password or an API key. 

You should create a Harness text secret with your encrypted token and reference the secret using the format `<+secrets.getValue("container-access-id")>`. For more information, go to [Add and Reference Text Secrets](/docs/platform/secrets/add-use-text-secrets).

### Scan Tool

#### Suite ID
Enter the Traceable Suite  ID, which you can find in the URL when you open your suite in Traceable. For example, in the URL `https://app.traceable.ai/my-suite/44aadeB-782b-8d52-8q12-43kdf33/vulnerabilities?time=1d&env=env`, the suite ID is `44aadeB-782b-8d52-8q12-43kdf33`. You can learn more about Suites in the [Traceable documentation](https://docs.traceable.ai/docs/suites).

#### Runner Selection
This field appears when the scan mode is set to **Orchestration**. You can allow Traceable to set it automatically by selecting **Auto**, or configure it manually by choosing **Manual**. If you select **Manual**, enter the Traceable [Runner ID](https://docs.traceable.ai/docs/runners#runner-view) in the **Runner ID** field. Also, make sure you have runners created and active in Traceable, as the step cannot create runners.

### Ingestion File

import StoSettingIngestionFile from './shared/step_palette/ingest/_file.md';

<StoSettingIngestionFile  />

### Log Level

import StoSettingLogLevel from './shared/step_palette/all/_log-level.md';

<StoSettingLogLevel />

### Fail on Severity

import StoSettingFailOnSeverity from './shared/step_palette/all/_fail-on-severity.md';

<StoSettingFailOnSeverity />

### Settings

import StoSettingSettings from './shared/step_palette/all/_settings.md';

<StoSettingSettings />


### Additional Configuration

import ScannerRefAdditionalConfigs from './shared/_additional-config.md';

<ScannerRefAdditionalConfigs />


### Advanced settings

import ScannerRefAdvancedSettings from './shared/_advanced-settings.md';

<ScannerRefAdvancedSettings />

## Proxy settings

import ProxySettings from './shared/proxy-settings.md';

<ProxySettings />
