---
title: Run scans using GitHub Action and Drone Plugin steps
description: STO can ingest data from any scanner that can publish in SARIF format.  
sidebar_position: 80
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

[GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions) is a GitHub feature that enables you to automate various event-driven activities, such as security scanning, in GitHub. This topic describes how to run GitHub Action scans and ingest the results into your Harness pipelines.  

:::note Important notes 

* GitHub Action security scans are useful primarily for integrated CI/STO pipelines, which require both CI and STO licenses. For more information, go to [Migrate from GitHub Actions to Harness CI](/docs/continuous-integration/migration-guides/migrating-from-githubactions/).

* You can run scans using [GitHub Action steps](/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step) and [Plugin steps](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-git-hub-action-in-cie). 

* The type of step to use depends on your build infrastructure. For Harness Cloud infrastructures, use Action steps. For Kubernetes infrastructures, you can use Action or Plugin steps.

* [GitHub](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#the-components-of-github-actions) and [Harness](/docs/getting-started/learn-harness-key-concepts) use slightly different terminologies for similar concepts:

  * GitHub **workflow** = Harness **pipeline**
  * GitHub **job** = Harness **Stage**
  * GitHub **step** = Harness **step**

  ![](../static/sto-gha-vs-harness-concepts.png)

* Harness recommends that you output your scan results to a data file in [SARIF format](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning). You can then use a [Custom Ingestion step](/docs/security-testing-orchestration/sto-techref-category/custom-ingest-reference) to ingest the results into your pipeline.

* As described below, you need to translate settings from the GitHub Action YAML to the Harness pipeline YAML. It is good practice to configure these settings in the YAML editor.
::: 

<!-- action -->


```mdx-code-block
<Tabs>
  <TabItem value="GitHub Action setup">
```

<!-- action -->


1. Open the CI or STO pipeline where you want to run the action, then go to the Build or Security Tests stage where you want to run the action.

2. Click **Add Step** and then add a **GitHub Action plugin** step. 

3. Use **Settings** to specify the Github Action you want to use and to pass variables and attributes required by the Action. 

   For information about the settings to set, go to the external scanner documentation.

   For a complete description of how to set up a GitHub Action Plugin step, go to [Use the GitHub Action plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step).


   <table>
    <tr>
        <th>Key</th>
        <th>Description</th>
        <th>Value format</th>
        <th>Value example</th>
    </tr>
    <tr>
        <td><code>uses</code></td>
        <td>Specify the Action's repo, along with a branch or tag.</td>
        <td><code>[repo]@[tag]</code></td>
        <td><code>ajinabraham/njsscan-action@master</code></td>
    </tr>
    <tr>
        <td><code>with</code></td>
        <td>Provide a map of key-value pairs representing settings required by the action itself. At a minimum, make sure you configure the action to publish results in SARIF format. </td>
        <td><code>key: value</code> </td>
        <td><code>args: . --sarif --output result.sarif || true</code> </td>
    </tr>
    <tr>
        <td><code>env</code></td>
        <td>Specify a map of environment variables to pass to the Action. For example, you might need to pass an access token to scan a private repository.</td>
        <td><code>key: value</code></td>
        <td><code>GITHUB_TOKEN: &lt;+secrets.getValue("github_pat")&gt;</code></td>
    </tr>
   </table>


4. Add a [**Custom Ingest**](/docs/security-testing-orchestration/sto-techref-category/custom-ingest-reference) step and set it up to ingest the data file. 

#### Example setup

<!-- action -->

This example uses the [njsscan action](https://github.com/ajinabraham/njsscan-action) to scan a container. As noted in the [Github Code Scanning SARIF upload](https://github.com/ajinabraham/njsscan-action) snippet, you can configure the  `args` value to output the scan results to a SARIF file:

```yaml
name: njsscan
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
jobs:
  njsscan:
    runs-on: ubuntu-latest
    name: njsscan code scanning
    steps:
    - name: Checkout the code
      uses: actions/checkout@v2
    - name: nodejsscan scan
      id: njsscan
      uses: ajinabraham/njsscan-action@master
      # ARGUMENTS THAT SPECIFY THE SARIF OUTPUT FILE
      with:
        args: '. --sarif --output results.sarif || true'
    - name: Upload njsscan report
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: results.sarif
```
<!-- action -->

Given this, you would set up the Action step in your Harness pipeline like this. You can then set up a CustomIngest step to ingest the `trivy-results.sarif` file that gets generated.

```yaml
- step:
    type: Action
    name: njsscan
    identifier: njsscan
    spec:
      uses: ajinabraham/njsscan-action@master
      # ARGUMENTS THAT SPECIFY THE SARIF OUTPUT FILE
      with:
        args: . --sarif --output result.sarif || true
```
<!-- action -->

<details><summary>YAML pipeline example</summary>

```yaml
pipeline:
  projectIdentifier: myProject
  orgIdentifier: myOrg
  tags: {}
  identifier: nodejs-repo-scane
  name: NodeJS repo scan
  properties:
    ci:
      codebase:
        connectorRef: MY_REPO_CONNECTOR
        repoName: https://github.com/OWASP/NodeGoat
        build: <+input>
  stages:
    - stage:
        name: njsscan
        identifier: njsscan
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Action
                  name: njsscan
                  identifier: njsscan
                  spec:
                    uses: ajinabraham/njsscan-action@master
                    with:
                      args: . --sarif --output result.sarif || true
              - step:
                  type: CustomIngest
                  name: CustomIngest_1
                  identifier: CustomIngest_1
                  spec:
                    mode: ingestion
                    config: default
                    target:
                      name: nodegoat
                      type: repository
                      variant: develop
                    advanced:
                      log:
                        level: info
                    ingestion:
                      file: /harness/result.sarif
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          sharedPaths:
            - /shared/customer_artifacts/


```

</details>

```mdx-code-block
  </TabItem>
  <TabItem value="Drone Plugin setup">
```

<!-- plugin -->

1. Open the CI or STO pipeline where you want to run the action, then go to the Build or Security Tests stage where you want to run the action.

2. Click **Add Step** and then add a **Plugin** step. 

4. For **Container Registry**, select a container registry connector that has Docker Hub access.

5. In the **Image** field, enter the name of the GitHub Actions Drone Plugin image: `plugins/github-actions`.

3. Use **Settings** to specify the Github Action you want to use and to pass variables and attributes required by the Action. 

   For information about how to set up the specific action, go to the external scanner documentation.

   For a complete description of how to set up a GitHub Action Plugin step, go to [Use the GitHub Actions Drone plugin](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-git-hub-action-in-cie).


   <table>
    <tr>
        <th>Key</th>
        <th>Description</th>
        <th>Value format</th>
        <th>Value example</th>
    </tr>
    <tr>
        <td><code>uses</code></td>
        <td>Specify the Action's repo, along with a branch or tag.</td>
        <td><code>[repo]@[tag]</code></td>
        <td><code>ajinabraham/njsscan-action@master</code></td>
    </tr>
    <tr>
        <td><code>with</code></td>
        <td>Provide a map of key-value pairs representing settings required by the GitHub Action itself. This example configures the Action to output a data file in SARIF format. </td>
        <td><code>key: value</code> </td>
        <td><code>args: . --sarif --output result.sarif || true</code> </td>
    </tr>
    <tr>
        <td><code>env</code></td>
        <td>Specify a map of environment variables to pass to the Action. For example, you might need to pass an access token to scan a private repository.</td>
        <td><code>key: value</code></td>
        <td><code>GITHUB_TOKEN: &lt;+secrets.getValue("github_pat")&gt;</code></td>
    </tr>
   </table>


4. Add a [**Custom Ingest**](/docs/security-testing-orchestration/sto-techref-category/custom-ingest-reference) step and set it up to ingest the data file. 

#### Example setup

<!-- plugin -->

This example uses the [njsscan action](https://github.com/ajinabraham/njsscan-action) to scan a container. As noted in the [Github Code Scanning SARIF upload](https://github.com/ajinabraham/njsscan-action) snippet, you can configure the  `args` value to output the scan results to a SARIF file:

```yaml
name: njsscan
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
jobs:
  njsscan:
    runs-on: ubuntu-latest
    name: njsscan code scanning
    steps:
    - name: Checkout the code
      uses: actions/checkout@v2
    - name: nodejsscan scan
      id: njsscan
      uses: ajinabraham/njsscan-action@master
      # ARGUMENTS THAT SPECIFY THE SARIF OUTPUT FILE
      with:
        args: '. --sarif --output results.sarif || true'
    - name: Upload njsscan report
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: results.sarif
```
Given this, you would set up the Action step in your Harness pipeline like this. You can then set up a CustomIngest step to ingest the `trivy-results.sarif` file that gets generated.

<!-- plugin -->

```yaml
            steps:
              - step:
                  type: Plugin
                  name: Plugin_1
                  identifier: Plugin_1
                  spec:
                    connectorRef: dbothwelldocker
                    image: plugins/github-actions
                    privileged: true
                    settings:
                      uses: ajinabraham/njsscan-action@master
                      # ARGUMENTS THAT SPECIFY THE SARIF OUTPUT FILE
                      with:
                        args: . --sarif --output result.sarif || true
```

<!-- plugin -->

<details><summary>YAML pipeline example</summary>

```yaml

pipeline:
  projectIdentifier: STO
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: NodeGoat_Harness_Hosted
        repoName: https://github.com/OWASP/NodeGoat
        build: <+input>
  stages:
    - stage:
        name: njsscan
        identifier: checkmarxone
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Plugin
                  name: Plugin_1
                  identifier: Plugin_1
                  spec:
                    connectorRef: MY_DOCKERHUB_CONNECTOR
                    image: plugins/github-actions
                    privileged: true
                    settings:
                      uses: ajinabraham/njsscan-action@master
                      with:
                        args: . --sarif --output result.sarif || true
              - step:
                  type: CustomIngest
                  name: CustomIngest_plugin
                  identifier: CustomIngest_2
                  spec:
                    mode: ingestion
                    config: default
                    target:
                      name: nodegoat
                      type: repository
                      variant: develop
                    advanced:
                      log:
                        level: info
                    privileged: true
                    ingestion:
                      file: /harness/result.sarif
          sharedPaths:
            - /shared/customer_artifacts/
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: MY_K8S_CONNECTOR
              namespace: harness-qa-delegate
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
  identifier: njsscan_dbothwell_v3
  name: njsscan dbothwell v3


```

</details>



```mdx-code-block
  </TabItem>
</Tabs>
```
