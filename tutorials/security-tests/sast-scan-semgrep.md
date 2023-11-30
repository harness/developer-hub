---
title: Codebase scans with Semgrep
sidebar_position: 1
description: Scan a codebase using Semgrep
keywords: [STO, security, SAST, security, codebase, Semgrep]
# slug: /sto-pipelines/sast/semgrep
---

This tutorial shows you how to scan your codebases using [Semgrep](https://semgrep.dev), a popular code-scanning tool. Semgrep supports a [wide variety of languages](https://semgrep.dev/docs/supported-languages/) and includes a [free version](https://semgrep.dev/pricing/) for individuals who want to scan files locally. 

:::important important notes

- This tutorial has the following prerequisites:

  - A Harness account and STO module license
  - A [code repo connector](/docs/platform/connectors/code-repositories/) to your Git provider and an access token  
  - A Semgrep account login and access token. For specific instructions, go to [Getting started from the CLI](https://github.com/semgrep/semgrep#option-2-getting-started-from-the-cli) in the README on GitHub. 
  - Your Git and Semgrep access tokens must be stored as [Harness secrets](/docs/platform/secrets/add-use-text-secrets)

- This tutorial uses the free version of Semgrep to run simple SAST scans. More advanced workflows are possible but are outside the scope of this tutorial.

- Semgrep scans use an agent that [uploads data to the Semgrep cloud](https://semgrep.dev/docs/metrics/) by default. Semgrep uses this data to improve the user experience. Therefore this tutorial is not suitable for air-gapped environments. 

:::

### Set up your codebase

To do this tutorial, you need a codebase connector to your Git repository and an access token. A connector can specify a Git account (https://git.com/my-account) or a specific repository (https://git.com/my-account). 

This tutorial uses the [dvpwa repository](https://github.com/williamwissemann/dvpwa) as an example. The simplest setup is to create a connector to your account, fork this repository, and then specify the repository in your connector. However, you can run your scans on any codebase that uses a language supported by Semgrep.  

### Set up your pipeline

Do the following:

1. Select **Security Testing Orchestration** (left menu, top) > **Pipelines** > **Create a Pipeline**.

2. In the new pipeline, select **Add stage** > **Security Tests** and enter a name for the new stage.

3. Go to **Infrastructure** and select **Cloud**, **Linux**, and **AMD64** for the infrastructure, OS, and architecture.  

4. Set up your codebase:

   1. Select **Codebase** on the right.

   2. Select your codebase connector and the repository you want to scan.  


### Run the Semgrep scan

Now you will add a step that runs a scan using the local Semgrep container image maintained by Harness. Harness updates its scanner images frequently to ensure that they include the latest scanner versions and vulnerability databases.  


```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Pipeline Studio" default>
```

1. Go to **Execution** and add a **Run** step. 

2. Configure the step as follows:

   1. Name = **run_semgrep_scan**

   2. Container Registry = When prompted, select **Account** and then **Harness Docker Connector**. 

   3. Image = **returntocorp/semgrep**

   4. Command = `semgrep /harness --sarif --config auto -o /harness/results.sarif  `

      This command runs a [Semgrep scan](https://semgrep.dev/docs/cli-reference/#semgrep-scan-command-options) on your code repo and outputs the results to a [SARIF](/docs/security-testing-orchestration/use-sto/orchestrate-and-ingest/ingest-sarif-data) file.  

   5. Open Optional Configuration and set the following options:

      1. Add the following environment variable:
         
         - Key : **SEMGREP_APP_TOKEN**
         - Value : Click the type selector (right), set the value type to **Expression**, and enter the value `<+secrets.getValue("YOUR_SEMGREP_TOKEN_SECRET")>`. 

           ![](./static/sast-semgrep-tutorial/set-value-type.png)

      2. Limit Memory = **4096**


```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML editor">
```
TBD


```mdx-code-block
  </TabItem>
</Tabs>
```

### Ingest the scan results

Now that you've added a step to run the scan, it's a simple matter to ingest it into your pipeline. Harness provides a set of customized steps for popular scanners such as Semgrep. 

1. In the **Execution** tab, add a **Semgrep** step after your **Run** step.

2. Configure the step as follows:

   1. Name = **ingest_semgrep_data**

   2. Type = **Repository**

   3. Under Target:

      1. Name = **dvpwa**

      2. Variant = **master**

   4. Ingestion File = **/harness/results.sarif**

   5. Fail on Severity = **Critical**


### Run the pipeline

1. In the Pipeline Studio, select **Run** (top right).

2. When prompted, select the **master** branch, start the run, and then wait for the execution to finish.

If you used the [example repository](https://github.com/williamwissemann/dvpwa) mentioned above, you'll see that the pipeline failed for an entirely expected reason: the Semgrep step is [configured to fail the pipeline](/docs/security-testing-orchestration/get-started/key-concepts/fail-pipelines-by-severity) if the scan detected any critical vulnerabilities. The final log entry for the Semgrep step reads: `Exited with message: fail_on_severity is set to critical and that threshold was reached.`

![](./static/sast-semgrep-tutorial/pipeline-failed-critical-issues-found.png)

