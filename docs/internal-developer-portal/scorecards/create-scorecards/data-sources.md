---
title: Data Sources
description: Comprehensive guide to all available data sources for Scorecard checks
sidebar_position: 3
sidebar_label: Data Sources
redirect_from:
  - /docs/internal-developer-portal/features/checks-datasources
  - /docs/internal-developer-portal/scorecards/data-sources
---

Harness IDP allows you to integrate various data sources to collect specific data points for each software component. Once a data source is enabled, you can use it to create checks for your scorecards.

**Data Sources** are third-party providers that supply specific types of data for software components. Examples include GitHub, GitLab, Bitbucket, Harness, PagerDuty, Jira, and Kubernetes. **Data Points** are the specific pieces of information that each data source provides for a software component. Data points can be numbers, strings, or booleans.


A **Data Sources** tab is available on the **Scorecards** page where you can view all supported data sources and their corresponding data points.
![](./static/data-sources.png)

---

## Data Sources

### GitHub

The following data points are available for the GitHub data source.

#### 1. Branch Protection

**Objective:** Ensure that branch protection rules disallow force push and delete.

**Calculation Method:** Fetches the `backstage.io/source-location` annotation from the catalog YAML file to find repository details and verify the branch protection rules.

**Prerequisites:** 
- GitHub Connector with Admin access
- Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository

![](../static/branch-protection.png)

**Example YAML:**

```yaml
kind: "Component"
apiVersion: "backstage.io/v1alpha1"
metadata:
  name: order-service
  annotations:
    backstage.io/source-location: 'url:https://github.com/kubernetes/kubernetes/tree/master'
    ...
spec:
    ...
```

#### 2. File Existence

**Objective:** Verify the existence of a specified file in the repository.

**Calculation Method:** Uses the `backstage.io/source-location` annotation to locate the repository and check for the file's presence. Make sure to mention the filename with extension or relative path from the root folder (e.g., README.md or docs/README.md) in the conditional input field.

**Prerequisites:** Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository.

![](../static/file-exist.png)

**Example YAML:**

```yaml
kind: "Component"
apiVersion: "backstage.io/v1alpha1"
metadata:
  name: order-service
  annotations:
    backstage.io/source-location: 'url:https://github.com/kubernetes/kubernetes/tree/master'
    ...
spec:
    ...
```

#### 3. Mean Time to Merge Pull Request

**Objective:** Calculate the average time taken to merge the last 100 pull requests.

**Calculation Method:** Retrieves repository details using `backstage.io/source-location` and calculates the average merge time.

**Prerequisites:** 
- Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository
- Make sure to mention the branch name in the conditional input field

![](../static/mean-time-github.png)

**Example YAML:**

```yaml
kind: "Component"
apiVersion: "backstage.io/v1alpha1"
metadata:
  name: order-service
  annotations:
    backstage.io/source-location: 'url:https://github.com/kubernetes/kubernetes/tree/master'
    ...
spec:
    ...
```

#### 4. Average Time to Complete Successful Workflow Runs (in minutes)

**Objective:** Calculate the average time taken to complete **successful** workflow runs (in minutes).

**Calculation Method:** Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the average time for the last 100 successful workflow runs to complete.

**Prerequisites:** 
- Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository
- Make sure to mention the workflow ID or filename in the conditional input field

#### 5. Average Time to Complete Workflow Runs (in minutes)

**Objective:** Calculate the average time taken to complete workflow runs (in minutes).

**Calculation Method:** Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the average time for the last 100 workflow runs to complete.

**Prerequisites:** 
- Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository
- Make sure to mention the workflow ID or filename in the conditional input field

#### 6. Workflow Success Rate

**Objective:** Calculates success rate for the given workflow.

**Calculation Method:** Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the success rate for the workflow.

**Prerequisites:** 
- Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository
- Make sure to mention the workflow ID or filename in the conditional input field

#### 7. Workflows Count

**Objective:** Calculates total number of workflows.

**Calculation Method:** Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the total number of workflows.

**Prerequisites:** Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository.

#### 8. Open Code Scanning Alerts

**Objective:** Calculates the total number of open alerts reported in code scanning for the given severity.

**Calculation Method:** Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the total number of open alerts reported in code scanning.

**Prerequisites:** 
- GitHub Connector with read access for code scanning alerts
- Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository
- Make sure to mention the severity type in the conditional input field

#### 9. Open Dependabot Alerts

**Objective:** Calculates the total number of open alerts reported by Dependabot for the given severity.

**Calculation Method:** Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the total number of open alerts reported by Dependabot.

**Prerequisites:** 
- Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository
- Make sure to mention the severity type in the conditional input field

#### 10. Open Secret Scanning Alerts

**Objective:** Calculates the total number of open alerts reported in secret scanning.

**Calculation Method:** Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the total number of open alerts reported in secret scanning.

**Prerequisites:** 
- GitHub Connector with read access for secret scanning alerts
- Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository

#### 11. Open Pull Requests by Account

**Objective:** Calculates the total number of open pull requests raised by the given account.

**Calculation Method:** Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the total number of open pull requests raised by account.

**Prerequisites:** 
- Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository
- Make sure to mention the username in the conditional input field

#### 12. Extract String from a File

**Objective:** Gets the string matching the pattern from given file from the branch.

**Calculation Method:** If a branch name is specified, it is utilized. However, if no branch name is provided, the system retrieves information from the catalog YAML file using the `backstage.io/source-location` annotation to determine the branch name and repository details. It is essential to specify the filename with its extension or provide the relative path from the root folder (e.g., README.md or docs/README.md) in the conditional input field. The filename can also be provided as a regex pattern. For example, for a file path `/backstage/blob/master/scripts/log-20240105.anyextension`, the regex would be `/backstage/blob/master/scripts/log-20240105\..*`. After fetching the file, the designated pattern is then searched within the file contents, and its value is extracted and returned.

:::info
#### URL Priority for Branch Name Field

In some data points, we take `branchName` as input. It's an optional field if the branch is mentioned in `source-location` in your entity YAML. It is suggested to provide a branchName if you want to use the same for all repositories; otherwise, we use the branch name mentioned in the `source-location`.

![](../static/source-location.png)

If you mention the `branchName` field as a check config other than what's present in the `source-location`, the priority order conditions are:

1. If it's in both, the check configuration will take precedence
2. If it's in only one, we'll use that value
3. If it's in neither, the check will fail

![](../static/checks-field.png)
:::

**Prerequisites:** Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository.

![](../static/extract-github.png)

#### 13. Match String in a File

**Objective:** Matches the pattern in the given file from the branch.

**Calculation Method:** If a branch name is specified, it is utilized. However, if no branch name is provided, the system retrieves information from the catalog YAML file using the `backstage.io/source-location` annotation to determine the branch name and repository details. It is essential to specify the filename with its extension or provide the relative path from the root folder (e.g., README.md or docs/README.md) in the conditional input field. After fetching the file, the contents are examined to find the pattern. Returns true/false based on whether the pattern was found or not.

:::info
#### URL Priority for Branch Name Field

In some data points, we take `branchName` as input. It's an optional field if the branch is mentioned in `source-location` in **catalog-info.yaml**. It is suggested to provide a branchName if you want to use the same for all repositories; otherwise, we use the branch name mentioned in the `source-location`.

![](../static/source-location.png)

If you mention the `branchName` field as a check config other than what's present in the `source-location`, the priority order conditions are:

1. If it's in both, the check configuration will take precedence
2. If it's in only one, we'll use that value
3. If it's in neither, the check will fail

![](../static/checks-field.png)
:::

**Prerequisites:** Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository.

![](../static/match-github.png)

---

### GitLab

The following data points are available for the GitLab data source.

#### 1. Branch Protection

**Objective:** Ensure that branch protection rules disallow force push and delete.

**Calculation Method:** Fetches `backstage.io/source-location` annotation from the catalog YAML file to find repository details and verify the branch protection rules.

**Prerequisites:** 
- GitLab Connector with Admin access
- Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitLab repository

![](../static/b-p-gitlab.png)

**Example YAML:**

```yaml
kind: "Component"
apiVersion: "backstage.io/v1alpha1"
metadata:
  name: order-service
  annotations:
    backstage.io/source-location: 'url:https://gitlab.com/kubernetes/kubernetes/tree/master'
    ...
spec:
    ...
```

#### 2. File Existence

**Objective:** Verify the existence of a specified file in the repository.

**Calculation Method:** Uses the `backstage.io/source-location` annotation to locate the repository and check for the file's presence. Make sure to mention the filename with extension or relative path from the root folder (e.g., README.md or docs/README.md) in the conditional input field.

**Prerequisites:** Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitLab repository.

![](../static/f-e-gitlab.png)

**Example YAML:**

```yaml
kind: "Component"
apiVersion: "backstage.io/v1alpha1"
metadata:
  name: order-service
  annotations:
    backstage.io/source-location: 'url:https://gitlab.com/kubernetes/kubernetes/tree/master'
    ...
spec:
    ...
```

#### 3. Mean Time to Merge Pull Request

**Objective:** Calculate the average time taken to merge the last 100 pull requests.

**Calculation Method:** Retrieves repository details using `backstage.io/source-location` and calculates the average merge time.

**Prerequisites:** 
- Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitLab repository
- Make sure to mention the branch name in the conditional input field

![](../static/m-t-gitlab.png)

**Example YAML:**

```yaml
kind: "Component"
apiVersion: "backstage.io/v1alpha1"
metadata:
  name: order-service
  annotations:
    backstage.io/source-location: 'url:https://gitlab.com/kubernetes/kubernetes/tree/master'
    ...
spec:
    ...
```

#### 4. Extract String from a File

**Objective:** Gets the string matching the pattern from given file from the branch.

**Calculation Method:** If a branch name is specified, it is utilized. However, if no branch name is provided, the system retrieves information from the catalog YAML file using the `backstage.io/source-location` annotation to determine the branch name and repository details. It is essential to specify the filename with its extension or provide the relative path from the root folder (e.g., README.md or docs/README.md) in the conditional input field. After fetching the file, the designated pattern is then searched within the file contents, and its value is extracted and returned.

:::info
#### URL Priority for Branch Name Field

In some data points, we take `branchName` as input. It's an optional field if the branch is mentioned in `source-location` in **catalog-info.yaml**. It is suggested to provide a branchName if you want to use the same for all repositories; otherwise, we use the branch name mentioned in the `source-location`.

![](../static/source-location.png)

If you mention the `branchName` field as a check config other than what's present in the `source-location`, the priority order conditions are:

1. If it's in both, the check configuration will take precedence
2. If it's in only one, we'll use that value
3. If it's in neither, the check will fail

![](../static/checks-field.png)
:::

**Prerequisites:** Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitLab repository.

#### 5. Match String in a File

**Objective:** Matches the pattern in the given file from the branch.

**Calculation Method:** If a branch name is specified, it is utilized. However, if no branch name is provided, the system retrieves information from the catalog YAML file using the `backstage.io/source-location` annotation to determine the branch name and repository details. It is essential to specify the filename with its extension or provide the relative path from the root folder (e.g., README.md or docs/README.md) in the conditional input field. After fetching the file, the contents are examined to find the pattern. Returns true/false based on whether the pattern was found or not.

:::info
#### URL Priority for Branch Name Field

In some data points, we take `branchName` as input. It's an optional field if the branch is mentioned in `source-location` in **catalog-info.yaml**. It is suggested to provide a branchName if you want to use the same for all repositories; otherwise, we use the branch name mentioned in the `source-location`.

![](../static/source-location.png)

If you mention the `branchName` field as a check config other than what's present in the `source-location`, the priority order conditions are:

1. If it's in both, the check configuration will take precedence
2. If it's in only one, we'll use that value
3. If it's in neither, the check will fail

![](../static/checks-field.png)
:::

**Prerequisites:** Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitLab repository.

---

### Bitbucket

The following data points are available for the Bitbucket data source. All data points follow similar patterns to GitHub and GitLab, requiring the `backstage.io/source-location` annotation for repository identification.

#### Available Data Points:
1. [Branch Protection](#1-branch-protection) - See GitHub section for detailed description
2. [File Existence](#2-file-existence) - See GitHub section for detailed description
3. [Mean Time to Merge Pull Request](#3-mean-time-to-merge-pull-request) - See GitHub section for detailed description
4. [Extract String from a File](#12-extract-string-from-a-file) - See GitHub section for detailed description
5. [Match String in a File](#13-match-string-in-a-file) - See GitHub section for detailed description

:::info
#### URL Priority for Branch Name Field

For Bitbucket data points that require a branch name, the same priority rules apply as mentioned in the [GitHub URL Priority section](#url-priority-for-branch-name-field) above.
:::

---

### Harness

The Harness data source provides insights into your CI/CD pipelines and deployments.

#### Prerequisites

To use Harness as a data source for Scorecards, you need to:

1. Add the Harness annotation in your `catalog-info.yaml` file:

```yaml
metadata:
  annotations:
    harness.io/pipelines: |
      labelA: <harness_pipeline_url>
      labelB: <harness_pipeline_url>
```

2. The pipeline URL format should be:
```
https://app.harness.io/ng/account/<ACCOUNT_ID>/module/ci/orgs/<ORG_ID>/projects/<PROJECT_ID>/pipelines/<PIPELINE_ID>/
```

#### Available Data Points:

1. **Deployment Frequency (Per Day)**
   - Calculates the average number of deployments per day over the last 30 days

2. **Deployment Frequency (Per Week)**
   - Calculates the average number of deployments per week over the last 12 weeks

3. **Deployment Frequency (Per Month)**
   - Calculates the average number of deployments per month over the last 6 months

4. **Change Failure Rate**
   - Calculates the percentage of deployments that failed in the last 30 days

5. **Mean Time to Restore (MTTR)**
   - Calculates the average time taken to restore service after a failed deployment

6. **CI Pipeline Success Rate (Last 7 Days)**
   - Percentage of successful CI pipeline executions in the past 7 days

7. **CI Pipeline Success Rate (Last 30 Days)**
   - Percentage of successful CI pipeline executions in the past 30 days

#### Error Scenarios

**Missing Harness Annotation:**
If the `harness.io/pipelines` annotation is missing from the catalog-info.yaml file, the check will fail with an appropriate error message indicating that the annotation is required.

**Invalid Pipeline URL:**
If the pipeline URL format is incorrect or the pipeline doesn't exist, the check will fail with an error message.

---

### Catalog

The Catalog data source allows you to create checks based on the entity definitions in your Catalog entity YAML file.

#### Available Data Points:

1. **Annotation Exists**
   - Checks if a specific annotation exists in the catalog entity
   - Example: `catalog.annotationExists."jira/project-key"`

2. **PagerDuty Annotation Exists**
   - Checks if the PagerDuty annotation exists
   - Example: `catalog.pagerdutyAnnotationExists`

3. **Kubernetes Annotation Exists**
   - Checks if Kubernetes-related annotations exist
   - Example: `catalog.annotationExists."backstage.io/kubernetes-id"`

4. **Custom Metadata Fields**
   - Access any custom metadata fields defined in your catalog
   - Example: `catalog.metadata.testCoverageScore`

#### Example Usage

```jexl
catalog.annotationExists."jira/project-key" == true && 
catalog.annotationExists."backstage.io/techdocs-ref" == true
```

#### Example catalog-info.yaml

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: my-service
  description: My awesome service
  annotations:
    jira/project-key: MYPROJ
    backstage.io/techdocs-ref: dir:.
    backstage.io/kubernetes-id: my-service
    pagerduty.com/integration-key: abc123
  testCoverageScore: 85
spec:
  type: service
  lifecycle: production
  owner: team-a
```

---

### Kubernetes

The Kubernetes data source provides insights into your Kubernetes deployments and resources.

#### Prerequisites

1. **Enable Kubernetes Plugin:**
   - The Kubernetes plugin must be enabled in your IDP
   - Configure the plugin with appropriate cluster access

2. **Add Kubernetes Annotation:**
   - Add the `backstage.io/kubernetes-id` annotation to your `catalog-info.yaml`:

```yaml
metadata:
  annotations:
    backstage.io/kubernetes-id: my-service
```

#### Available Data Points:

1. **Pod Count**
   - Returns the number of pods running for the service

2. **Deployment Status**
   - Checks if the deployment is healthy and running

3. **Resource Utilization**
   - Monitors CPU and memory usage

4. **Replica Count**
   - Returns the number of replicas configured

---

### Jira

The Jira data source provides insights into your project management and issue tracking.

#### Available Data Points:

1. **Open Issues Count**
   - Calculates the total number of open issues for a project

2. **Issues by Priority**
   - Counts issues based on priority (High, Medium, Low)

3. **Issues by Status**
   - Counts issues based on status (To Do, In Progress, Done)

4. **Average Time to Close Issues**
   - Calculates the average time taken to close issues

5. **Overdue Issues Count**
   - Counts the number of issues past their due date

#### Prerequisites:

- Add the Jira project key annotation in your `catalog-info.yaml`:

```yaml
metadata:
  annotations:
    jira/project-key: MYPROJ
```

---

### PagerDuty
The PagerDuty data source provides insights into your incident management and on-call schedules.

#### Prerequisites

1. **Enable PagerDuty Plugin:**
   - The PagerDuty plugin must be enabled in your IDP

2. **Add PagerDuty Annotation:**
   - Add the PagerDuty integration key to your `catalog-info.yaml`:

```yaml
metadata:
  annotations:
    pagerduty.com/integration-key: <your-integration-key>
```

#### Available Data Points:

1. **Open Incidents Count**
   - Returns the number of currently open incidents

2. **Mean Time to Acknowledge (MTTA)**
   - Calculates the average time taken to acknowledge incidents

3. **Mean Time to Resolve (MTTR)**
   - Calculates the average time taken to resolve incidents

4. **Incidents in Last 30 Days**
   - Counts the total number of incidents in the past 30 days

5. **On-Call Schedule Status**
   - Checks if an on-call schedule is configured

#### Error Scenarios

**Missing PagerDuty Annotation:**
If the PagerDuty annotation is missing from the catalog-info.yaml file, the check will fail with an error message indicating that the annotation is required.

![](../static/es2-pd.png)

---

## Custom Data Sources

Custom data sources enable you to extend Harness IDP's scorecard capabilities beyond the out-of-the-box integrations. This is particularly useful when you want to build scorecards for tools that aren’t natively supported or when you need to enrich existing catalog entities with additional metadata.

There are two primary approaches to working with data sources in Harness IDP:

1. **Out-of-the-Box Data Sources**: Native integrations (GitHub, GitLab, Jira, PagerDuty, etc.) that automatically fetch data from connected tools
2. **Custom Data Sources**: User-defined data ingested via the Catalog Ingestion API, allowing you to bring in data from any source

#### When to Use Custom Data Sources

Consider using custom data sources when:

- **Tool Not Natively Supported**: You’re using a tool that doesn’t have an out-of-the-box integration (e.g., custom testing frameworks, proprietary tools, internal systems)
- **Multiple Data Sources**: You want to combine data from multiple tools into a single metric

Use the Catalog Ingestion API to programmatically update your catalog entities with custom data. The API accepts the full entity YAML and updates the catalog.

#### Steps
1. **Create a Custom Check using the Catalog Expressions Data Point**
   - Navigate to Configure → Scorecards → Checks
   - Create a new check and select Catalog as the data source
   - Use catalog expressions to reference your custom data

2. **Ingest Data into the Catalog using the API**
   - Use the Catalog Ingestion API to push your custom data
   - You can use a Python script or any other method to automate this process

3. **Schedule Periodic Data Updates**
   - Set up a cron job or scheduled process to push data periodically and keep your catalog up-to-date
   - You can use a scheduled Harness pipeline, a cron job, or any other automation to trigger the ingestion API at regular intervals (e.g., hourly, daily)
   - This ensures your custom data remains current and reflects the latest information from your data sources

Watch [this video](https://youtu.be/MB-IWGoYjOo?si=J5GgmUItG1TQ-0M1) to see a working example. Here is a [sample Harness pipeline](https://github.com/harness-community/idp-samples/blob/main/idp-pipelines/Catalog_Ingestion_Pipeline.yaml) with a Python script for ingestion.

---

## Next Steps

- Learn how to [create custom checks](/docs/internal-developer-portal/scorecards/create-scorecards/checks) using these data sources
- Explore scorecard tutorials for advanced use cases:
  - [Track Migrations using Scorecards](/docs/internal-developer-portal/scorecards/tutorials/track-migrations)
  - [Harness OPA using Scorecards](/docs/internal-developer-portal/scorecards/tutorials/opa-implementation)
- Review how to [manage your scorecards](/docs/internal-developer-portal/scorecards/manage-scorecards)
