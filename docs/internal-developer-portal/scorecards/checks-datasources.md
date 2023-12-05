---
title: Scorecard Data Sources
description: Adding Custom Checks and Data Sources for Scorecards 
sidebar_position: 4
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/internal-developer-portal/features/checks-datasources
---


Harness IDP allows you to integrate various data sources and implement custom checks to ensure your software components adhere to best practices and compliance. In this docs, we'll walk through how to add custom checks and data sources for [scorecards](https://developer.harness.io/docs/internal-developer-portal/features/scorecard) in Harness IDP.

### Overview

Harness IDP allows you to integrate various data sources, such as GitHub, GitLab, Bitbucket, Azure DevOps, and many more, to collect specific data points for each software component. Once a data source is enabled, you can use them to create checks to be used in scorecards.

### Add Custom Checks

1. Under the `Admin` go to `Scorecards`.
2. In the `Scorecards` go to the `Checks` tab and select **Create Custom Check**.
3. Now on the **Create Check** page add a name and description for your check.
4. Under **Rules** you can find the following Data Sources to select from.

:::info

There's a tab called `Data Sources` available in `Scorecards` page to check for supported data sources and the corresponding data points. 

:::

:::caution

The git (GitHub, GitLab, Bitbucket) datasources doesn't support monorepos.

:::

### Supported Operators

We support the folowing `regex operators` as Operators for all the Data Points.

1. Less Than
2. Less than or equal to
3. Greater than
4. Greater than or equal to 
5. Equal to
6. Not equal to
7. In or Match
8. Not-In or Not-Match
9. Starts With

![](./static/regex-operators.png)


## GitHub

The following **Data Points** are available for GitHub Data Source. 

1. **Branch Protection**
- *Objective:* Ensure that branch protection rules disallow force push and delete.
- *Calculation Method:* Fetch `backstage.io/source-location` annotation from the catalog YAML file to find repository details and verify the branch protection rules.
- *Prerequisites:* Github Connector with Admin access. Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository.

![](./static/branch-protection.png)

**Example YAML**

```
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

2. **File Existence**
- *Objective:* Verify the existence of a specified file in the repository.
- *Calculation Method:* Use the `backstage.io/source-location` annotation to locate the repository and check for the file’s presence. Make sure to mention the filename with extension or relative path from the root folder (Eg: README.md or docs/README.md) in the conditional input field.
- *Prerequisites:* Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository.

![](./static/file-exist.png)

**Example YAML**

```
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

3. **Mean Time to Merge Pull Request**
- *Objective*: Calculate the average time taken to merge the last 100 pull requests.
- *Calculation Method:* Retrieve repository details using `backstage.io/source-location` and calculate the average merge time.
- *Prerequisites:* Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository. Make sure to mention the branch name in the conditional input field.

![](./static/mean-time-github.png)

**Example YAML**

```
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

4. **Average time to complete successful workflow runs (in minutes)**
- *Objective:* Calculate the average time taken to complete **successful** workflow runs (in minutes).
- *Calculation Method:* Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the average time for the last 100 successful workflow runs to complete.
- *Prerequisites:* Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository. Make sure to mention the workflow id or filename in the conditional input field.

5. **Average time to complete workflow runs (in minutes)**
- *Objective:* Calculate the average time taken to complete workflow runs (in minutes).
- *Calculation Method:* Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the average time for the last 100 workflow runs to complete.
- *Prerequisites:* Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository. Make sure to mention the workflow id or filename in the conditional input field.

6. **Workflow success rate**
- *Objective:* Calculates success rate for the given workflow.
- *Calculation Method:* Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the success rate for the workflow.
- *Prerequisites:* Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository. Make sure to mention the workflow id or filename in the conditional input field.

7. **Workflows count**
- *Objective:* Calculates total number of workflows.
- *Calculation Method:* Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the total number of workflows
- *Prerequisites:* Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository.

8. **Open code scanning alerts**
- *Objective:* Calculates the total number of open alerts reported in code scanning for the given severity.
- *Calculation Method:*  Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the total number of open alerts reported in code scanning.
- *Prerequisites:* GitHub Connector with read access for code scanning alerts. Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository. Make sure to mention the severity type in the conditional input field.

9. **Open Dependabot alerts**
- *Objective:* Calculates the total number of open alerts reported by Dependabot for the given severity.
- *Calculation Method:* Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the total number of open alerts reported by Dependabot.
- *Prerequisites:* Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository. Make sure to mention the severity type in the conditional input field.

10. **Open secret scanning alerts**
- *Objective:* Calculates the total number of open alerts reported in secret scanning. 
- *Calculation Method:* Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the total number of open alerts reported in secret scanning. 
- *Prerequisites:* GitHub Connector with read access for secret scanning alerts. Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository.

11. **Open pull requests by account**
- *Objective:* Calculates the total number of open pull requests raised by the given account.
- *Calculation Method:* Fetches `backstage.io/source-location` annotation from catalog YAML file to find repository details and calculates the total number of open pull requests raised by account.
- *Prerequisites:* Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository. Make sure to mention the username in the conditional input field.

12. **Extract string from a file**
- *Objective:* Gets the string matching the pattern from given file from the branch.
- *Calculation Method:* If a branch name is specified, it is utilized. However, if no branch name is provided, the system retrieves information from the catalog YAML file using the `backstage.io/source-location` annotation to determine the branch name and repository details. It is essential to specify the filename with its extension or provide the relative path from the root folder (e.g., README.md or docs/README.md) in the conditional input field. After fetching the file, the designated pattern is then searched within the file contents and it's value is extracted and returned.
- *Prerequisites:* Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository.

13. **Match string in a file**
- *Objective:* Matches the pattern in the given file from the branch.
- *Calculation Method:* If a branch name is specified, it is utilized. However, if no branch name is provided, the system retrieves information from the catalog YAML file using the `backstage.io/source-location` annotation to determine the branch name and repository details. It is essential to specify the filename with its extension or provide the relative path from the root folder (e.g., README.md or docs/README.md) in the conditional input field. After fetching the file, the contents are examined to find the pattern. Returns true/false based on whether the pattern was found or not.
- *Prerequisites:* Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository.

## GitLab

The following **Data Points** are available for GitLab Data Source. 

1. **Branch Protection**
- *Objective:* Ensure that branch protection rules disallow force push and delete.
- *Calculation Method:* Fetch `backstage.io/source-location` annotation from the catalog YAML file to find repository details and verify the branch protection rules.
- *Prerequisites:* GitLab Connector with Admin access. Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitLab repository.

![](./static/b-p-gitlab.png)

**Example YAML**

```
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

2. **File Existence**
- *Objective:* Verify the existence of a specified file in the repository.
- *Calculation Method:* Use the `backstage.io/source-location` annotation to locate the repository and check for the file’s presence. Make sure to mention the filename with extension or relative path from the root folder (Eg: README.md or docs/README.md) in the conditional input field.
- *Prerequisites:* Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitLab repository.

![](./static/f-e-gitlab.png)

**Example YAML**

```
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

3. **Mean Time to Merge Pull Request**
- *Objective:* Calculate the average time taken to merge the last 100 pull requests.
- *Calculation Method:* Retrieve repository details using `backstage.io/source-location` and calculate the average merge time.
- *Prerequisites:* Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitLab repository. Make sure to mention the branch name in the conditional input field.

![](./static/m-t-gitlab.png)

**Example YAML**

```
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
 
 ## Bitbucket

The following **Data Points** are available for Bitbucket Data Source. 

1. **Branch Protection**
- *Objective:* Ensure that branch protection rules disallow force push and delete.
- *Calculation Method:* Fetch `backstage.io/source-location` annotation from the catalog YAML file to find repository details and verify the branch protection rules.
- *Prerequisites:* Bitbucket Connector with Admin access. Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source BitBucket repository.

![](./static/b-p-bitbucket.png)

**Example YAML**

```
kind: "Component"
apiVersion: "backstage.io/v1alpha1"
metadata:
  name: order-service
  annotations:
    backstage.io/source-location: 'url:https://bitbucket.org/kubernetes/kubernetes/tree/master'
    ...
spec:
    ...
```

2. **Mean Time to Merge Pull Request**
- *Objective:* Calculate the average time taken to merge the last 100 pull requests.
- *Calculation Method:* Retrieve repository details using `backstage.io/source-location` and calculate the average merge time.
- *Prerequisites:* Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source Bitbucket repository. Make sure to mention the branch name in the conditional input field.

![](./static/m-t-bitbucket.png)

**Example YAML**

```
kind: "Component"
apiVersion: "backstage.io/v1alpha1"
metadata:
  name: order-service
  annotations:
    backstage.io/source-location: 'url:https://bitbucket.org/kubernetes/kubernetes/tree/master'
    ...
spec:
    ...
```

## Harness 

### Pre-Requisites

- For the functioning of Harness Data Source related checks, the Harness CI/CD plugin should be configured with new annotations in catalog info YAML, `harness.io/pipelines` and `harness.io/services` as mentioned in the setup steps instruction of [Harness CI/CD plugin](https://github.com/harness/backstage-plugins/tree/main/plugins/harness-ci-cd#harness-nextgen-cicd-plugin)

:::info

In the Harness Data source, the first pipeline URL from `harness.io/pipelines` is considered for score computation and similarly, the first service URL from `harness.io/services` is considered.

:::

The following **Data Points** are available for Harness Data Source. 

1. **CI Pipeline success rate (last 7 days)**: 
- *Objective:* Used for creating rules that will check the success percent of the ci-pipeline in the past 7 days. (This data point is only applicable for CI Pipelines).
- *Calculation Method:* The success rate is calculated only on CI Pipeline that we provide in catalog info YAML with annotation is considered for evaluating the check.

![](./static/ci-harness.png)

2. **Policy evaluation successful**:
- *Objective:* This data point can be used for creating a rule that will check if the policy evaluation is successful in pipelines. (This data point is applicable to both CI and CD Pipelines)

![](./static/p-harness.png)

3. **Tests passing on CI (boolean)**:
- *Objective:* This data point can be used for creating a rule that will check if all the test cases running the CI Pipeline are passing(not a single failing test case). (This data point is only applicable to CI Pipeline)

![](./static/t-harness.png)

4. **STO stage added in pipeline**:
- *Objective:* This data point can be used for creating a rule that will check if STO stage is added in the pipelines. (This data point is applicable to both CI and CD Pipelines)

![](./static/sto-harness.png)

:::info

**Points to remember**:- 

- In the case of CI Pipeline, the first pipeline that we provide in the annotation in catalog info YAML will be used for evaluating the rules corresponding to data points.
If the rule depends on the execution of the pipeline then the latest execution of the provided CI Pipeline will be considered.

- In the case of CD Pipeline, the latest deployment pipeline using the first service that we provide in the annotation in catalog info YAML is considered for evaluating the rules corresponding to data points.

- If the data point depends on both CI and CD Pipelines, annotations corresponding to both should be present in the catalog YAML

:::

### Error Scenarios:

1. In case the check fails, the failure summary will provide the details for the pipeline because of which the check is failing. [We can refer to the pipeline and fix the pipeline with respect to the corresponding check]

![](./static/es1-harness.png)

2. In case if annotation is missing the catalog info YAML, we will get the failure summary for the check in order to add the annotation [We can refer to the Pre-Requisite section to add it]

![](./static/es2-harness.png)

## Catalog 

The following **Data Points** are avilable for Catalog Data Source. 

1. **Owner is defined**:
- *Objective:* Checks if the catalog YAML file has the owner configured or not
- *Calculation Method:* The catalog YAML is inspected to check if the owner is under the spec field and the owner should not be Unknown.

![](./static/owner-catalog.png)

**Example YAML**

```
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  ...
spec:
  type: service
  system: order
  lifecycle: experimental
  owner: order-team
```

2. **Documentation Exists**:
- *Objective:* Checks if the catalog YAML file has the annotation `backstage.io/techdocs-ref` configured or not.
- *Calculation Method:* The catalog YAML is inspected to check if the `backstage.io/techdocs-ref` is present under the metadata field.
- *Prerequisites:* The directory configured should have the `mkdocs.yml` file and a docs directory having all the documentation in markdown format.

![](./static/doc-catalog.png)

**Example YAML**

```
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: order-service
  annotations:
    backstage.io/techdocs-ref: dir:.
    ...
spec:
    ...

```

3. **Pagerduty is set**:

- *Objective:* Checks if the catalog YAML file has the annotation `pagerduty.com/service-id` configured or not.
- *Calculation Method:* The catalog YAML is inspected to check if the `pagerduty.com/service-id` is present under the metadata field.
- *Prerequisites:* The Pagerduty plugin needs to be configured and enabled in the admin section. Please [refer](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/pagerduty/) here for more details. 

![](./static/pager-catalog.png)

**Example YAML**

```
kind: "Component"
apiVersion: "backstage.io/v1alpha1"
metadata:
  name: order-service
  annotations:
    pagerduty.com/service-id: PT5ED69
    ...
spec:
    ...
```

## Kubernetes

### Prerequisites:

1. **Plugin Configuration**

- The Kubernetes plugin needs to be configured. Refer [here](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/kubernetes).

:::info

The plugin provides 2 ways to authenticate - `serviceAccount` and `Google authentication`. But currently, the scorecards supports `serviceAccount` type authentication only.

:::

2. **Entity Configuration**

- There are two ways to surface Kubernetes components as part of an entity using annotations - `backstage.io/kubernetes-id` and `backstage.io/kubernetes-label-selector`. But currently, scorecards support [backstage.io/kubernetes-label-selector](https://backstage.io/docs/features/kubernetes/configuration/#label-selector-query-annotation) annotation only. 

The following **Data Points** are available for Kubernetes Data Source.

1. **Replicas Count**:

- *Objective:* Fetches the number of replicas configured for the given service.
- *Calculation Method:* The label selector configured in the catalog YAML is used to identify the Kubernetes workload and the configured replica count is used. The cluster details configured in the Kubernetes plugin are used. If more than one cluster is configured, the workload search is done in each cluster and a minimum of all the replica counts is taken into consideration.
- *Prerequisites:* The Kubernetes plugin needs to be configured and enabled in the admin section. Refer [here](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/kubernetes) for more details. 

![](./static/replica-k8s.png)

2. **Days passed since the application was last deployed**:

- *Objective:* Fetches the number of days since the most recent deployment was done.
- *Calculation Method:* The label selector configured in the catalog YAML is used to identify the `Kubernetes workload` and the `lastUpdateTime` is used from the conditions section. The cluster details configured in the Kubernetes plugin are used. If more than one cluster is configured, the workload search is done in each cluster and the oldest deployment time of all is taken into consideration.
- *Prerequisites:* The Kubernetes plugin needs to be configured and enabled in the admin section. Refer [here](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/kubernetes) for more details. 

![](./static/days-k8s.png)

## Jira

The following **Data Points** are avilable for Jira Data Source.

1. **Issues Count**:

- *Objective:* Calculates the total number of issues for the given JQL query. 
- *Calculation Method:* Fetches annotations from catalog YAML file to find project details and calculates number of issues. Make sure to provide JQL expression in the conditional input field.
    1. Open P0/P1 bugs:  `issuetype = Bug AND priority in (P0, P1) AND statusCategory != Done`
    2. Features delivered (last 90 days):  `issuetype in (Epic, 'New Feature') AND resolved >= -90d`
    3. Make sure to wrap words within single quotes. Eg: `'New Feature'`
- *Prerequisites:* Provide annotations like `jira/project-key`(required) and `jira/component`(optional) in the catalog YAML file.

![](./static/issues-jira.png)

Example YAML

```
kind: "Component"
apiVersion: "backstage.io/v1alpha1"
metadata:
  name: order-service
  annotations:
    jira/project-key: <jira-project-key>
    jira/component: <jira-component>
    ...
spec:
    ...
```

2. **Mean time to resolve**:

- *Objective:* Calculates the average time taken to resolve issues for the given JQL query. 
- *Calculation Method:* Fetches annotations from catalog YAML file to find project details and calculates average time. Make sure to provide JQL expression in the conditional input field.
    1. Mean time to resolve bugs:  `issuetype = Bug AND priority in (P0,P1) AND resolved >= -90d`
    2. Make sure to wrap words within single quotes. Eg: `'New Feature'`
- *Prerequisites:* Provide annotations like `jira/project-key`(required) and `jira/component`(optional) in the catalog YAML file.

![](./static/mean-jira.png)

**Example YAML**

```
kind: "Component"
apiVersion: "backstage.io/v1alpha1"
metadata:
  name: order-service
  annotations:
    jira/project-key: <jira-project-key>
    jira/component: <jira-component>
    ...
spec:
    ...
```

3. **Issues Open/Close Ratio**:

- *Objective:* Calculates the ratio between Open & Closed issues for the given JQL query. 
- *Calculation Method:* Fetches annotations from catalog YAML file to find project details and calculates the ratio. Make sure to provide JQL expression in the conditional input field.
    1. Mean time to resolve bugs:  `issuetype = Bug AND priority in (P0,P1) AND resolved >= -90d`
    2. Make sure to wrap words within single quotes. Eg: `'New Feature'`
- *Prerequisites:* Provide annotations like `jira/project-key`(required) and `jira/component`(optional) in the catalog YAML file.

![](./static/ratio-jira.png)

**Example YAML**

```
kind: "Component"
apiVersion: "backstage.io/v1alpha1"
metadata:
  name: order-service
  annotations:
    jira/project-key: <jira-project-key>
    jira/component: <jira-component>
    ...
spec:
    ...
```

## PagerDuty

### Prerequisites:

- The PagerDuty plugin must be configured and enabled in the admin section. Refer [here](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/pagerduty/).


The following **Data Points** are avilable for PagerDuty Data Source.

1. **Is on-call Set** - This data point can be used for creating rules that will check if the on-call is set for a given service.

![](./static/on-call-pd.png)

2. **Is Escalation Policy call** - This data point can be used to create rules to check if the escalation policy is set for a given service.

![](./static/escalation-pd.png)

3. **Number of incidents in the last 30 days** - This data point can be used to create rules to check if the number of incidents created in the last 30 days is less than the given threshold input value.

![](./static/incident-pd.png)

4. **Average resolved time of the last 10 resolved incidents (in Minutes)** -  This data point can be used to create rules to check if the average resolved time for the last 10 resolved incidents (in Minutes) is less than the given provided input values.

![](./static/time-pd.png)

### Error Scenarios:-

1. In case checks fail because of PagerDuty plugin is not enabled we will get the error message in the failure summary.

![](./static/es1-pd.png)

2. In case of checks fail because of PagerDuty annotation is missing in catalog info YAML we will get the corresponding error message.

![](./static/es2-pd.png)


5. Now add a `tag` under which category your check belongs to , Ex. "Developer Productivity", "Software Maturity" and click `enter` to add each tags. 

6. Now add the default result in case of missing data and **Save Changes**. Your checks will be added. 

## Checks Overview

- Once the Checks are created, you can view the list of all the checks under the **Checks** tab. 

![](./static/check-overview.png)

- To have an overview of a single check and information on all the componenets it is applied, select the tab under **Check Stats** column for an individual check, it will redirect you to the overview page. 

- The overview page lists all the components on which the check is appled and the graph helps you to track time-sensitive information on the components on which the check has passed, this can be used to track functions like migration and upgrades accross your software ecosystem. 

![](./static/check-component-overview.png)

:::info

Follow the breadcrumbs on the top of the page to navigate across both the pages i.e., list of all checks and indvidual check overview page

![](./static/breadcrumbs.png)

:::