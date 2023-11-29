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
  - A [code repo connector](/docs/platform/connectors/code-repositories/) to your Git provider  
  - A Semgrep login and access token. For specific instructions, go to [Getting started from the CLI](https://github.com/semgrep/semgrep#option-2-getting-started-from-the-cli) in the README on GitHub. 

- This tutorial uses the free version of Semgrep to run simple SAST scans. More advanced workflows are possible but are outside the scope of this tutorial.

- Semgrep scans use an agent that [uploads data to the Semgrep cloud](https://semgrep.dev/docs/metrics/) by default. Semgrep uses this data to improve the user experience. Therefore this tutorial is not suitable for air-gapped environments. 

:::

### Add a Harness secret for your Semgrep token

Follow the steps in [Add and reference text secrets](/docs/platform/secrets/add-use-text-secrets) to store your Semgrep token as a secret in Harness.

### Set up your pipeline

```mdx-code-block
import create_pipeline from './static/semgrep-00-create-pipeline.png'

```

Do the following:

1. Select **Security Testing Orchestration** > **Pipelines** > **Create a Pipeline**.

   ```mdx-code-block
    <img src={create_pipeline} alt="Create a new STO pipeline." height="60%" width="60%" />
    ```
2. In the new pipeline, select **Add stage** > **Security Tests** and enter a name for the new stage.

3. Go to **Infrastructure** and select **Cloud**, **Linux**, and **AMD64** for the infrastructure, OS, and architecture.  


### Add the Run step

Now you will add a step that runs a scan using the local Semgrep container image maintained by Harness. Harness updates its scanner images frequently to ensure that they include the latest scanner versions and vulnerability databases.  

1. Go to **Execution** and add a **Run** step. 

2. Configure the step as follows:

   1. Name = **run_semgrep_scan**

   2. 

<!-- 

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual" default>
```
-->