---
title: Scorecard Data Sources
description: Adding Custom Checks and Data Sources for Scorecards 
sidebar_position: 4
helpdocs_topic_id:
helpdocs_category_id:
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Harness IDP allows you to integrate various data sources and implement custom checks to ensure your software components adhere to best practices and compliance. In this docs, we'll walk through how to add custom checks and data sources for scorecards in Harness IDP.

### Overview

Harness IDP allows you to integrate various data sources, such as GitHub, GitLab, Bitbucket, Azure DevOps, and many more, to collect specific data points for each software component. Once a data source is enabled, you can use them to create checks to be used in scorecards.

### Add Custom Checks

1. Under the `Admin` go to `Scorecards`.
2. In the `Scorecards` go to the `Checks` tab and select **Create Custom Check**.
3. Now on the **Create Check** page add a name and description for your check.
4. Under **Rules** you can find the following Data Sources to select from.

:::info

There's a tab called `Datasources` available in `Scorecards` page to check for supported datasources and the corresponding datapoints. 

:::

```mdx-code-block
<Tabs>
<TabItem value="GitHub">
```
The following **Datapoints** are available for GitHub. 

1. **Branch Protection**
- *Objective:* Ensure that branch protection rules disallow force push and delete.
- *Calculation Method:* Fetch `backstage.io/source-location` annotation from the catalog YAML file to find repository details and verify the branch protection rules.
- *Prerequisites:* Github Connector with Admin access. Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitHub repository.

<docimage path={require('../../internal-developer-portal/features/static/branch-protection.png')}/>

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

<docimage path={require('../../internal-developer-portal/features/static/file-exist.png')}/>

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

<docimage path={require('../../internal-developer-portal/features/static/mean-time-github.png')}/>

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

```mdx-code-block
</TabItem>
<TabItem value="GitLab">
```
The following **Datapoints** are available for GitLab. 

1. **Branch Protection**
- *Objective:* Ensure that branch protection rules disallow force push and delete.
- *Calculation Method:* Fetch `backstage.io/source-location` annotation from the catalog YAML file to find repository details and verify the branch protection rules.
- *Prerequisites:* GitLab Connector with Admin access. Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source GitLab repository.

<docimage path={require('../../internal-developer-portal/features/static/b-p-gitlab.png')}/>

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

<docimage path={require('../../internal-developer-portal/features/static/f-e-gitlab.png')}/>

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

<docimage path={require('../../internal-developer-portal/features/static/m-t-gitlab.png')}/>

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

```mdx-code-block
</TabItem>
<TabItem value="Bitbucket">
```

The following **Datapoints** are available for Bitbucket

1. **Branch Protection**
- *Objective:* Ensure that branch protection rules disallow force push and delete.
- *Calculation Method:* Fetch `backstage.io/source-location` annotation from the catalog YAML file to find repository details and verify the branch protection rules.
- *Prerequisites:* Bitbucket Connector with Admin access. Provide suitable `backstage.io/source-location` annotation if the catalog YAML file is present outside the source BitBucket repository.

<docimage path={require('../../internal-developer-portal/features/static/b-p-bitbucket.png')}/>

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

<docimage path={require('../../internal-developer-portal/features/static/m-t-bitbucket.png')}/>

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

```mdx-code-block
</TabItem>
<TabItem value="Harness">
```
**Pre-Requisites**

- For the functioning of Harness Data Source related checks the Harness NextGen CI/CD plugin should be configured with new annotations in catalog info YAML, `harness.io/pipelines` and `harness.io/services` as mentioned in the setup steps instruction of [Harness Nextgen CI/CD plugin](https://github.com/harness/backstage-plugins/tree/main/plugins/harness-ci-cd#harness-nextgen-cicd-plugin)

:::info

In the Harness Data source, the first pipeline URL from `harness.io/pipelines` is considered for score computation and similarly, the first service URL from `harness.io/services` is considered.

:::

The following **Datapoints** are available for Harness. 

1. **CI Pipeline success rate (last 7 days)**: 
- *Objective:* Used for creating rules that will check the success percent of the ci-pipeline in the past 7 days. (This data point is only applicable for CI Pipelines).
- *Calculation Method:* The success rate is calculated only on CI Pipeline that we provide in catalog info YAML with annotation is considered for evaluating the check.

<docimage path={require('../../internal-developer-portal/features/static/ci-harness.png')}/>

2. **Policy evaluation successful**:
- *Objective:* This data point can be used for creating a rule that will check if the policy evaluation is successful in pipelines. (This data point is applicable to both CI and CD Pipelines)

<docimage path={require('../../internal-developer-portal/features/static/p-harness.png')}/>

3. **Tests passing on CI (boolean)**:
- *Objective:* This data point can be used for creating a rule that will check if all the test cases running the CI Pipeline are passing(not a single failing test case). (This data point is only applicable to CI Pipeline)

<docimage path={require('../../internal-developer-portal/features/static/t-harness.png')}/>

4. **STO stage added in pipeline**:
- *Objective:* This data point can be used for creating a rule that will check if STO stage is added in the pipelines. (This data point is applicable to both CI and CD Pipelines)

<docimage path={require('../../internal-developer-portal/features/static/sto-harness.png')}/>

:::info

**Points to remember**:- 

- In the case of CI Pipeline, the first pipeline that we provide in the annotation in catalog info YAML will be used for evaluating the rules corresponding to data points.
If the rule depends on the execution of the pipeline then the latest execution of the provided CI Pipeline will be considered.

- In the case of CD Pipeline, the latest deployment pipeline using the first service that we provide in the annotation in catalog info YAML is considered for evaluating the rules corresponding to data points.

- If the data point depends on both CI and CD Pipelines, annotations corresponding to both should be present in the catalog YAML

:::

### Error Scenarios:

1. In case the check fails, the failure summary will provide the details for the pipeline because of which the check is failing. [We can refer to the pipeline and fix the pipeline with respect to the corresponding check]

<docimage path={require('../../internal-developer-portal/features/static/es1-harness.png')}/>

2. In case if annotation is missing the catalog info YAML, we will get the failure summary for the check in order to add the annotation [We can refer to the Pre-Requisite section to add it]

<docimage path={require('../../internal-developer-portal/features/static/es2-harness.png')}/>

```mdx-code-block
</TabItem>
<TabItem value="Catalog">
```
The following **DataPoints** are avilable for Catalog. 

1. **Owner is defined**:
- *Objective:* Checks if the catalog YAML file has the owner configured or not
- *Calculation Method:* The catalog YAML is inspected to check if the owner is under the spec field and the owner should not be Unknown.

<docimage path={require('../../internal-developer-portal/features/static/owner-catalog.png')}/>

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

<docimage path={require('../../internal-developer-portal/features/static/doc-catalog.png')}/>

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

<docimage path={require('../../internal-developer-portal/features/static/pager-catalog.png')}/>

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

```mdx-code-block
</TabItem>
<TabItem value="Kubernetes">
```

### Prerequisites:

1. **Plugin Configuration**

- The Kubernetes plugin needs to be configured. Refer [here](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/kubernetes).

:::info

The plugin provides 2 ways to authenticate - `serviceAccount` and `Google authentication`. But currently, the scorecards supports `serviceAccount` type authentication only.

:::

2. **Entity Configuration**

- There are two ways to surface Kubernetes components as part of an entity using annotations - `backstage.io/kubernetes-id` and `backstage.io/kubernetes-label-selector`. But currently, scorecards support [backstage.io/kubernetes-label-selector](https://backstage.io/docs/features/kubernetes/configuration/#label-selector-query-annotation) annotation only. 

The following **DataPoints** are avilable for Kubernetes Datasource.

1. **Replicas Count**:

- *Objective:* Fetches the number of replicas configured for the given service.
- *Calculation Method:* The label selector configured in the catalog YAML is used to identify the Kubernetes workload and the configured replica count is used. The cluster details configured in the Kubernetes plugin are used. If more than one cluster is configured, the workload search is done in each cluster and a minimum of all the replica counts is taken into consideration.
- *Prerequisites:* The Kubernetes plugin needs to be configured and enabled in the admin section. Refer [here](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/kubernetes) for more details. 

<docimage path={require('../../internal-developer-portal/features/static/replica-k8s.png')}/>

2. **Days passed since the application was last deployed**:

- *Objective:* Fetches the number of days since the most recent deployment was done.
- *Calculation Method:* The label selector configured in the catalog YAML is used to identify the `Kubernetes workload` and the `lastUpdateTime` is used from the conditions section. The cluster details configured in the Kubernetes plugin are used. If more than one cluster is configured, the workload search is done in each cluster and the oldest deployment time of all is taken into consideration.
- *Prerequisites:* The Kubernetes plugin needs to be configured and enabled in the admin section. Refer [here](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/kubernetes) for more details. 

<docimage path={require('../../internal-developer-portal/features/static/days-k8s.png')}/>

```mdx-code-block
</TabItem>
<TabItem value="Jira">
```

The following **DataPoints** are avilable for Jira Datasource.

1. **Issues Count**:

- *Objective:* Calculates the total number of issues for the given JQL query. 
- *Calculation Method:* Fetches annotations from catalog YAML file to find project details and calculates number of issues. Make sure to provide JQL expression in the conditional input field.
    1. Open P0/P1 bugs:  `issuetype = Bug AND priority in (P0, P1) AND statusCategory != Done`
    2. Features delivered (last 90 days):  `issuetype in (Epic, 'New Feature') AND resolved >= -90d`
    3. Make sure to wrap words within single quotes. Eg: `'New Feature'`
- *Prerequisites:* Provide annotations like `jira/project-key`(required) and `jira/component`(optional) in the catalog YAML file.

<docimage path={require('../../internal-developer-portal/features/static/issues-jira.png')}/>

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

<docimage path={require('../../internal-developer-portal/features/static/mean-jira.png')}/>

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

<docimage path={require('../../internal-developer-portal/features/static/ratio-jira.png')}/>

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

```mdx-code-block
</TabItem>
<TabItem value="PagerDuty">
```

### Prerequisites:

- The PagerDuty plugin must be configured and enabled in the admin section. Refer [here](https://developer.harness.io/docs/internal-developer-portal/plugins/available-plugins/pagerduty/).


The following **DataPoints** are avilable for PagerDuty Datasource.

1. **Is on-call Set** - This data point can be used for creating rules that will check if the on-call is set for a given service.

<docimage path={require('../../internal-developer-portal/features/static/on-call-pd.png')}/>

2. **Is Escalation Policy call** - This data point can be used to create rules to check if the escalation policy is set for a given service.

<docimage path={require('../../internal-developer-portal/features/static/escalation-pd.png')}/>

3. **Number of incidents in the last 30 days** - This data point can be used to create rules to check if the number of incidents created in the last 30 days is less than the given threshold input value.

<docimage path={require('../../internal-developer-portal/features/static/incident-pd.png')}/>

4. **Average resolved time of the last 10 resolved incidents (in Minutes)** -  This data point can be used to create rules to check if the average resolved time for the last 10 resolved incidents (in Minutes) is less than the given provided input values.

<docimage path={require('../../internal-developer-portal/features/static/time-pd.png')}/>

### Error Scenarios:-

1. In case checks fail because of PagerDuty plugin is not enabled we will get the error message in the failure summary.

<docimage path={require('../../internal-developer-portal/features/static/es1-pd.png')}/>

2. In case of checks fail because of PagerDuty annotation is missing in catalog info YAML we will get the corresponding error message.

<docimage path={require('../../internal-developer-portal/features/static/es2-pd.png')}/>

```mdx-code-block
</TabItem>
</Tabs>
```
5. Now add a `tag` under which category your check belongs to , Ex. "Developer Productivity", "Software Maturity" and click `enter` to add each tags. 

6. Now add the default result in case of missing data and **Save Changes**. Your checks will be added. 
