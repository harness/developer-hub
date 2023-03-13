---
title: AWS ASG deployment tutorial
description: Deploy an ASG using Harness.
sidebar_position: 13
---

This topic explains how to deploy new ASGs and instances to Amazon Elastic Compute Cloud (EC2) using Harness.

## Deployment summary

Here's a high-level summary of the steps involved.

<details>
<summary>Deployment summary</summary>

1. Create the Harness ASG service.
   1. Add launch templates.
   2. Add auto scaling launch configurations.
   3. Add scaling policies (optional).
   4. Add scheduled update group action (optional).
2. Create the ASG environment.
   1. Connect Harness to the AWS region where you want to deploy,
3. Define the ASG pipeline execution.
   1. Select a deployment strategy (rolling, canary, blue green) and Harness automatically creates the steps to deploy the new ASG.
4. Deploy the pipeline.

</details>




## Create the ASG service


```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="YAML" label="YAML" default>
```
1. .
2. .

```mdx-code-block
  </TabItem>
  <TabItem value="API" label="API">
```



```mdx-code-block
  </TabItem>
  <TabItem value="Pipeline Studio" label="Pipeline Studio">
```

1. .
2. .

```mdx-code-block
  </TabItem>
</Tabs>
```

## Create the ASG environment

```mdx-code-block
import Tabs1 from '@theme/Tabs';
import TabItem1 from '@theme/TabItem';
```
```mdx-code-block
<Tabs1>
  <TabItem1 value="YAML" label="YAML" default>
```
1. .
2. .

```mdx-code-block
  </TabItem1>
  <TabItem1 value="API" label="API">
```



```mdx-code-block
  </TabItem1>
  <TabItem1 value="Pipeline Studio" label="Pipeline Studio">
```

1. .
2. .

```mdx-code-block
  </TabItem1>
</Tabs1>
```


## Define the ASG pipeline execution


<details>
<summary>Rolling</summary>

summary

tabs for steps

</details>


<details>
<summary>Canary</summary>

summary

tabs for steps


</details>

<details>
<summary>Blue Green</summary>


summary

tabs for steps

</details>

## Deploy the ASG pipeline


<details>
<summary>Rolling</summary>


</details>


<details>
<summary>Canary</summary>


</details>

<details>
<summary>Blue Green</summary>


</details>


